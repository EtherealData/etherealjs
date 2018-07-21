# EtherealJS (https://etherealjs.org/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/etherealdata/etherealJS/blob/master/LICENSE)

![](https://etherealjs.org/assets/images/logo-blue.png)

EtherealJS is an ultra-lightweight JavaScript library for building component-based UI.

* **Simple:** EtherealJS was designed with simplicity and readability in mind. 
* **Microapps and Components:** A microapp consists of a collection of stateful components sharing a common runtime used to store and display properties.
* **Highly Injectable:** Built to easily integrate into existing platforms, and even mobile applications. We feature CSS injection by returning a stylesheet from your runtime's styles() function to provide even more portability in your microapps.

Under 10kb in size, it can easily handle entire applications and even individual, injectable components into existing applications. It is quite performant, simplifies state reflection, and leverages native ES6 functionality. It is cross-browser friendly down to IE9.

If polyfilled with babel, it can support IE8 as well.

[Learn how to use EtherealJS](https://etherealjs.org/wiki/getting-started.html).

## Documentation

You will find detailed EtherealJS documentation [on the website](https://etherealjs.org).  (COMING SOON)


## Examples

Here is a quick Hello World app to get you started
-------------------------
### Your First Component
First, create a new directory, and clone https://github.com/etherealdata/etherealjs repo. 


#### Terminal:

```
cd ~
mkdir helloworld
cd helloworld
git clone https://github.com/etherealdata/etherealjs
```

Then, inside of the directory your created, create a JS file named home that imports Component and Runtime from etherealjs/src.

Now create a class named HelloWorld that extends Component. 

In HelloWorld class, define a function named 'draw' that returns a template literal using backticks. 

As you can see in the example, we are defining a variable named location that defaults to 'World'. 
We will later on create a function that updates this property using setProperty, which in turn will redraw your instance in the DOM. 

At the bottom of the file, instantiate a new Runtime, passing the HelloWorld definition into the library property of config. 

Finally, place a Component tag as well as import the script as a module in your HTML file.

#### index.html     
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello World with EtherealJS!</title>
</head>
<body>
    <Component definition="HelloWorld"></Component>
    <script src="./home.js" type="module"></script>
</body>
</html>
```
        

    
#### home.js
```    
import Component from './etherealjs/src/component.js';
import Runtime from './etherealjs/src/runtime.js';

export class HelloWorld extends Component {
    constructor(config) {
        super(config);
    }
    draw() {
        return `


                <div>
                    Hello World
                </div>
                <button>Update</button>



        `
    }
}

new Runtime({
    library: {
        HelloWorld: HelloWorld
    }
});
```
----------------------------
### Style It

In your component, create a function named style that returns a style map, like in the example. 

To make code more readable, make sure to define class properties before subclasses. 

It may look weird at first, but the empty selector refers to the outermost div or container of your component's instance. 

A component-pid attribute selector will be used in place of the blank selector. 
This functionality ensures that your components will never break an existing application's styles. Never. 

Alternatively, you may also assign a class to the outermost div or element in your draw function, and use that in your style map. 
Please note however, this approach may override styles in an existing application if using an existing CSS class name.


#### home.js
    
```
import Component from './etherealjs/src/component.js';
import Runtime from './etherealjs/src/runtime.js';

export class HelloWorld extends Component {
    constructor(config) {
        super(config);
    }
    style() {
        return {
            '': {
                'background': '#eee',
                'h1': {
                    'font-size': '24px',
                    'color': '#666',
                    'padding': '10px'
                },
                'button': {
                    'background': '#127fbd',
                    'color: '#fff',
                    'font-size': '18px'
                }
            }
        }
    }
    draw() {
        let location = this.properties['location'] || 'World';
        return `
                <div>
                    <h1>
                        Hello ${location}!
                    </h1>
                </div>
                <button>Update</button>
        `
    }
}

new Runtime({
    library: {
        HelloWorld: HelloWorld
    }
});
```


----------------------------
### Handle an Event

In your component, create a function named style that returns a style map, like in the example. 

To make code more readable, make sure to define class properties before subclasses. 

It may look weird at first, but the empty selector refers to the outermost div or container of your component's instance. 

A component-pid attribute selector will be used in place of the blank selector. 
This functionality ensures that your components will never break an existing application's styles. Never. 

Alternatively, you may also assign a class to the outermost div or element in your draw function, and use that in your style map. 
Please note however, this approach may override styles in an existing application if using an existing CSS class name.


#### home.js
    
```
import Component from './etherealjs/src/component.js';
import Runtime from './etherealjs/src/runtime.js';

export class HelloWorld extends Component {
    constructor(config) {
        super(config);
    }
    style() {
        return {
            '': {
                'background': '#eee',
                'h1': {
                    'font-size': '24px',
                    'color': '#666',
                    'padding': '10px'
                },
                'button': {
                    'background': '#127fbd',
                    'color: '#fff',
                    'font-size': '18px'
                }
            }
        }
    }
    update() {
        this.setProperty('location', 'Florida');
    }
    draw() {
        let location = this.properties['location'] || 'World';
        return `
                <div>
                    <h1>
                        Hello ${location}!
                    </h1>
                </div>
                <button e click="update">Update</button>
        `
    }
}

new Runtime({
    library: {
        HelloWorld: HelloWorld
    }
});
```

-----------------------
### Create an SPA
Go back to your HTML file, and replace the Component tag with a new Router tag. 
Inside of the Router tag, place two child Route tags. 

Assign a 'path' attribute and a 'definition' attribute to each one. 
For the first one, assign '/' as the path, and 'HelloWorld' as the definition. 
For the second one, make it '/about' and 'About' for the definition. 

Create a new Component definition in the JS file, and in the draw template, create a textarea and a button. 

Finally, include the new component in the runtime's library.

#### index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello World with EtherealJS!</title>
</head>
<body>
    <Router>
        <Route path="/" definition="HelloWorld"></Route>
        <Route path="/about" definition="About"></Route>
    </Router>
    <script src="./home.js" type="module"></script>
</body>
</html>
```
        

    
#### home.js
```    
import Component from './etherealjs/src/component.js';
import Runtime from './etherealjs/src/runtime.js';

export class HelloWorld extends Component {
    constructor(config) {
        super(config);
    }
    style() {
        return {
            '': {
                'background': '#eee',
                'h1': {
                    'font-size': '24px',
                    'color': '#666',
                    'padding': '10px'
                },
                'button': {
                    'background': '#127fbd',
                    'color: '#fff',
                    'font-size': '18px'
                }
            }
        }
    }
    update() {
        this.setProperty('location', 'Florida');
    }
    draw() {
        let location = this.properties['location'] || 'World';
        return `
                <div>
                    <h1>
                        Hello ${location}!
                    </h1>
                </div>
                <button e click="update">Update</button>
        `
    }
}

export class About extends Component {
    constructor(config) {
        super(config);
    }
    style() {
        return {
            '': {
                'background': '#eee',
                'textarea': {
                    'font-size': '24px',
                    'color': '#000',
                    'padding': '10px',
                    'background': '#fff'
                },
                'button': {
                    'background': '#127fbd',
                    'color: '#fff',
                    'font-size': '18px'
                }
            }
        }
    }
    submit() {
        // submit logic here
    }
    draw() {
        return `
                <div>
                    <textarea></textarea>
                </div>
                <button e submit="submit">Submit</button>



        `
    }
}

new Runtime({
    library: {
        HelloWorld: HelloWorld,
        About: About
    }
});
```    

-------------------------
### Run a build
If you need to use this for a production site, you will need to make sure to support browsers that do not use ES6 imports. 

We have made it as simple as running a command. 
First, 'npm install' to make sure webpack is installed. Then, 'npm run build'. 

#### Terminal:
```
npm install
npm run build
```                             


Webpack will build a dependency graph based off of your imports and compile everything into dist/main.js. Sweet. 

Now, instead of loading script as a module in index, point it to dist/main.js as a text/javascript type instead. 

Wallah!

#### index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello World with EtherealJS!</title>
</head>
<body>
    <Router>
        <Route path="/" definition="HelloWorld"></Route>
        <Route path="/about" definition="About"></Route>
    </Router>
    <script src="./dist/main.js" type="text/javascript"></script>
</body>
</html>
```
--------------------------      

### QUICK START
Clone the etherealjs website to see it in action.

#### Terminal
```
git clone https://github.com/etherealdata/etherealjs-org
cd etherealjs-org/assets
git clone https://github.com/etherealdata/etherealjs
cd ..
npm install http-server
http-server
```
        
## Installation

For now, git clone this repo. We will be bundling into NPM soon, as well as hosting a minified JS version on a CDN for easier usage.

## Contributing

The purpose of this repository, is to provide to the public what has taken over a decade of UI development knowledge. It is in an early stage, and we are currently seeking adoption and contributions from experienced web-developers who see value in this concept.

If you would like to contribute, notify me beforehand at <a href="mailto:gio@etherealdata.com">gio@etherealdata.com</a>. You may create a branch, commit your changes, and submit a pull request for other me and other contributors to approve.


### License

EtherealJS is [MIT licensed](./LICENSE).
