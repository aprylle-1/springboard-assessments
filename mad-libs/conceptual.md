### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it?
> React is a Javascript front-end framework that allows developers to divide the front-end of an app into components.

> This is recommended because React components can be made into small parts which makes editing and documenting easily.
- What is Babel?
> Babel is a tool that translate React syntax to Javascript that can be read by the compiler 
- What is JSX?
> JSX allows HTML elements to be written in Javascript without having to use createElement()
- How is a Component created in React?
> Components are Javascript functions that return HTML elements. These are small reusable codes that can be rendered to show the HTML element that the Component returns
- What are some difference between state and props?
> State is mutable while props is not.
- What does "downward data flow" refer to in React?
> This is where there is a smart parent component that contains the relevant state/data/functions that is needed for dynamic changes. The data from the smart parent component are then passed to child components as props.
- What is a controlled component?
> Controlled components are components that are dependent on the state of the component. An example of this are form inputs whose value is dependent on the state assigned to it as its value. They maintain their own state, which means as you attempt to change the input, the state which the value of the input is dependent on, will also change.
- What is an uncontrolled component?
> Uncontrolled components are components whose values are not kept in a state but is dependent on what is on the DOM. An example of this is a file input from a user.
- What is the purpose of the `key` prop when rendering a list of components?
> It is done to give a list item a unique id to prevent the app from getting confused when components are being loaded/unloaded
- Why is using an array index a poor choice for a `key` prop when rendering a list of components?
> Because arrays are mutable and their lengths/indexes can increase/decrease
- Describe useEffect.  What use cases is it used for in React components?
> useEffect is a react hook that receives a function as its first argument, this function will be ran always after the first render.

> It receives a second argument that is array, this will decide the behaviour of the useEffect hook. If a blank array [] is passed, the function passed as the first argument will only run after the first render. If passed an array with values, these will become the dependents of useEffect. Anytime one of the values of the dependents changes, the function from the first argument will run.

- What does useRef do?  Does a change to a ref value cause a rerender of a component?
> useRef is a Reacthook that will create an object for the app that has a key "current". This can act as a global property but is actually limited to the component only.

> No, a rerender will not happen if the ref value is changed.
- When would you use a ref? When wouldn't you use one?
> If you want to change a value of a property without needing to rerender the component.

> If useState or a rerender is needed, do not use ref.
- What is a custom hook in React? When would you want to write one?
> Is a function that can use other hooks. It is done when a logic is used across different components -- a custom hook can be used to avoid having to write the same logic in different components.
