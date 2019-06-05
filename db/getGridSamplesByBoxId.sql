SELECT b.id as box_id, s.id as specimen_id, 
s.name as sample_name, 
s.description,
s.box_position,
s.experiment_id, 
s.freeze_date, 
s.culture_condition, 
s.cell_vial
from ba.sample s
JOIN ba.hierarchy h ON h.parent_id = 5
JOIN ba.box b ON b.hierarchy_id = h.parent_id
WHERE b.id = ${box_id};