CREATE DATABASE IF NOT EXISTS bloc_bd;
USE bloc_bd;

DROP TABLE IF EXISTS publicaciones;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(80) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    contrasena VARCHAR(200) NOT NULL,
    rol VARCHAR(20) NOT NULL,             
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado TINYINT NOT NULL                  
);

CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    descripcion VARCHAR(255),
    estado TINYINT NOT NULL,                   
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE publicaciones (
    id_publicacion INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT NOT NULL,
    resumen VARCHAR(300),                       -- extracto para tarjetas
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    imagen VARCHAR(255),
    estado TINYINT DEFAULT 1,                   -- visible/oculta
    id_usuario INT,
    id_categoria INT,

    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

SELECT * FROM usuarios;
SELECT * FROM categorias;
SELECT * FROM publicaciones;
