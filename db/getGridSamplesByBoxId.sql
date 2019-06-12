SELECT distinct b.id as box_id, s.id as specimen_id, 
s.name as sample_name, 
s.description,
s.box_position as location,
s.experiment_id, 
s.freeze_date, 
s.culture_condition, 
s.cell_vial
from ba.sample s
JOIN ba.box b ON b.id = s.box_id
WHERE b.id = ${box_id};