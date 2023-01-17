# Jobly Backend

This is the Express backend for Jobly, version 2.

To run this:

    node server.js
    
To run the tests:

    jest -i

Steps Done in this Assessment:

## Part One: Create Documentation and Test for Function sqlForPartialUpdate

Test document can be found on "helpers" folder. Document is named sql.test.js

Run test document:

    jest sql.test.js

## Part two: Added filtering to route /companies GET

This route can now be filtered using the following:
- name
- maxEmployees
- minEmployees

This is passed on as a query string

    GET: 
    http://localhost:3001/companies?name=a&minEmployees=1&maxEmployees=100

## Part three: Change Authorization

### Updated the following on the Companies routes
- Retrieving the list of companies or information about a company should remain open to everyone, including anonymous users.
- Creating, updating, and deleting companies should only be possible for users who logged in with an account that has the is_admin flag in the database.

This is done by creating the ensureAdmin middleware found ih the middleware folder

Run test for companies:

    jest companies.test.js

### Updated the following on the Users routes
- Creating users should only permitted by admins (registration, however, should remain open to everyone).
- Getting the list of all users should only be permitted by admins.
- Getting information on a user, updating, or deleting a user should only be permitted either by an admin, or by that user.

This was also implemented by utilizing the ensureAdmin middleware

Run test for users:

    jest users.test.js

## Part Four: Jobs

### Created the following methods for the Job Model
- Create
- Find All with filtering (can be filtered using title, minSalary and hasEquity)
- Get
- Update
- Remove

### Create the following routes for /jobs
- POST /jobs
- GET /jobs with filtering
- GET /jobs/:id
- PATCH /jobs/:id
- DELETE /jobs:id

### Show Jobs for a Company
The route GET /companies/:handle has been updated to include job openings for companues

    { ... other data ... , jobs: [ { id, title, salary, equity}, ... ] }

## Part Five: Job Applications
Route POST /users/:username/jobs/:id has been added to the users routes

The function User.apply has been made to add rows to the applications table

The get-all info methods and the individual routes for users have been updated to include the IDs of the jobs that the user has applied for

    { ..., jobs: [ jobId, jobId, ... ] }