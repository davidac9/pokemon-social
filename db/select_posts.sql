SELECT p.trainer_id, p.post_text, post_id, t.username, t.profile_pic, f.pokemon_id, m.pokemon_image, m.type_1 from post p
JOIN trainers t
ON t.trainer_id = p.trainer_id
JOIN favorite_pokemon f
ON f.trainer_id = t.trainer_id
JOIN my_pokemon m
ON m.pokemon_id = f.pokemon_id
WHERE t.username LIKE $1;