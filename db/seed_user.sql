WITH u as (
INSERT INTO ba.user (email, first_name, last_name)
    VALUES ('test@gmail.com', 'test', 'testman')
    RETURNING id
),
r AS (
   INSERT INTO ba.role(name)
	   VALUES('Admin')
	   RETURNING id
   ),
n AS (
  INSERT INTO ba.user_role(user_id, role_id)
    VALUES ((SELECT * FROM u), (SELECT * FROM r))
)
INSERT INTO ba.user_login (user_id, username, password)
    VALUES ((SELECT * FROM u), 'tm', 'tm')
  RETURNING
    user_id