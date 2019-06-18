insert into reminders (user_id, title, remind_unix, timestamp)
values (${user_id}, ${title}, ${remind_unix}, ${timestamp})
returning reminder_id, user_id, title, remind_unix, timestamp