INSERT INTO favorite_pokemon (trainer_id, pokemon_id)
VALUES (${trainer_id}, ${pokemon_id})
RETURNING *;