SELECT user.`id`,user.`name` FROM going JOIN user ON going.user_id = user.id WHERE `user_id` NOT IN (
	SELECT `user_id` FROM trip WHERE 
	((`when` BETWEEN '%2$s' AND '%3$s') OR (`to` BETWEEN '%2$s' AND '%3$s') OR (`when` <= '%2$s' AND `to` >= '%3$s')) AND
	`user_id` IN (SELECT `user_id` FROM going WHERE `trip_id` = '%1$s')
) AND `trip_id` = '%1$s'