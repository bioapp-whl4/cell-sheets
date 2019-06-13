SELECT distinct s.id as sample_id, user_key, s.name as sample_name, description, freeze_date::date::varchar, cell_vial, 
e.id as experiment_id, e.name as experiment_name,
f.id as freezer_id, f.name as freezer_name,
l.id as location_id, l.name as location_name, l.state as state_name,
c.id as cane_id, c.name as cane_name, 
b.id as box_id, b.name as box_name, 
box_position, 
culture_condition, 
--fm.freezing_medium, 
expanded_note, add1, add2, add3, add4, add5, pick_order_id, order_item_id, s.inserted_at, 
s.updated_at
	FROM ba.sample s
	LEFT JOIN ba.location l ON s.location_id = l.id
	LEFT JOIN ba.experiment e ON s.experiment_id = e.id
	LEFT JOIN ba.box b ON s.box_id = b.id
	LEFT JOIN ba.cane c ON s.cane_id = c.id
	LEFT JOIN ba.freezer f ON s.freeezer_id = f.id
	LEFT JOIN ba.freezer_type ft ON f.id = ft.freezer_id
	--JOIN ba.freezing_medium fm ON freezing_medium_id = fm.id
