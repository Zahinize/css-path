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