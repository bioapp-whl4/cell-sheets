SELECT distinct  
f.id as freezer_id, c.id as cane_id, c.name as cane FROM 
ba.freezer f
JOIN ba.hierarchy h ON h.parent_id = 3
JOIN ba.cane c ON c.hierarchy_id = h.hierarchy_id
JOIN ba.freezer_type ft ON ft.freezer_id = f.id
WHERE f.id =${freezer_id}