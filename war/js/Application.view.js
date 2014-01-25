sap.ui.jsview("js.Application", {
	
	getControllerName: function() {
		return "js.Application";
	},
	
	createContent: function(oController) {
		
		this.shell = new sap.m.Shell({id: "Shell", title: "Test"});
		this.app   = new sap.m.App("App");
		
		// Define Pages...
		this.home           = sap.ui.jsview("Home", "js.Home");
		this.createEmployee = sap.ui.jsview("CreateEmployee", "js.CreateEmployee");
		this.listEmployee   = sap.ui.jsview("ListEmployee", "js.ListEmployee");
		this.getEmployee    = sap.ui.jsview("GetEmployee", "js.GetEmployee");
		
		// Add pages...
		this.app.addPage(this.home);
		this.app.addPage(this.createEmployee);
		this.app.addPage(this.listEmployee);
		this.app.addPage(this.getEmployee);
		
		// Set app...
		this.shell.setApp(this.app);
		
		//return this.app;
		return this.shell;
		
	},
	
	// Set the client endpoint library to the application for easy access...
	setClientEndpointLibrary: function(library) {
		this.library = library;
	},
	
	getClientEndpointLibrary: function() {
		return this.library;
	}
	
});