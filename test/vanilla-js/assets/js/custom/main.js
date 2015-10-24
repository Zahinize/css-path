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