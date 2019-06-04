SELECT distinct f.name as freezer, f.temperature, ft.name as freezer_type
FROM ba.freezer f
JOIN ba.freezer_type ft ON ft.freezer_id = f.id
WHERE f.id = ${freezer_id};