DROP TABLE IF EXISTS trainers;
DROP TABLE IF EXISTS my_pokemon;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS favorite_pokemon;

CREATE TABLE trainers (
    trainer_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    hash TEXT,
    profile_pic TEXT
);

CREATE TABLE post (
    post_id SERIAL PRIMARY KEY,
    trainer_id INT REFERENCES trainers(trainer_id),
    post_text VARCHAR(250)
);

CREATE TABLE my_pokemon (
    pokemon_id SERIAL PRIMARY KEY,
    trainer_id INT REFERENCES trainers(trainer_id),
    pokemon_image TEXT,
    nick_name VARCHAR(15)
);

CREATE TABLE favorite_pokemon (
    trainer_id INT REFERENCES trainers(trainer_id),
    pokemon_id INT REFERENCES my_pokemon(pokemon_id)
);