SELECT user.id as uid,user.username,notification.id, notification.type,unix_timestamp(notification.created_at) * 1000 as created_at 
FROM notification 
JOIN user ON notification.sender = user.id WHERE recipent = '%s'