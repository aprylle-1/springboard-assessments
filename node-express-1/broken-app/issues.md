# Broken App Issues
- No error handling. There is no middleware that processes the error once an error object has been passed to the `next` function.
- `results` will only contain an array of Promises rather than the final value. The map function will not work since it is working with a Promise Object rather then the actual response
- `app`, `express` and `axios` should just be constants (var shouldn't be used) to avoid having them be overwritten
- There's no package.json -- developers will not know the apps dependencies