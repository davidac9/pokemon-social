SELECT m.nick_name, m.pokemon_image, f.trainer_id FROM favorite_pokemon f
JOIN my_pokemon m
ON f.pokemon_id = m.pokemon_id
WHERE f.trainer_id = $1;