SELECT *, (SELECT COUNT(id) FROM picture WHERE user_id = user.id) as totalphotos,
(SELECT COUNT(user_id) FROM going WHERE user_id = user.id) as totaltrips,
(SELECT COUNT(fid) FROM friends WHERE uid = user.id) as totalfriends 
FROM user 
WHERE fbid = '%s';