update reminders
set title=${title}, remind_unix=${remind_unix}, remind_time=${remind_time}, remind_date=${remind_date}, timestamp=${timestamp}
where reminder_id=${reminder_id}
returning reminder_id, user_id, title, remind_unix, remind_time, remind_date, timestamp