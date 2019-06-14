update user_account 
set premium = true
where user_id = ${user_id};

insert into premium_details (user_id, phone_number, billing_date, credits_used)
values (${user_id}, ${phone_number}, ${billing_date}, ${credits_used})
returning user_id, phone_number, billing_date, credits_used;
