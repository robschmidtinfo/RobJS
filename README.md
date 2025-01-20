# RobJS
**"The Minimalists JavaScript Framework"**<br /><br /> 
RobJS is a lightweight (less than 30 lines of code, ~1kB) JavaScript framework designed for developers who value simplicity, speed and control. Built to keep the essence of modern UI development without unnecessary complexity, RobJS empowers you to:<br /><br /> 

- **Define Views and Components with Ease** <br /> 
Create modular, reusable components and compose dynamic views effortlessly with a *React-ish* developer experience.
- **State-Driven Rendering** <br /> 
Automatically update only the parts of your UI that need it, optimizing performance.
- **Stay in Control** <br /> 
No virtual DOM. No bloated libraries. Just plain, efficient JavaScript.
- **Extensible by Design** <br /> 
Add your custom logic and extend functionality with no setup.<br /><br /> 

Whether you are prototyping a quick idea or crafting a focused application, RobJS gives you the tools to move fast, with minimal overhead but maximum clarity!

## Usage
1. Download this repository and place the file Rob.js somewhere in your project folder.

2. Start with a usual index.html-file where you define a div-Tag with an id of your choice.
Add a script-tag pointing to a JavaScript-file in your project folder. Name it as you like.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RobJS App</title>
</head>
<body>
    <p>Static html that stays unaffected and can help SEO</p>
    <div id="myapp"></div>
    <script type="module" src="app.js"></script>
</body>
</html>
```

3. Create the JavaScript file according to your script tag. In this case we call it app.js.
4. In app.js, initialize the app, define state variables, components and render the initial view like shown below.
```js
// app.js
import { RobJSApp } from "../../Rob.js";

const app = new RobJSApp('myapp'); // your tag id
app.init('app') // pass same name as your app variable as argument

// Define a state variable, pass a name and initial value
app.defineStateVar('count', 0);

// Define a component as a function (recommend: do this in a separate file and import it)
// The component should update automatically when the state changes 
// -> Therefore you must wrap the returning html in a div and give it a classname
const Counter = () => {

    return `
      <div class="Counter"> 
        <button onclick="app.updateState('count', app.state.count - 1)">-</button>
        ${app.state.count}
        <button onclick="app.updateState('count', app.state.count + 1)">+</button>
      </div>
    `
}

// Register the component, pass the component function, the classname and an array of state variables it listens to
app.defineComponent(Counter, 'Counter', ['count'])

// Start your app with an initial render of the component
app.render(Counter)
```

5. Done. Try it out by opening the index.html-file with your browser.
6. To see more examples like building a menu, getting data from an API, conditional rendering etc. go to [Examples](https://robjs.org/examples.html).
7. To see an example of a fully functional CRUD frontend app, take a look at [Simple Todo App made with RobJS](https://github.com/robschmidtinfo/simple-todo-app-made-with-robjs).