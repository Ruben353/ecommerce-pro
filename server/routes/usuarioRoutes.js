const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Crear cuenta (registro)
router.post('/registro', async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const nuevoUsuario = new Usuario({ nombre, correo, contraseña, rol });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario creado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario || usuario.contraseña !== contraseña) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

module.exports = router;
