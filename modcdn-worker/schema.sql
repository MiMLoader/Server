DROP TABLE IF EXISTS Mods;

CREATE TABLE IF NOT EXISTS Mods (
    Name TEXT PRIMARY KEY,
    Author TEXT,
    Description TEXT,
    Versions TEXT,
    Tags TEXT
);

INSERT INTO
    Mods (Name, Author, Description, Versions, Tags)
VALUES
    ('mimlAPI', 'Ahhh_Saturn', 'An API to make modding with Moonstone Island Mod Loader easier.', '1.0.3', 'api, utility')