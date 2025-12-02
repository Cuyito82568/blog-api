const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection= require('./db');
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.post('/agregarusuario', (req, res) => {
    const { nombre, email, contrasena, rol, estado } = req.body;
    const estadoNumerico = estado === 'si' || estado === 'activo' || estado === true || estado === 1 ? 1 : 0;
    
    const query = 'INSERT INTO usuarios (nombre, email, contrasena, rol, estado) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [nombre, email, contrasena, rol, estadoNumerico], (err, results) => {
        if (err) {
            console.error('Error al insertar usuario', err);
            res.status(500).send('Error al insertar usuario');
            return;
        }
        res.status(201).send({
            message: 'Usuario agregado exitosamente',
            userId: results.insertId
    });
    });
});

app.post('/agregarcategoria', (req, res) => {
    const { nombre, descripcion, estado} = req.body;
    const estadoNumerico = estado === 'si' || estado === 'activo' || estado === true || estado === 1 ? 1 : 0;
    const query = 'INSERT INTO categorias (nombre, descripcion, estado) VALUES (?, ?, ?)';
    connection.query(query, [nombre, descripcion, estadoNumerico], (err, results) => {
        if (err) {
            console.error('Error al insertar categoría', err);
            res.status(500).send('Error al insertar categoría');
            return;
        }
        res.status(201).send({
            message: 'Categoría agregada exitosamente',
            categoriaId: results.insertId
    });
    });
});

app.post('/agregarpublicacion', (req, res) => {
    const { titulo, contenido, resumen, imagen, estado, id_usuario, id_categoria } = req.body;
    if (!titulo || !contenido || !resumen || !id_usuario || !id_categoria) {
        res.status(400).send('Faltan campos obligatorios');
        return;
    }
    const estadoNumerico = estado === 'si' || estado === 'activo' || estado === true || estado === 1 ? 1 : 0;
    const query = 'INSERT INTO publicaciones (titulo, contenido, resumen, id_usuario, id_categoria, imagen, estado) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [titulo, contenido, resumen, id_usuario, id_categoria, imagen, estadoNumerico], (err, results) => {
        if (err) {
            console.error('Error al insertar publicación', err);
            res.status(500).send('Error al insertar publicación');
            return;
        }
        res.status(201).send({
            message: 'Publicación agregada exitosamente',
            publicacionId: results.insertId
    });
    });
});

app.get('/getAllUsuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios', err);
            res.status(500).send('Error al obtener usuarios');
            return;
        }
        res.status(200).send(results);
    });
});

app.get('/getAllCategorias', (req, res) => {
    const query = 'SELECT * FROM categorias';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener categorías', err);
            res.status(500).send('Error al obtener categorías');
            return;
        }
        res.status(200).send(results);
    });
});

app.get('/getAllPublicaciones', (req, res) => {
    const query = 'SELECT * FROM publicaciones';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener publicaciones', err);
            res.status(500).send('Error al obtener publicaciones');
            return;
        }
        res.status(200).send(results);
    });
});

app.get('/getPublicacionById/:id', async (req, res) => {
    const publicacionId = req.params.id;
    const query = 'SELECT * FROM publicaciones WHERE id_publicacion = ?';
    connection.query(query, [publicacionId], (err, results) => {
        if (err) {
            console.error('Error al obtener la publicación', err);
            res.status(500).send('Error al obtener la publicación');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Publicación no encontrada');
            return;
        }
        res.status(200).send(results);
    });
});

app.get('/getCategoriaById/:id', async (req, res) => {
    const categoriaId = req.params.id;
    const query = 'SELECT * FROM categorias WHERE id_categoria = ?';
    connection.query(query, [categoriaId], (err, results) => {
        if (err) {
            console.error('Error al obtener la categoría', err);
            res.status(500).send('Error al obtener la categoría');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Categoría no encontrada');
            return;
        }
        res.status(200).send(results);
    });
});

app.get('/getUsuarioById/:id', async (req, res) => {
    const usuarioId = req.params.id;
    const query = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    connection.query(query, [usuarioId], (err, results) => {
        if (err) {
            console.error('Error al obtener el usuario', err);
            res.status(500).send('Error al obtener el usuario');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Usuario no encontrado');
            return;
        }
        res.status(200).send(results);
    });
});

app.post('/login', (req, res) => {
    const { email, contrasena } = req.body;
    const query = 'SELECT * FROM usuarios WHERE email = ? AND contrasena = ?';
    connection.query(query, [email, contrasena], (err, results) => {
        if (err) {
            console.error('Error al realizar login', err);
            res.status(500).send('Error al realizar login');
            return;
        }
        if (results.length === 0) {
            res.status(401).send('Usuario o contraseña incorrectos');
            return;
        }
        res.status(200).send(results[0]);
    });
});

app.get('/publicaciones-categoria/:id', (req, res) => {
    const categoriaId = req.params.id;
    const query = 'SELECT * FROM publicaciones WHERE id_categoria = ?';
    connection.query(query, [categoriaId], (err, results) => {
        if (err) {
            console.error('Error al obtener publicaciones por categoría', err);
            res.status(500).send('Error al obtener publicaciones por categoría');
            return;
        }
        res.status(200).send(results);
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});






