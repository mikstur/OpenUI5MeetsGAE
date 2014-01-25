sap.ui.jsview("js.CreateEmployee", {
	
	getControllerName: function() {
		return "js.CreateEmployee";
	},
	
	createContent: function(oController) {
		
		this.page = new sap.m.Page({
			title: "Create Employee",
			showNavButton: true,
			navButtonPress: [oController.navBack, oController],
			headerContent: [new sap.m.Button({icon: "sap-icon://add", press: [oController.save, oController]})]
		});
		
		this.firstName   = new sap.m.Input({});
		this.lastName    = new sap.m.Input({});
		this.city        = new sap.m.Input({});
		this.country     = new sap.m.Input({});
		this.phoneNumber = new sap.m.Input({});
		this.cellNumber  = new sap.m.Input({});
		this.email       = new sap.m.Input({});
		
		var sfEmployee = new sap.ui.layout.form.SimpleForm({
			content:[
			    new sap.ui.core.Title({ text: "Personal Information" }),    
			    new sap.m.Label({ text: "Firstname"}),
			    this.firstName,
			    new sap.m.Label({ text: "Lastname"}),
			    this.lastName,
			    new sap.m.Label({ text: "City" }),
			    this.city,
			    new sap.m.Label({ text: "Country" }),
			    this.country,
			    new sap.ui.core.Title({ text: "Contact Information" }),    
			    new sap.m.Label({ text: "Phone Number" }),
			    this.phoneNumber,
			    new sap.m.Label({ text: "Cell Number" }),
			    this.cellNumber,
			    new sap.m.Label({ text: "Email Address" }),
			    this.email
			]
		});
		
		this.page.addContent( sfEmployee );
		
		return this.page;
		
	}
	
});