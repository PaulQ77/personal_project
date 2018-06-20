select users.email, users.auth0_id, users.name
from users
Join admin on users.auth0_id=admin.auth0_id;
