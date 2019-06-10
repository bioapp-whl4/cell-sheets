-- SELECT c.id as cane_id, b.id as box_id, b.name as box_name
-- from ba.box b
-- JOIN ba.hierarchy h ON h.parent_id = 4
-- JOIN ba.cane c ON c.hierarchy_id = h.parent_id
-- WHERE c.id = ${cane_id}

SELECT distinct c.id as cane_id, b.id as box_id, b.name as box_name
from ba.box b
JOIN ba.hierarchy h ON h.parent_id = 4
JOIN ba.cane c ON c.hierarchy_id = h.parent_id
WHERE b.cane_id = ${cane_id}