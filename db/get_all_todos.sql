select * from todos 
inner join todo_items 
on todos.todo_id = todo_items.todo_id
where user_id = ${user_id};