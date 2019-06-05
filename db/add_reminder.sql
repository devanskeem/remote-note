insert into reminders (user_id, title, remind_time, remind_date, timestamp)
values (${user_id}, ${title}, ${remind_time}, ${remind_date}, ${timestamp})
returning note_id, user_id, title, content, timestamp