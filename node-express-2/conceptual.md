### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
> JWT is a standardized token that can be used to pass information between parties in a JSON Object.

- What is the signature portion of the JWT?  What does it do?
> The signature is done by concatenating the encoded header,  encoded payload and the secret key. It is used to verify if the token has not been tampered with and if the source is valid
- If a JWT is intercepted, can the attacker see what's inside the payload?
> Yes, the payload part of the token can be decoded.

- How can you implement authentication with a JWT?  Describe how it works at a high level.
> A token is passed to the server either as part of the request body or request header. This token is then verified on the back-end using a built in function from the JWT module -- this function will require the server to submit the token along with the secret key to see if the token is from who it says it was. If verification is successful, the code on the backend will continue to run. If not, it will throw and error.
- Compare and contrast unit, integration and end-to-end tests.
> Unit test is testing one specific function without considering its effects on other functions. You are just testing if this function is returning what is expected from it.

> Integration testing is grouping together a bunch of units that affect each other to see if they pass certain system requirements.

> End to end testing is testing a scenario from point A to point B to see if it'll do what is expected from the program every step of the way.

- What is a mock? What are some things you would mock?
> A mock is a replacement for the necessary data that will come from another unit/function. An example would be if you have a function that will be receiving an object from a different route, rather than simulating a test that goes through the route the function is dependent to, a mock object can be created and passed to the function just to check if it'll return the expected data.
- What is continuous integration?
> This is the practice of pushing and merging small code changes at a higher frequency rather than pushing codes by the bulk. This will make testing easier since only small bits are tested -- it'll be easier to isolate a bug if only a small feature is introduced at a time.
- What is an environment variable and what are they used for?
> Environment variables allow you to set conditions on how your app will behave or which variables or app will have in different modes -- either development or production.
- What is TDD? What are some benefits and drawbacks?
> Test Driven Development is designing the test first that the feature is going to go through and creating the code afterwards just for the purpose of passing said test case.

>It is easier to automate testing because you have already thought about the test case before creating the code. Which means it'll be easier to introduce small changes to the code as well since the initial code is simple and was only done to adhere to the test case.

>Requires a lot of test cases. Developers might end up uncessesarily writing test cases that are not really required which would be time consuming 
- What is the value of using JSONSchema for validation?
> JSONSchema can validate if the request that was being passed contains the necessary data/key-value pairs that are needed in order for the route to perform what is needed from it.

> It can be used to limit the data being passed to the request body. It can also make sure that required parameters are part of the request.
- What are some ways to decide which code to test?
> Functions and features that have a defined return value should be tested.

> Test code what may have edge cases to see if they are being covered.
- What does `RETURNING` do in SQL? When would you use it?
> RETURNING is a function that will return the desired data from a specific column. It is used when you are performing an action in SQL other than SELECTING such as INSERTING, UPDATING and DELETING rows in a table.
- What are some differences between Web Sockets and HTTP?
> Web sockets allow a realtime connection to occur between a server and the front-end. There will be no need to refresh the page in order for a change in the browser to happen. Whereas HTTP is stateless which means connection between the server and the browser is done once the server has passed what is being asked for by the browser.

> Web sockets are more lightweight than HTTP.
- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?
> I preferred using Express, it was a lot easier to organize your files compared to Flask. Although there is a feature in flask called a blueprint to organize your routes, it is not as easy sa doing it with Express.
