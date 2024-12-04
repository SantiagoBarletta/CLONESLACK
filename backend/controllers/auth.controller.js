import UsersModel from '../models/users.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ResponseBuilder from '../helpers/builders/responseBuilders.js';
import transporterEmail from '../helpers/emailTransporter.js';
import ENVIROMENT from '../config/enviroment.js';

// Controlador para registrar usuario
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validaciones básicas
    if (!name || !email || !password) {
      return res.status(400).json({
        ok: false,
        code: "VALIDATION_ERROR",
        message: "Todos los campos son obligatorios",
      });
    }

    // Verificar si el email ya está registrado
    const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({
        ok: false,
        code: "DUPLICATE_ERROR",
        message: "El email ya está registrado",
      });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    await pool.query(
      "INSERT INTO users (name, email, password, emailVerified, verificationToken) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashedPassword, 0, ""]
    );

    res.status(200).json({
      ok: true,
      message: "Usuario registrado con éxito",
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
  try {
    const { validation_token } = req.params;

    // Verificar el token JWT
    const payload = jwt.verify(validation_token, ENVIROMENT.SECRET_KEY);
    const email = payload.email;

    // Verificar si el usuario existe
    const user = await UsersModel.findByEmail(email);
    if (user.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar el campo emailVerified
    await UsersModel.verifyEmail(email);

    return res.status(200).json({ message: "Correo verificado con éxito" });
  } catch (error) {
    console.error("Error al verificar el email:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// Controlador para iniciar sesión
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UsersModel.findByEmail(email);

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
        name: user[0].name,
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
          name: user[0].name,
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

// Controlador para enviar correo de recuperación de contraseña
export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UsersModel.findByEmail(email);
    if (user.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const resetToken = jwt.sign({ email }, ENVIROMENT.SECRET_KEY, { expiresIn: "1h" });
    const resetUrl = `${ENVIROMENT.FRONTEND_URL}/recovery-password/${resetToken}`;

    await transporterEmail.sendMail({
      subject: "Recuperar contraseña",
      to: email,
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetUrl}">${resetUrl}</a>`,
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
  try {
    const { reset_token } = req.params;
    const { password } = req.body;

    const payload = jwt.verify(reset_token, ENVIROMENT.SECRET_KEY);
    const hashedPassword = await bcrypt.hash(password, 10);

    await UsersModel.updatePassword(payload.email, hashedPassword);

    return res.status(200).json({
      message: "Contraseña restablecida exitosamente",
      redirectUrl: `${ENVIROMENT.FRONTEND_URL}/login`,
    });
  } catch (error) {
    console.error("Error al restablecer contraseña:", error);
    return res.status(500).json({
      message: "Error del servidor",
    });
  }
};
