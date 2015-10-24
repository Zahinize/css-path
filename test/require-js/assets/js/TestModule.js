/**
 * CSSPath test Module
 * @author Zahin Omar Alwa
 * @date: 24/10/2015
*/
require.config({
  //By default load any module IDs from js/lib
  baseUrl: 'assets/js/lib',
  paths: {
  	custom: '../custom'
  }
});

require(["custom/TestController"], function(TestController) {
	console.log("Test controller has been loaded!");
	var testController = new TestController({});
	
	// Bind Ui Actions of testController
	testController.bindUiActions();
});