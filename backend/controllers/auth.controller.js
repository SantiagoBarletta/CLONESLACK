import UsersModel from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ResponseBuilder from "../helpers/builders/responseBuilders.js";
import transporterEmail from "../helpers/emailTransporter.js";
import ENVIROMENT from "../config/enviroment.js";
import pool from "../config/dbconfig.js";

// Controlador para registrar usuario
export const registerController = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    if (!firstname || !lastname || !username || !email || !password) {
      return res.status(400).json({
        ok: false,
        code: "VALIDATION_ERROR",
        message: "Todos los campos son obligatorios",
      });
    }

    // Verifica si el username o email ya estan registrados
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({
        ok: false,
        code: "DUPLICATE_ERROR",
        message: "El username o email ya está registrado",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = jwt.sign({ email }, ENVIROMENT.SECRET_KEY, { expiresIn: "1d" });

    const defaultProfileImage = "/Imagenes/user.png";

    await pool.query(
      `INSERT INTO users (firstname, lastname, username, email, password, emailVerified, verificationToken, foto_perfil) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstname, lastname, username, email, hashedPassword, 0, verificationToken, defaultProfileImage]
    );

    const verificationLink = `${ENVIROMENT.BACKEND_URL}/api/auth/verify-email/${verificationToken}`;
    await transporterEmail.sendMail({
      from: ENVIROMENT.EMAIL_USER,
      to: email,
      subject: "Verificación de cuenta",
      html: `
        <h1>Verifica tu cuenta</h1>
        <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
        <a href="${verificationLink}">Verificar cuenta</a>
      `,
    });

    res.status(200).json({
      ok: true,
      message: "Usuario registrado con éxito. Revisa tu correo para verificar tu cuenta.",
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({
      ok: false,
      message: "Error del servidor. Intenta más tarde.",
    });
  }
};


// Controlador para verificar email
export const verifyEmailController = async (req, res) => {
  
  const { validation_token: token } = req.params;

  if (!token) {
    console.error("Token no proporcionado");
    return res.status(400).send(`
      <h1>Error de verificación</h1>
      <p>No se proporcionó un token de verificación.</p>
    `);
  }

  try {
    
    const payload = jwt.verify(token, ENVIROMENT.SECRET_KEY);
    console.log("Payload decodificado:", payload);

    const { email } = payload;

    const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length === 0) {
      console.log("Usuario no encontrado para el email:", email);
      return res.status(404).send(`
        <h1>Usuario no encontrado</h1>
        <p>El enlace de verificación es inválido o el usuario ya fue eliminado.</p>
      `);
    }

    await pool.query("UPDATE users SET emailVerified = 1 WHERE email = ?", [email]);

    res.redirect(`${ENVIROMENT.FRONTEND_URL}/login`);
  } catch (error) {
    console.error("Error al verificar el token:", error.message);
    res.status(400).send(`
      <h1>Error de verificación</h1>
      <p>El enlace de verificación es inválido o ha expirado.</p>
    `);
  }
};

// Controlador para iniciar sesión
export const loginController = async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await UsersModel.findByEmailOrUsername(login);

    if (user.length === 0) {
      return res.status(404).json({
        ok: false,
        code: "USER_NOT_FOUND",
        message: "Usuario no encontrado",
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, user[0].password);
    if (!isCorrectPassword) {
      return res.status(401).json({
        ok: false,
        code: "INCORRECT_PASSWORD",
        message: "Contraseña incorrecta",
      });
    }

    if (!user[0].emailVerified) {
      return res.status(403).json({
        ok: false,
        code: "EMAIL_NOT_VERIFIED",
        message: "Verifica tu cuenta antes de iniciar sesión",
      });
    }

    const accessToken = jwt.sign(
      {
        user_id: user[0].id,
        firstname: user[0].firstname,
        lastname: user[0].lastname,
        username: user[0].username,
        email: user[0].email,
      },
      ENVIROMENT.SECRET_KEY,
      { expiresIn: "1d" }
    );

    const response = new ResponseBuilder()
      .setOk(true)
      .setCode("SUCCESS")
      .setStatus(200)
      .setMessage("Login exitoso")
      .setData({
        accessToken,
        user_info: {
          firstname: user[0].firstname,
          lastname: user[0].lastname,
          username: user[0].username,
          email: user[0].email,
          user_id: user[0].id,
        },
      })
      .build();

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error en el proceso de login:", error);
    return res.status(500).json({
      ok: false,
      code: "SERVER_ERROR",
      message: "Error interno del servidor",
    });
  }
};

// Controlador para enviar correo de recuperacion de contraseña
export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UsersModel.findByEmailOrUsername(email); 
    if (user.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const resetToken = jwt.sign({ email }, ENVIROMENT.SECRET_KEY, { expiresIn: "1h" });

    const resetUrl = `${ENVIROMENT.FRONTEND_URL}/recovery-password/${resetToken}`;

    await transporterEmail.sendMail({
      subject: "Recuperar contraseña",
      to: email,
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetUrl}">Restablecer contraseña</a>`,
    });

    return res.status(200).json({
      message: "Correo de restablecimiento enviado con éxito.",
    });
  } catch (error) {
    console.error("Error en recuperación de contraseña:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};


// Controlador para restablecer contraseña
export const recoveryPasswordController = async (req, res) => {
  const { reset_token } = req.params;
  const { password } = req.body;

  console.log("Token recibido para verificación:", reset_token);

  if (!reset_token) {
    return res.status(400).json({ message: "Token no proporcionado" });
  }

  try {
    const payload = jwt.verify(reset_token, ENVIROMENT.SECRET_KEY);
    console.log("Payload decodificado:", payload);

    const hashedPassword = await bcrypt.hash(password, 10);

    await UsersModel.updatePassword(payload.email, hashedPassword);

    return res.status(200).json({
      message: "Contraseña restablecida exitosamente",
      redirectUrl: `${ENVIROMENT.FRONTEND_URL}/login`,
    });
  } catch (error) {
    console.error("Error al verificar el token:", error.message);
    return res.status(400).json({
      message: "Token inválido o malformado.",
    });
  }
};
