# BUGS

### BUG #1
BUG Description: ROUTE PATCH users/:username does not allow user themselves to update their own data

Solution: REMOVE requireAdmin as one of the required middleware that the route has to go through.

### BUG #2
BUG Description: ROUTE PATCH users/:username does not filter if request body is passing other values besides first_name, last_name, phone, email

Solution: FILTER the data that gets passed to the function sqlPartialUpdate() -- bug fix can be found on models/user.js

### BUG #3
BUG Description: ROUTE GET users/:username does not return a 404 error when user cannot be found

Solution: In models/user.js function User.get(username) does not throw an error, it just instantiates a new one. Bug can be fixed by adding "throw" before the new error gets instantiated

### BUG #4
BUG Description: Route GET /users, the user info that should be returned should only be username, first_name, last_name

Solution: In models/user.js, edit User.getAll() to only return username, first_name, last_name

### BUG #5
BUG Description: In  middleware/auth.js authUser is allowing the token to be passed in the query string. This might cause security issues

### BUG #6
Bug Description: In middleware/auth.js authUser is decoding the token instead of verifying it with the secret key. This will cause security issues since any token can be passed and will be authenticated as a valid user as long as it has the required parameters in the payload

Solution: Verify the token instead of decoding it.
