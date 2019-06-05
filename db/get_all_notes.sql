select * from notes 
where user_id = ${user_id}
order by timestamp desc;