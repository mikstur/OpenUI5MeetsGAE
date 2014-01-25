sap.ui.jsview("js.ListEmployee", {
	
	getControllerName: function() {
		return "js.ListEmployee";
	},
	
	createContent: function(oController) {
		
		this.page = new sap.m.Page({
			title: "List Employees",
			showNavButton: true,
			navButtonPress: [oController.navBack, oController]
		});
		
		this.listEmployee = new sap.m.List( "listEmployee", {});
		
		this.page.addContent( new sap.m.SearchField({liveChange: [oController.filterEmployeeList, oController], placeHolder: "Search..."}) );
		this.page.addContent( this.listEmployee );
		
		return this.page;
		
	}
	
});