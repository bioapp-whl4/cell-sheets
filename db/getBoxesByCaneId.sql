SELECT c.id as cane_id, b.id as box_id, b.name as box_name
from ba.box b
JOIN ba.hierarchy h ON h.parent_id = 4
JOIN ba.cane c ON c.id = b.cane_id
WHERE c.id = ${cid}

-- SELECT c.id as cane_id, b.id as box_id, b.name as box_name
-- from ba.box b
-- JOIN ba.cane c ON b.cane_id = c.id
-- WHERE c.id = ${cid}