SELECT c.id as cane_id, c.name as cane_name
FROM ba.cane c
WHERE c.id = ${cane_id};