INSERT INTO my_pokemon (trainer_id, pokemon_image, nick_name, type_1)
VALUES (${trainer_id}, ${pokemon_image}, ${nick_name}, ${type_1})
RETURNING *;

INSERT INTO favorite_pokemon (trainer_id, pokemon_id)
VALUES (${trainer_id}, ${pokemon_id})
RETURNING *;