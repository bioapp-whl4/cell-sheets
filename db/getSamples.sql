SELECT s.id, user_key, s.name, description, freeze_date, cell_vial, 
e.name, e.experiment_id,
f.name, 
l.name, l.state, 
c.name, 
b.name, 
box_position, 
culture_condition, 
--fm.freezing_medium, 
expanded_note, add1, add2, add3, add4, add5, pick_order_id, order_item_id, s.inserted_at, 
s.updated_at
	FROM ba.sample s
	LEFT JOIN ba.location l ON location_id = l.id
	LEFT JOIN ba.experiment e ON s.experiment_id = e.id
	LEFT JOIN ba.box b ON box_id = b.id
	LEFT JOIN ba.cane c ON cane_id = c.id
	LEFT JOIN ba.freezer f ON freezer_id = f.id
	LEFT JOIN ba.freezer_type ft ON f.freezer_id = ft.freezer_id
	--JOIN ba.freezing_medium fm ON freezing_medium_id = fm.id