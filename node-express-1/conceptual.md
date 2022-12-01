### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
> Using promises and .then() is one way of managing asynchronous code. Once a Promise has been fulfilled, the .then() function can be used to process the response from the promise

> Another way is using async and await which would allow the code to act like it is synchronous. The await keyword basically waits for the promise to be fulfilled before moving on to the next line
- What is a Promise?
> A promise is a proxy value for a requested resource. It can either be fulfilled, pending, or rejected depending on what the source is returning to the request. Instead of waiting for the final value to be obtained, a promise will act as a proxy response that will eventually be finalized once a request is done
- What are the differences between an async function and a regular function?
> async functions will not wait for code to run line by line, instead, it can run a line temporarily even if it's not yet finalized and will move on to the next line. Async function always returns a Promise

> regular functions run code line after line. No line can be "skipped". 
- What is the difference between Node.js and Express.js?
> Node is the runtime environment that allows developers to create server-side tools while Express is a framework built on top of node.
- What is the error-first callback pattern?
> It's a callback function that accepts an error as it's first parameter. This function will either return an error object that can be passed on to the next middleware function or final value of the data.
- What is middleware?
> Middleware is a function that has access to the request, response objects and the next function.
- What does the `next` function do?
> The `next` function when executed executes the suceeding function in the express application. If the current middleware function does not end the request-response cycle (no return value) then it'll run the next middleware/function
- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
>This will return an array of promises instead of the final values. There will be a need to use the .then() function on each value in order to process the response.

>It will take longer to finish this function since we are waiting the each promise to be fulfilled before it moves on to requesting the next api call
