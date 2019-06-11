
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
	name, cane_id)
	VALUES ( 'KRAS Exp3', 2);

--CANE
INSERT INTO ba.cane(
	name, freezer_id)
	VALUES ('cane-3', 2);

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

 ---INSERT INTO SAMPLE WITH NEW experiment.id
 WITH d as (
  INSERT INTO ba.experiment(
	name, userDefined_experiment_id, scientist_user_id)
	VALUES ('experiment 1', '002b', 1)
  RETURNING id
)
INSERT INTO ba.sample 
            (user_key, 
             name, 
             description, 
             freeze_date, 
             cell_vial, 
             freeezer_id,
             experiment_id,
             location_id, 
             cane_id, 
             box_id, 
             box_position, 
             culture_condition, 
             freezing_medium_id, 
             expanded_note, 
             add1, 
             add2, 
             add3, 
             add4, 
             add5) 
 VALUES
(             
'HC001',
  'mySample4',
  'HSC cells transfected with goneria',
  '2018-05-31 21:51:48.977507+00',
	89,
  1,
  (SELECT * FROM d),
  1,
  1,
	2,
  ARRAY[ 0, 1 ],
'DMEM with 10% FBS and pen-strep',
'Cryostar 100%',
'my expanded note',
 'additional Note 1',
 'add Note 2',
 'add Note 3',
  'add Note 4',
  'additional note5'
  )

