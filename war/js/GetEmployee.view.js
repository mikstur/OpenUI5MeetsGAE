sap.ui.jsview("js.GetEmployee", {
	
	onBeforeShow: function(event) {
		this.getController().onBeforeShow(event);
	},
	
	getControllerName: function() {
		return "js.GetEmployee";
	},
	
	createContent: function(oController) {
		
		this.page = new sap.m.Page({
			id: "pageGetEmployee",
			title: "Employee Details",
			showNavButton: true,
			navButtonPress: [oController.navBack, oController],
			headerContent: [new sap.m.Button({icon: "sap-icon://delete", press:[oController.deleteEmployee, oController]})]
		});
		
		// Assign email to this page to get hold of the Key for deleting entity
		this.email = new sap.m.Text({text: "{email}"});
		
		var sfRecruit = new sap.ui.layout.form.SimpleForm({
			content:[
			    new sap.ui.core.Title({ text: "Personal Information" }),    
			    new sap.m.Label({ text: "Firstname" }),
			    new sap.m.Text({  text: "{firstName}" }),
			    new sap.m.Label({ text: "Lastname" }),
			    new sap.m.Text({  text: "{lastName}" }),
			    new sap.m.Label({ text: "City" }),
			    new sap.m.Text({  text: "{city}" }),
			    new sap.m.Label({ text: "Country" }),
			    new sap.m.Text({  text: "{country}" }),
			    new sap.ui.core.Title({ text: "Contact Information" }),    
			    new sap.m.Label({ text: "Phone Number" }),
			    new sap.m.Text({  text: "{phoneNumber}" }),
			    new sap.m.Label({ text: "Cell Number" }),
			    new sap.m.Text({  text: "{cellNumber}" }),
			    new sap.m.Label({ text: "Email Address" }),
			    this.email
			]
		});
		
		this.page.addContent( new sap.m.List({}).addItem(new sap.m.ObjectListItem({title: "{key/name}", intro: "comments"})) );
		this.page.addContent( sfRecruit );
		
		return this.page;
		
	}
	
});