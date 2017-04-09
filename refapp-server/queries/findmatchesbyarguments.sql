select distinct(user_id) from trip where placeid = '%1$s' AND 
((trip.when BETWEEN '%2$s' AND '%3$s') OR (trip.to BETWEEN '%2$s' AND '%3$s') OR (trip.when <= '%2$s' AND trip.to >= '%3$s'))