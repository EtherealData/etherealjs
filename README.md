# EtherealJS (https://etherealjs.org/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/etherealdata/etherealJS/blob/master/LICENSE)

EtherealJS is an ultra-lightweight JavaScript library for building component-based UI.

* **Simple:** EtherealJS was designed with simplicity and readability in mind. 
* **Microapps and Components:** A microapp consists of a collection of stateful components sharing a common runtime used to store and display properties.
* **Highly Injectable:** Built to easily integrate into existing platforms, and even mobile applications. We feature CSS injection by returning a stylesheet from your runtime's styles() function to provide even more portability in your microapps.

Under 10kb in size, it can easily handle entire applications and even individual, injectable components into existing applications. It is quite performant, simplifies state reflection, and leverages native ES6 functionality. It is cross-browser friendly down to IE9.

If polyfilled with babel, it can support IE8 as well.

[Learn how to use EtherealJS](https://etherealjs.org/wiki/getting-started.html).

## Documentation

You will find detailed EtherealJS documentation [on the website](https://etherealjs.org/wiki).  (COMING SOON)


## Examples

Here is a quick Hello World app to get you started

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

### Style It

In your component, create a function named style that returns a style map, like in the example. 

To make code more readable, make sure to define class properties before subclasses. 

It may look weird at first, but the empty selector refers to the outermost div or container of your component's instance. 

A component-pid attribute selector will be used in place of the blank selector. 
This functionality ensures that your components will never break an existing application's styles. Never. 

Alternatively, you may also assign a class to the outermost div or element in your draw function, and use that in your style map. 
Please note however, this approach may override styles in an existing application if using an existing CSS class name.

#### home.js
    
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

## QUICK START
To see it in action quickly:

Terminal
```
git clone https://github.com/etherealdata/etherealjs
cd etherealjs
npm install http-server
http-server
```


## Installation

For now, git clone this repo. We will be bundling into NPM soon, as well as hosting a minified JS version on a CDN for easier usage.

EtherealJS is designed to work with the latest browsers, by using script-type module imports. 
For example:
```
<script src="script.js" type="module"></script>
```
It can also be polyfilled and turned into a script for older browsers. We plan on hosting both a minified script bundle, and a polyfilled/minified script bundle on CDN soon.
## Contributing

The purpose of this repository, is to provide to the public what has taken over a decade of UI development knowledge. It is in an early stage, and we are currently seeking adoption and contributions from experienced web-developers we see value in this concept.
If you would like to contribute, notify me beforehand at <a href="mailto:gio@etherealdata.com">gio@etherealdata.com</a>. You may create a branch, commit your changes, and submit a pull request for other me and other contributors to approve.

### Backlog/Next Features
- JS/CSS Parser to parse JS object and convert into a style sheet.
- Expand event map
- Base Router


### License

EtherealJS is [MIT licensed](./LICENSE).
