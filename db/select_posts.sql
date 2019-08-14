SELECT p.trainer_id, post_text, post_id, username, profile_pic FROM post p
JOIN trainers t
ON t.trainer_id = p.trainer_id
WHERE t.username LIKE $1;