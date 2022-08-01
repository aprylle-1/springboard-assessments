### Conceptual Exercise

Answer the following questions below:

#### 1. What are important differences between Python and JavaScript?  
* Python is the programming language used in the backend (server-side) while JavaScript is primarily used to interact with the frontend (client-side) but it can be used in the backend too. 

#### 2. Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you can try to get a missing key (like "c") *without* your programming crashing.
* Use _.get(key)_ on an dictionary, and if said key is missing in the dictionary, it will return _None_.
```
dict = { "a" :  1,  "b" : 1 }  
get_c = dict.get("c")
```  
>_get_c_ will be equal to _None_
* Use _key in dict.keys()_ to check if said key exists in the key, value pair
```
dict = { "a" : 1, "b" : 1 }  
if "c" in dict.keys(): 
...
```  
>The code above will not enter the _if_ statement because the condition was not met 

#### 3. What is a unit test?
* A unit test is testing the results of one function

#### 4. What is an integration test?
* An integration test is testing the functions or parts work together to get the expected result

#### 5. What is the role of web application framework, like Flask?
* A web framework is a tool that is designed to make the development of web application easier for developers. It is like a dictionary of pre-made methods and features that was designed with the purpose of developing web applications without the need of doing them from scratch.
* Flask specifically helps with the creation of a server, wherein a developer would only need to write a few lines of code to create a server that provides data/information to the browser instead of doing it in "_regular_" python

#### 6. You can pass information to Flask either as a parameter in a route URL(like '/foods/pretzel') or using a URL query param (like 'foods?type=pretzel'). How might you choose which one is a better fit for an application?
* Passing a parameter in q in a route is used if the server wants to route the user to a specific resourse whereas a query parameter is better used when passing the server information that it can use to search or sort for data.
#### 7. How do you collect data from a URL placeholder parameter using Flask?
* You will need to pass that placeholder parameter's name to the route's function
```
@app.route('/sample/<some_paramater>')
def example(some_parametrer):
... 
```
> _some_parameter_ on the code above can now be used by the developer as a parameter on the function
#### 8. How do you collect data from the query string using Flask?
* Request.args can be used to get data from the query string
* This is treated like a dictionary
```
Example: You are trying to get the value of username from a query string

Your code will look like the following:

...
username = request.args['username']
...
```

#### 9. How do you collect data from the body of the request using Flask?
* There are several ways to collect the data from the request body but the most commonly used is either request.form or request.args depending if it is a post or get request.

* request.json can also be used if the request have application/json as its content type
#### 10. What is a cookie and what kinds of things are they commonly used for?  
* A cookie is a piece of information that the server initially tells the browser to remember. The browser then passes on the cookie to the server (to do whatever it wants) everytime the browser makes a request to the server

#### 11. What is the session object in Flask?
* it is like a cookie but has been encrypyted so that it cannot be easily read on the client-side(browser)
* the session _object_ can be accessed on the client-side as if it is a dictionary
```
Setting a session

Assuming session has already been improted from flask:

...
session['favorite_flavor'] = 'ube'
...

Getting the value from session
...
favorite_flavor = session.get('favorite_flavor')
...
```
#### 12. What does Flask's `jsonify()` do?
*  _jsonify( )_ will return an iterable as a json object to the client-side that is making the request
