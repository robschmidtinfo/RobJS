# RobJS
RobJS is probably the simplest JavaScript Frontend Framework that is out there.<br /> 
It is all done in just one single line of code!

But that doesn't mean, it can't do much.<br />
It offers a similar developer experience like f.e. React.js as it mimics
core features like: 
- Statemanagement
- Functional Components
- plus extra navigation capabilities to make it a breeze building f.e. a menu
- plus keeps Vanilla JavaScript, where it is straightforward, f.e. in forms (unlike React.js)
- even solves SEO problematic if you compose your app also with static html

But the best thing is, that it is super lightweight and can be plugged in literaly everywhere (and even *multiple* times - with or without shared state!) in your project. No packaging manager or other bells and whistles needed.

Further there is no obligation to learn a new language.<br /> 
You know HTML, CSS and JavaScript? -> **You know RobJS**.

Because it is build very closely to Vanilla JavaScript, you get back full control over it. 
Nothing is hidden behind the scenes. For a seasoned developer, it is fairly easy to understand and you can fully customize or extend this framework to your own needs, building projects as small or big as you want.

## Usage
1. Download this repository and place the file RobJS.js somewhere in your project folder.

2. Start with a usual index.html-file where you define a div-Tag with an id of your choice.
Add a script-tag pointing to a JavaScript-file in your project folder. Name it as you like.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RobJS</title>
</head>
<body>
    <h1>RobJS</h1>
    <p>Some static html that stays unaffected and can help SEO...</p>
    <div id="myapp"></div>
    <script type="module" src="app.js"></script>
</body>
</html>
```

3. Create the JavaScript file according to your script tag. In this case we call it app.js.
4. In app.js, initialize the app, define state variables, views and routes like shown below.
```js
// app.js
import { RobJS } from "./RobJS.js";
import { Home } from "./views/home.js";
import { About } from "./views/about.js";

const app = new RobJS('myapp'); // your tag id
app.init('app') // pass same name as your app variable as argument

// Define state variables (name, initial value)
app.defineStateVar('count', 0);
app.defineStateVar('data', []);
  
// Define views
app.defineView('home', Home);
app.defineView('about', About);

// Register the view routes
app.route('/home', 'home');
app.route('/about', 'about');

// Start at home
app.navigate('/home');
```
5. You can create a folder structure in your project with the folders: "views" and "components" to keep things organized (but you don't need to).
6. To create a first component, start with something simple like this Header component.
```js
// ./components/Header.js
export const Header = () => `
  <p>Header Component (with state, count: <span style="color:red">${app.state.count}</span>)</p>
`;
```
7. And even simpler maybe a Footer.
```js
// ./components/Footer.js
export const Footer = () => `
  <p>Footer Component</p>
`;
```
8. Now you can plug these components into your first view that we name Home.js in this case.
```js
// ./views/Home.js
import { Footer } from "../components/Footer.js";
import { Header } from "../components/Header.js";

export const Home = () => `
  <h2>Dynamic Home View</h2>
  ${Header()}
  <button onclick="app.navigate('/about')">Go to About</button>
  ${Footer()}
`;
```
9. And maybe create a second view that we call About.js with much more functionality, like conditional rendering, update of state and data fetching. You can now navigate between your home and about view without losing state.
```js
// ./views/About.js
export const About = () => {
  
    const getBgColor = () => {
      if (app.state.count === 10) return 'green';
      if (app.state.count > 5) return 'red';
      return 'blue';
    }
    
    const fetchData = async () => {
            try {
              const response = await fetch('https://jsonplaceholder.typicode.com/posts');
              const data = await response.json();
              // Take only the first 5 elements from the fetched data
              const limitedData = data.slice(0, 5);
              app.updateState({ 'data': limitedData });
            } catch (error) {
              console.error('Error fetching data:', error);
            }
    }
  
    const fetchAndUpdateCount = async () => {
        
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          const data = await response.json();
          // 100 comes back but for this example we take a 10th
          const limitedData = data.length / 10;
          app.updateState({ 'count': limitedData });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    const handleIncrement = () => {
      app.updateState({ count: app.state.count + 1 })
    }

    const handleDecrement = () => {
      app.updateState({ count: app.state.count - 1 })
    }
  
    return `
      <h2>Dynamic About View</h2>
      <button onclick="app.navigate('/home')">Go to Home</button>
      <p style="color: ${getBgColor()};">Counter: ${app.state.count} (I change color when > 5 or == 10)</p>
      <button onclick="(${handleIncrement.toString()})()">+</button>
      <button onclick="(${handleDecrement.toString()})()">-</button>
      <p>
          Or fetch a counter value from a Rest API:
          <button onclick="(${fetchAndUpdateCount.toString()})()">Fetch</button>
      </p>
      <p>
          Or fetch some data from a Rest API:
          <button onclick="(${fetchData.toString()})()">Fetch</button>
      </p>
      <pre>${JSON.stringify(app.state.data, null, 2)}</pre>
    `;
  };
```
10. Done. Try it out by opening the index.html-file with your browser.
11. To see an example of a fully functional CRUD frontend app, take a look at [Simple Todo App made with RobJS](https://github.com/robschmidtinfo/simple-todo-app-made-with-robjs?).