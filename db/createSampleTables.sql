-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-06-03 18:19:44.588

-- tables
-- Table: box
CREATE TABLE box (
    id serial NOT NULL  ,
    name varchar(255),
    inserted_at timestamp,
    updated_at timestamp,
    CONSTRAINT pk_tag PRIMARY KEY (id)
);

-- Table: cane
CREATE TABLE cane (
    id serial NOT NULL  ,
    name varchar(255) ,
    inserted_at timestamp ,
    updated_at timestamp ,
    CONSTRAINT pk_tag PRIMARY KEY (id)
);

-- Table: experiment
CREATE TABLE experiment (
    id serial NOT NULL  ,
    name varchar(255)  ,
    inserted_at timestamp  ,
    updated_at timestamp  ,
    CONSTRAINT pk_tag PRIMARY KEY (id)
);

-- Table: freezer
CREATE TABLE freezer (
    id serial NOT NULL  ,
    name varchar(255)  ,
    temperature decimal(10,2)  ,
    freezer_id int  ,
    inserted_at timestamp  ,
    updated_at int  ,
    CONSTRAINT pk_tag PRIMARY KEY (id)
);

-- Table: freezer_type
CREATE TABLE freezer_type (
    id serial NOT NULL  ,
    name varchar(255)  ,
    inserted_at timestamp  ,
    updated_at timestamp  ,
    freezer_id int  ,
    CONSTRAINT pk_tag PRIMARY KEY (id)
);

-- Table: freezing_medium
CREATE TABLE freezing_medium (
    id serial NOT NULL  ,
    name varchar(255)  ,
    inserted_at timestamp  ,
    updated_at timestamp  ,
    CONSTRAINT pk_tag PRIMARY KEY (id)
);

-- Table: lab
CREATE TABLE lab (
    id serial NOT NULL  ,
    name varchar(255)  ,
    inserted_at timestamp  ,
    updated_at timestamp  ,
    freezer_id int  ,
    location_id int  ,
    freezer_2_id int  ,
    CONSTRAINT pk_tag PRIMARY KEY (id)
);

-- Table: location
CREATE TABLE location (
    id serial NOT NULL  ,
    name varchar(255)  ,
    state varchar(200)  ,
    inserted_at timestamp  ,
    city varchar(200)  ,
    CONSTRAINT pk_tag PRIMARY KEY (id)
);

-- Table: order_item
CREATE TABLE order_item (
    id serial NOT NULL  ,
    pick_list_id int  ,
    sample_id int  ,
    quantity int  ,
    CONSTRAINT order_item_pk PRIMARY KEY (id)
);

-- Table: pick_item
CREATE TABLE pick_item (
    id serial NOT NULL  ,
    pick_list_id int  ,
    sample_id int  ,
    quantity int  ,
    CONSTRAINT pick_item_pk PRIMARY KEY (id)
);

-- Table: pick_list
CREATE TABLE pick_list (
    id serial NOT NULL  ,
    user_id int  ,
    inserted_at timestamp  ,
    updated_at timestamp  ,
    checked_out timestamp  ,
    CONSTRAINT pick_list_pk PRIMARY KEY (id)
);

-- Table: pick_order
CREATE TABLE pick_order (
    id serial NOT NULL  ,
    session_id varchar(255)  ,
    user_id integer  ,
    inserted_at timestamp  ,
    updated_at timestamp  ,
    pick_list_id int  ,
    CONSTRAINT pk_subscription_order PRIMARY KEY (id)
);

-- Table: role
CREATE TABLE role (
    id serial NOT NULL  ,
    name varchar(255)  ,
    inserted_at timestamp  ,
    updated_at timestamp  ,
    CONSTRAINT pk_roles PRIMARY KEY (id)
);

-- Table: sample
CREATE TABLE sample (
    id serial NOT NULL  ,
    user_key varchar(200)  ,
    name varchar(100)  ,
    description text  ,
    freeze_date timestamp  ,
    cell_vial int  ,
    experiment_id int  ,
    freeezer_id int  ,
    location_id int  ,
    cane_id int  ,
    box_position int  ,
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
    inserted_at timestamp  ,
    updated_at timestamp  ,
    experiment_2_id int  ,
    freezer_id int  ,
    location_2_id int  ,
    box_id int  ,
    CONSTRAINT sample_pk PRIMARY KEY (id)
);

-- Table: sample_tag
CREATE TABLE sample_tag (
    tag_id integer  ,
    inserted_at timestamp  ,
    updated_at timestamp  ,
    sample_id int  ,
    CONSTRAINT pk_product_tag PRIMARY KEY (tag_id)
);

-- Table: sample_type
CREATE TABLE sample_type (
    id serial NOT NULL  ,
    pick_order_id int  ,
    sku varchar(255)  ,
    name varchar(255)  NULL,
    description text  ,
    inserted_at timestamp  ,
    updated_at timestamp  ,
    CONSTRAINT pk_product PRIMARY KEY (id)
);

-- Table: session
CREATE TABLE session (
    id varchar(255)  ,
    data text  ,
    inserted_at timestamp  ,
    updated_at timestamp  ,
    CONSTRAINT pk_sessions PRIMARY KEY (id)
);

-- Table: tag
CREATE TABLE tag (
    id serial NOT NULL  ,
    name varchar(255)  ,
    inserted_at timestamp  ,
    updated_at timestamp  ,
    CONSTRAINT pk_tag PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE "user" (
    id serial NOT NULL  ,
    email varchar(255)  ,
    first_name varchar(255)  ,
    last_name varchar(255)  ,
    active boolean   DEFAULT true,
    inserted_at timestamp  ,
    updated_at timestamp  ,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

-- Table: user_role
CREATE TABLE user_role (
    user_id integer  ,
    role_id integer  ,
    inserted_at timestamp  ,
    updated_at timestamp  ,
    CONSTRAINT pk_user_role PRIMARY KEY (user_id,role_id)
);
