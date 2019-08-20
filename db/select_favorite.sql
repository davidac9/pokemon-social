SELECT f.trainer_id, m.pokemon_id, m.pokemon_image, m.nick_name, m.type_1 from favorite_pokemon f
JOIN my_pokemon m
ON f.pokemon_id = m.pokemon_id
WHERE f.trainer_id = $1;