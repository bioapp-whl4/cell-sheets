select u.id as user_id, u.first_name as firstname, u.last_name as lastname, u.email, r.name from ba.user u
join ba.user_role ur on u.id = ur.user_id
join ba.role r ON r.id = ur.role_id
where u.id = ${id};