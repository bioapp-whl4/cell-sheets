WITH d as (
  INSERT INTO ba.experiment(
	name, scientist_user_id)
	VALUES (${experiment_name}, ${user_id})
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
VALUES      ( ${user_key}, 
              ${name}, 
              ${description}, 
              ${freeze_date}, 
              ${cell_vial}, 
              ${freezer_id}, 
              (SELECT * FROM d),
              ${location_id}, 
              ${cane_id}, 
              ${box_id}, 
              ${box_position}, --ARRAY[1, 1]
              ${culture_condition}, 
              ${freezing_medium_id}, 
              ${expanded_note}, 
              ${add1}, 
              ${add2}, 
              ${add3}, 
              ${add4}, 
              ${add5})