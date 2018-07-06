select users.id, users.name, users.email, receipts.*
from users
Join receipts on users.id=receipts.user_id where users.email = 'pquiroz1977@gmail.com';