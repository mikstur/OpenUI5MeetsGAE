jQuery.sap.declare("Application");
jQuery.sap.require("sap.ui.app.Application");
jQuery.sap.require("Endpoint"); 

sap.ui.app.Application.extend("Application", {
	
	init: function() {
		// Set global models...
	},
	
	main: function() {
		// Create app view and set to the root html element
		var root = this.getRoot();
		var application = sap.ui.jsview("application", "js.Application");
		application.placeAt(root);
		
		// Connect to Google App Engine Endpoints
		var library = new Endpoint({
			id: "clientEndpoint",
			gapiObject: [
			    { name: "employeeendpoint", version: "v1" }  // Allows for multiple endpoints to be loaded
			]
		}).createLibrary();  // Create and return the loaded client library
		
		// Attach the client library to the application for easy access
		application.setClientEndpointLibrary( library );
	}
	
});