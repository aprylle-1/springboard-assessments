### Conceptual Exercise

Answer the following questions below:

1. What is PostgreSQL
> PostgreSQL is a relational database management system

2. What is the difference between SQL and PostgreSQL?
> SQL is the language that is used to query a database - it's used to create "commands" to get data from a database. PostgreSQL is the database management system which is used to store and structure data. 

3. In `psql`, how do you connect to a database?
> If you are starting from the terminal it is "psql [name of database]". If you are already running postgres, it is \c [name of database]

4. What is the difference between `HAVING` and `WHERE`?
> HAVING is used for aggregates to filter records. WHERE is used to filter records as well but cannot be used for aggregates. 

5. What is the difference between an `INNER` and `OUTER` join?
> INNER JOIN is the data where the foreign key of one table has a corresponding value to the other table that is being joined. In OUTER JOIN, the returned results contain data even if the 2 tables don't "meet" anywhere.

6. What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?
> LEFT OUTER JOIN returns all the data from the LEFT table plus the data on the right table that matches the records from the left table.

> RIGHT OUTER JOIN returns all the data from the RIGHT table plus the data on the left table that matches the records from the right table.

7. What is an ORM? What do they do?
> ORM means Object-Relational Mapping. It's a "system" wherein a table/row on a database can be represented into an object.

8. What are some differences between making HTTP requests using AJAX 
  and from the server side using a library like `requests`?
> AJAX is used to connect with an API using Javascript (on the front-end) -- the browser requests for the data. Using libraries like requests allows the backend to get the data from the API before the view gets generated.

9. What is CSRF? What is the purpose of the CSRF token?
> It means Cross-Site Request Forgery -- it's when a request is being sent to the server from an unwanted/unauthorized source. A CSRF token is kind of like a password that is sent to a server along with the request to authenticate a request/to check if the source where the request is coming from is valid.

10. What is the purpose of `form.hidden_tag()`?
> This is used to render fields that have the hidden tag in a form.
