update todos
set title=${title}, items=${items}, timestamp=${timestamp}
where todo_id=${todo_id}
returning todo_id, user_id, title, items, timestamp