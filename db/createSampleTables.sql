-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-06-03 18:19:44.588

-- tables
-- Table: box
CREATE TABLE ba.box (
    id serial NOT NULL  ,
    name varchar(255),
    hierarchy_id int default 5,
    cane_id int, 
    size_x int default 9,
    size_y int default 9,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT pk_box PRIMARY KEY (id)
);

-- Table: cane
CREATE TABLE ba.cane (
    id serial NOT NULL  ,
    name varchar(255) ,
    hierarchy_id int default 4,
    freezer_id int, 
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL ,
    updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL ,
    CONSTRAINT pk_cane PRIMARY KEY (id)
);

-- Table: experiment
CREATE TABLE ba.experiment (
    id serial NOT NULL  ,
    name varchar(255)  ,
    experiment_id varchar(200), 
    scientist_user_id int,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    CONSTRAINT pk_experiment PRIMARY KEY (id)
);

-- Table: freezer
CREATE TABLE ba.freezer (
    id serial NOT NULL  ,
    name varchar(255)  ,
    temperature decimal(10,2)  ,
	hierarchy_id int default 3, 
    lab_id int, 
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    updated_at int,
    CONSTRAINT pk_freezer PRIMARY KEY (id)
);

-- Table: freezer_type
CREATE TABLE ba.freezer_type (
    id serial NOT NULL  ,
    name varchar(255)  ,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    freezer_id int  ,
    CONSTRAINT pk_freezer_type PRIMARY KEY (id)
);

-- Table: freezing_medium
CREATE TABLE ba.freezing_medium (
    id serial NOT NULL  ,
    name varchar(255)  ,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    CONSTRAINT pk_freezing_medium PRIMARY KEY (id)
);

-- Table: lab
CREATE TABLE ba.lab (
    id serial NOT NULL  ,
    name varchar(255)  ,
    location_id int, 
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    freezer_id int  ,
    location_id int  ,
    freezer_2_id int  ,
    CONSTRAINT pk_lab PRIMARY KEY (id)
);

-- Table: location
CREATE TABLE ba.location (
    id serial NOT NULL  ,
    name varchar(255)  ,
    state varchar(200)  ,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    city varchar(200)  ,
    CONSTRAINT pk_location PRIMARY KEY (id)
);


-- Table: order_item
CREATE TABLE ba.order_item (
    id serial NOT NULL  ,
    pick_list_id int  ,
    sample_id int  ,
    quantity int  ,
    CONSTRAINT pk_order_item PRIMARY KEY (id)
);

-- Table: pick_item
CREATE TABLE ba.pick_item (
    id serial NOT NULL  ,
    pick_list_id int  ,
    sample_id int  ,
    quantity int  ,
    CONSTRAINT pick_item_pk PRIMARY KEY (id)
);

-- Table: pick_list
CREATE TABLE ba.pick_list (
    id serial NOT NULL  ,
    user_id int  ,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    checked_out timestamp  ,
    CONSTRAINT pick_list_pk PRIMARY KEY (id)
);

-- Table: pick_order
CREATE TABLE ba.pick_order (
    id serial NOT NULL  ,
    session_id varchar(255)  ,
    user_id integer  ,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    pick_list_id int  ,
    CONSTRAINT pk_pick_order PRIMARY KEY (id)
);

-- Table: role
CREATE TABLE ba.role (
    id serial NOT NULL  ,
    name varchar(255)  ,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    CONSTRAINT pk_roles PRIMARY KEY (id)
);

-- Table: sample
CREATE TABLE ba.sample (
    id serial NOT NULL  ,
    user_key varchar(200)  ,
    name varchar(100)  ,
    description text  ,
    freeze_date timestamp  ,
    cell_vial int  , --cell count
    experiment_id int  ,
    freezer_id int  ,
    location_id int  ,
    cane_id int  ,
    box_id int, 
    box_position integer[1][1],
    culture_condition varchar(250)  ,
    freezing_medium_id int  ,
    expanded_note text  ,
    add1 varchar(200)  ,
    add2 varchar(200)  ,
    add3 varchar(200)  ,
    add4 varchar(200)  ,
    add5 varchar(200)  ,
    pick_order_id int  ,
    order_item_id int  ,
    heriarch_id int default 6,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL ,
    CONSTRAINT bsample_pk PRIMARY KEY (id)
);

-- Table: sample_tag
CREATE TABLE ba.sample_tag (
    tag_id integer  ,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    sample_id int  ,
    CONSTRAINT pk_sample_tag PRIMARY KEY (tag_id)
);

-- Table: sample_type
CREATE TABLE ba.sample_type (
    id serial NOT NULL  ,
    pick_order_id int  ,
    sku varchar(255)  ,
    name varchar(255)  NULL,
    description text  ,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    CONSTRAINT pk_sample_type PRIMARY KEY (id)
);

-- Table: session
CREATE TABLE ba.session (
    id varchar(255)  ,
    data text  ,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    CONSTRAINT pk_sessions PRIMARY KEY (id)
);

-- Table: tag
CREATE TABLE ba.tag (
    id serial NOT NULL  ,
    name varchar(255)  ,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    CONSTRAINT pk_tag PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE ba."user" (
    id serial NOT NULL  ,
    email varchar(255)  ,
    first_name varchar(255)  ,
    last_name varchar(255)  ,
    active boolean   DEFAULT true,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

-- Table: user_role
CREATE TABLE user_role (
    user_id integer  ,
    role_id integer  ,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
    CONSTRAINT pk_user_role PRIMARY KEY (user_id,role_id)
);

DROP TABLE ba.hierarchy

CREATE TABLE ba.hierarchy (
   hierarchy_id int  NOT NULL,
   name varchar(30)  NOT NULL,
   parent_id int  NULL,
   CONSTRAINT hierarchy_pk PRIMARY KEY (hierarchy_id)
);

INSERT INTO ba.hierarchy(
	hierarchy_id, name, parent_id)
	VALUES (1, 'location', null),
	(2, 'lab', 1), 
	(3, 'freezer', 2), 
	(4, 'cane', 3), 
	(5, 'box', 4), 
	(6, 'sample', 5)
