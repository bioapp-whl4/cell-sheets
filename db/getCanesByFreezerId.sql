SELECT distinct  
f.id as freezer_id, c.id as cane_id, c.name as cane FROM 
ba.freezer f
LEFT JOIN ba.cane c ON c.freezer_id = f.id
LEFT JOIN ba.freezer_type ft ON ft.freezer_id = f.id
WHERE c.freezer_id =${freezer_id}