insert into notes (user_id, title, content, timestamp)
values (${user_id}, ${title}, ${content}, ${timestamp})
returning note_id, user_id, title, content, timestamp