# EtherealJS (https://etherealjs.org/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/etherealdata/etherealJS/blob/master/LICENSE)

EtherealJS is an ultra-lightweight JavaScript library for building component-based UI.

* **Simple:** EtherealJS was designed with simplicity and readability in mind. 
* **Microapps and Components:** A microapp consists of a collection of stateful components sharing a common runtime used to store and display properties.
* **Highly Injectable:** Built to easily integrate into existing platforms, and even mobile applications. We feature CSS injection by returning a stylesheet from your runtime's styles() function to provide even more portability in your microapps.

Under 10kb in size, it can easily handle entire applications and even individual, injectable components into existing applications. It is quite performant, simplifies state reflection, and leverages native ES6 functionality. It is built to work with the latest browsers, but can easily be polyfilled with something such as Babel Polyfill. Currently, you may return a stylesheet in a template literal from the runtime's 'styles' function

If polyfilled, it can support down to IE8 as well.

[Learn how to use EtherealJS](https://etherealjs.org/wiki/getting-started.html).

## Documentation

You will find detailed EtherealJS documentation [on the website](https://etherealjs.org/wiki).  (COMING SOON)


## Examples

Here is a quick Hello World app to get you started

HTML:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
    <div id="container">

    </div>
    <script type="module" src="./script.js"></script>
</body>
</html>
```

script.js:
```
import Component from '../../src/component.js';
import Runtime from '../../src/runtime.js';

class HelloWorld extends Component {
  _onLoaded() {
    this.properties.name = 'World';
    super._onLoaded();
  }
  changeName() {
    this.setProperty('name', 'Wizard');
  }
  draw() {
    return `
        <div>
            Hello {this.properties.name}
            <a e click="changeName">Update Your Name</a>
        </div>
    `
  }
}

let app = new Runtime({
    container: '#container',
    definition: 'HelloWorld',
    library: {
        HelloWorld: HelloWorld
    }
```

This example will render "Hello World" into a container on the page. Once clicking the 'Update Your Name' link, it will re-draw to display "Hello Wizard"

You'll notice that we used ES6 template literal interpolation within the template literal returned in draw(). This will help you abstract dynamic properties into your draw templates, and extend tons of native functionality into the way you handle your template logic.

## QUICK START
To see it in action quickly, run an http-server from this directory, and go to /wiki url on your localhost


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
