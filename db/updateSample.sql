UPDATE ba.sample 
            SET user_key = ${user_key}, 
             name = ${name}, 
             description=${description}, 
            --  freeze_date=${freeze_date}, 
             cell_vial=${cell_vial}, 
			      freeezer_id = ${freezer_id},             
             experiment_id = ${experiment_id}, 
             location_id=${location_id}, 
             cane_id=${cane_id}, 
             box_id=${box_id}, 
             box_position=${box_position}, -- location
             culture_condition ${culture_condition}, 
             freezing_medium_id=${freezing_medium_id},, 
             expanded_note=${expanded_note}, 
             add1=${add1}, 
             add2=${add2}, 
             add3=${add3}, 
             add4=${add4}, 
             add5=$add5
WHERE id = ${sample_id}