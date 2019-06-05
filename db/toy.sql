INSERT INTO ba.sample 
            (user_key, 
             name, 
             description, 
             freeze_date, 
             cell_vial, 
             freezer_id,
             experiment_id 
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
user_key= 'HC001',
  name= 'mySample4',
  descript= 'HSC cells transfected with goneria',
  freeze_date= '2018-06-01T03=51=48.977Z',
  cell_vial= 89,
  freezer_id= 1,
  experiment_id=1,
  location_id= 1,
  cane_id= 1,
  box_id= 2,
  box_position= ARRAY[ 0, 1 ],
  culture_condition= 'DMEM with 10% FBS and pen-strep',
  freezing_medium_id= 'Cryostar 100%',
  expanded_note= 'my expanded note',
  add1= 'additional note1',
  add2= 'add Note 2',
  add3= 'add Note 3',
  add4= 'add Note 4',
  add5= 'additional note5'
  )