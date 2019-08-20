SELECT t.trainer_id, t.username, p.pokemon_image, p.pokemon_id, p.nick_name, p.type_1 FROM my_pokemon p
JOIN trainers t
ON t.trainer_id = p.trainer_id
WHERE t.username = $1;