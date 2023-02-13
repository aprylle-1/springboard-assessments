### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router?
> To enable routing on the client side and to avoid having to refresh the page in order to get new information/data.
- What is a single page application?
> A single page application is a a web application that rewrites or rerenders the page without having to refresh/reload tha page itself.
- What are some differences between client side and server side routing?
> Client side routing does not render the entire page whenever a request is made to a route. It just changes the appropriate component that is linked to the new route.

> Server side routing will reload the entire page when a request is made.
- What are two ways of handling redirects with React Router? When would you use each?
> React has a `<Redirect>` Component which can be used as a way to redirect a user if a route doesn't exist

> The `history` object has a method called .push which is useful when redirecting someone to a different page after they have done something. An example would be adding an item to a list using a form, after the item has been added, the user can be redirected to a page showing all the items.
- What are two different ways to handle page-not-found user experiences using React Router? 
> Adding a route at the bottom of the routes that can match anything that match the other routes can be used as a 404 handler.

>Another method is adding a `<Redirect to="/">` at the bottom of the routes to ensure that any requested route that doesn't meet a path gets redirected to "./"
- How do you grab URL parameters from within a component using React Router?
> The React hook useParams can be used. It'll return an object containing the URL parameters as key and values.
- What is context in React? When would you use it?
> Context is data accessible across all components. This can be instantiated using the `React.createContext()`. Once a user has an instance of the context, it can wrap components around the `<Context.Provider value={example}></Context.Provider>` component.

> Any child component will them have access to the value prop. the value prop can be anything (string, num, obj)

> This value can then be accessed using the hook useContext.

> It allows passing information downwards without having to pass the data to the child component using props. It avoids prop drilling, this is where same information is being sent to every level/component downwards regardless if that component will use it or not.
- Describe some differences between class-based components and function components in React.

> Class based components require a render() method to return JSX. Functional components will just need to make the JSX needed as its return value.

> The state in class-based components are used as a contructor. The use of `this`  and `bind` is needed to change the state. Functional components need hooks to make them stateful.

> Lifecycle methods such as componentDidMount/componentDidUpdate can only be used in class-based components. The hook useEffect is the alternative for function components

- What are some of the problems that hooks were designed to solve?
> Previously, only class based components can used state, the introduction of hooks allows the use of state in a function component.

> With the use of hooks, saving state does not require the use of `this` and `bind` when using class functions.