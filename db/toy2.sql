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
  '2018-06-01T03=51=48.977Z',
  89,
  1,
  1,
  1,
  1,
  2,
  ARRAY[ 0, 1 ],
'DMEM with 10% FBS and pen-strep',
'Cryostar 100%',
'my expanded note',
 'additional note1',
 'add Note 2',
 'add Note 3',
  'add Note 4',
  'additional note5'
  )