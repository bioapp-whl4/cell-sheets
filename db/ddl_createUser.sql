DROP TABLE IF EXISTS ba."user";
DROP TABLE IF EXISTS ba.user_role;
DROP TABLE IF EXISTS ivideo.role;


   CREATE TABLE ba.user_login
(
	id serial NOT NULL, 
    user_id integer,
    username character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT pk_user_login PRIMARY KEY (id)
	)
  
  -- Table: user 
CREATE TABLE ba."user" 
  ( 
     id          serial NOT NULL, 
     email       varchar(255), 
     first_name  varchar(255), 
     last_name   varchar(255), 
     active      bool NULL DEFAULT true, 
     inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     CONSTRAINT pk_user PRIMARY KEY ( id ) 
  ); 

-- Table: user_role 
CREATE TABLE ba.user_role 
  ( 
     user_id     integer, 
     role_id     integer, 
     inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     CONSTRAINT pk_user_role PRIMARY KEY ( user_id, role_id ) 
  );
  CREATE TABLE ba.role 
  ( 
     id          serial NOT NULL, 
     NAME        varchar(255), 
     inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     CONSTRAINT pk_roles PRIMARY KEY ( id ) 
  );