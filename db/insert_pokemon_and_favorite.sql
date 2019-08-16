INSERT INTO my_pokemon (trainer_id, pokemon_image, nick_name)
VALUES (${trainer_id}, ${pokemon_image}, ${nick_name})
RETURNING *;

INSERT INTO favorite_pokemon (trainer_id, pokemon_id)
VALUES (${trainer_id}, ${pokemon_id})
RETURNING *;