DELETE FROM my_pokemon
WHERE trainer_id = ${trainer_id} and pokemon_id = ${pokemon_id}
RETURNING *;