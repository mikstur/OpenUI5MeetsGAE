sap.ui.jsview("js.Home", {
	
	getControllerName: function() {
		return "js.Home";
	},
	
	createContent: function(oController) {
		
		this.page = new sap.m.Page({
			title: "Home"
		});
		
		this.stCreateEmployee = new sap.m.StandardTile({
			title: "Create Employee",
			info: "Add a new employee to the datastore.",
			icon: "sap-icon://visits",
			press: [oController.navToCreateEmployee, oController]
		});
		
		this.stListEmployee = new sap.m.StandardTile({
			title: "List Employees",
			info: "View all of the Employees.",
			icon: "sap-icon://visits",
			press: [oController.navToListEmployee, oController]
		});
		
		this.page.addContent( this.stCreateEmployee );
		this.page.addContent( this.stListEmployee );
		
		return this.page;
		
	}
	
});