import UsersRepository from "../repositories/users.repository.js";

export const getUserByIdController = async (req, res) => {
    const { userID } = req.params;

    try {
        const user = await UsersRepository.getUserById(userID);

        if (!user) {
            return res.status(404).json({
                ok: false,
                message: "Usuario no encontrado",
            });
        }

        res.status(200).json({
            ok: true,
            data: user,
        });
    } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        res.status(500).json({
            ok: false,
            message: "Error interno del servidor",
        });
    }
};

export const updateUserController = async (req, res) => {
    const { userID } = req.params;
    const { firstname, lastname, email, profile_image, fecha_nacimiento } = req.body;

    try {
        const result = await UsersRepository.updateUser(userID, { firstname, lastname, email, profile_image, fecha_nacimiento });

        if (!result) {
            return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
        }

        res.status(200).json({ ok: true, message: "Perfil actualizado con éxito" });
    } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        res.status(500).json({ ok: false, message: "Error interno del servidor" });
    }
};

