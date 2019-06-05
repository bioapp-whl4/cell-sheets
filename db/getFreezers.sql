SELECT distinct f.id as freezer_id, f.name as freezer_name, f.temperature, ft.name as freezer_type FROM ba.freezer f
LEFT JOIN ba.freezer_type ft ON f.id = ft.freezer_id;
