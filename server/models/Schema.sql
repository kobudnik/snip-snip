CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE folders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE snippets (
    id SERIAL PRIMARY KEY,
    snippet VARCHAR(65535) NOT NULL,
    folder_id INTEGER NOT NULL,
    CONSTRAINT fk_folder_id FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION create_default_folder()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO folders (user_id, name, is_default)
    VALUES (NEW.id, 'default', TRUE);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_default_folder_trigger
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION create_default_folder();
