SELECT b.id as box_id, s.name as sample_name
from ba.sample s
JOIN ba.hierarchy h ON h.parent_id = 5
JOIN ba.box b ON b.hierarchy_id = h.parent_id
WHERE b.id = ${box_id};