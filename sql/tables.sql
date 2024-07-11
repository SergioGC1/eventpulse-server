
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

CREATE TABLE Usuarios (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(100) NOT NULL
);