INSERT INTO trainers (username, hash, profile_pic)
VALUES (${username}, ${hash}, ${profile_pic})
RETURNING *;