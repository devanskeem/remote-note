update reminders
set title=${title}, remind_unix=${remind_unix}, timestamp=${timestamp}
where reminder_id=${reminder_id}
returning reminder_id, user_id, title, remind_unix, timestamp