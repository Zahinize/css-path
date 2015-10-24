CSSPath
=========

Get a unique and shortest CSS path to a DOM element

## Installation

Require JS Module
  
  ```Html
    <script type="text/javascript" data-main="path-to-/TestModule" src="path-to-/require.js")"></script>
  ```
  
  ```js
    define(['CSSPath'],
        function (CSSPath) {
    
            function TestController(options) {
                this._options = options || {};
    
                this.cssPath = new CSSPath({});
            }

            return TestController;
        });  
  ```
  
Vanilla JS
  
  ```Html
    <script type="text/javascript" src="path-to-/CSSPath.js")"></script>
  ```
  
  ```js
  	var cssPath = new CSSPath({});
  ```


## Usage

Require JS

```js
  define(['CSSPath'],
      function (CSSPath) {
  
          function TestController(options) {
              this._options = options || {};
  
              this.cssPath = new CSSPath({});
          }
  
          TestController.prototype.bindUiActions = function() {
              var that = this;
              document.addEventListener("mouseover", function(e) {
                  var element = e.target;
                  var cssSelector = that.cssPath.getSelector(element);
  
                  console.log("/************CSSPath Selector************/");
                  console.log("CSSPath: ", cssSelector);
                  console.log("Element: ", element);
                  console.log("Has element got a unique selector: ", that.cssPath.testSelector(element, cssSelector));
                  console.log("/__________________________________________/");
              }, false);
          };
  
      return TestController;
  });
```

Vanilla JS

```js
  (function() {
  	
  	var cssPath = new CSSPath({});
  	document.addEventListener("mouseover", function(e) {
  	    var element = e.target;
  	    var cssSelector = cssPath.getSelector(element);
  
  	    console.log("/************CSSPath Selector************/");
  	    console.log("CSSPath: ", cssSelector);
  	    console.log("Element: ", element);
  	    console.log("Has element got a unique selector: ", cssPath.testSelector(element, cssSelector));
  	    console.log("/__________________________________________/");
  	}, false);
  
  }).call(this);
```

## Tests

Require JS: http://zahinize.github.io/css-path/test/vanilla-js/

Vanilla JS: http://zahinize.github.io/css-path/test/require-js/


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.
