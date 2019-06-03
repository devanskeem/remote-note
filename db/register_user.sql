insert into user_account (username, first_name, last_name)
values (${username}, ${first_name}, ${last_name});

insert into user_login (user_id)
select user_id from user_account
where username = ${username};

update user_login
set username = ${username}, password = ${password}
where user_id in (select user_id from user_account
                where username = ${username})
returning user_id, username