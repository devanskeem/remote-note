insert into reminders (user_id, title, remind_unix, remind_time, remind_date, timestamp)
values (${user_id}, ${title}, ${remind_unix}, ${remind_time}, ${remind_date}, ${timestamp})
returning reminder_id, user_id, title, remind_unix, timestamp, remind_time, remind_date