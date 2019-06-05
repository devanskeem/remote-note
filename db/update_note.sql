update notes
set title=${title}, content=${content}, timestamp=${timestamp}
where note_id=${note_id}
returning note_id, user_id, title, content, timestamp