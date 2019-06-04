
--FREEZER_LOCATION
INSERT INTO ba.location(
	name, state, city)
	VALUES ('Dogtown', 'Alabama', 'Dogtown city');

--EXPERIMENT
INSERT INTO ba.experiment(
	name, experiment_id, scientist_user_id)
	VALUES ('myExperiment', 'Exp20190530CN', 1);

--BOX
INSERT INTO ba.box(
	name)
	VALUES ( 'KRAS Exp3453');

--CANE
INSERT INTO ba.cane(
	name)
	VALUES ('13');

--FREEZER
INSERT INTO ba.freezer(
	name, temperature, freezer_id)
	VALUES ('ColdSpace1', 0.0, 1);

--FREEZER_TYPE
INSERT INTO ba.freezer_type(
	name, freezer_id)
	VALUES ('ColdColdCold', 1);
--FREEZING MEDIUM
INSERT INTO ba.freezing_medium(
	name)
	VALUES ('Cryostor 100%');

--INSERT DATA INTO SAMPLE, WITHOUT CART DATA
INSERT INTO ba.sample(
    user_key, name, description, freeze_date, cell_vial, experiment_id, freeezer_id, location_id, 
	cane_id, box_id, box_position, culture_condition, freezing_medium_id, expanded_note, add1)
    VALUES ('HSC_0001', 'mySample', 'HSC cells transfected with GFP', 
    '2019-05-31 21:51:48.977507+00', 1, 1, 1, 
    1, 1, 1, ARRAY[1,1], 'DMEM with 10% FBS and pen-strep', 1,
 'expanded note', 'additional_note_1');
 select * from ba.sample;

