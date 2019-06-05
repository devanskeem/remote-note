select * from reminders 
where user_id = ${user_id}
order by timestamp desc;

