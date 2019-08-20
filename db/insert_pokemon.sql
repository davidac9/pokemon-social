INSERT INTO my_pokemon (trainer_id, pokemon_image, nick_name, type_1)
VALUES (${trainer_id}, ${pokemon_image}, ${nick_name}, ${type_1})
RETURNING *;
