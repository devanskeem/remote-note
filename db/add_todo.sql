insert into todos (title, user_id, items ,timestamp)
values(${title}, ${user_id}, ${items}, ${timestamp})
returning todo_id, title, timestamp, items