CREATE DATABASE /*!32312 IF NOT EXISTS*/`eventpulse` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `eventpulse`;
CREATE TABLE Usuarios (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(100) NOT NULL
);
CREATE TABLE Eventos (
    IdEvento INT PRIMARY KEY AUTO_INCREMENT,
    IdUsuario INT,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Category VARCHAR(50),
    DateTime DATETIME NOT NULL,
    Images TEXT,
    Stock INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    finished_at DATETIME NOT NULL,
    FOREIGN KEY (IdUsuario) REFERENCES Usuarios(Id)
);

CREATE TABLE UsuariosEvento (
    IdEvento INT,
    IdUsuario INT,
    PRIMARY KEY (IdEvento, IdUsuario),
    FOREIGN KEY (IdEvento) REFERENCES Eventos(IdEvento),
    FOREIGN KEY (IdUsuario) REFERENCES Usuarios(Id)
);