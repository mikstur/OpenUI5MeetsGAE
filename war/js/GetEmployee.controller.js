sap.ui.controller("js.GetEmployee", {
	
	onInit: function() {
		
	},
	
	onBeforeRendering: function() {
		// Assign the employee endpoint to this controller to use
		this.employeeEndpoint = this.getView().getParent().getParent().getParent().library.employeeendpoint;
	},
	
	onBeforeShow: function(event) {
		if(event.data) {
			var listEmployeeModel = sap.ui.getCore().byId("listEmployee").getModel();
			
			var context = "" + event.data;
			
			this.getView().setModel(listEmployeeModel);
			this.getView().bindContext(context);
			
			console.log(event);
		}
	},
	
	onAfterRendering: function() {
		
	},
	
	onExit: function() {
		
	},
	
	navBack: function() {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
	},
	
	resultDialog: new sap.m.Dialog({
		content: [],
		leftButton: new sap.m.Button({
			text: "Back",
			press: function(oEvent) {
				if( oEvent.getSource().getParent().isOpen() ) {
					var bus = sap.ui.getCore().getEventBus();
					bus.publish("nav", "back");
					oEvent.getSource().getParent().close();
					
					// Clear result Message
					oEvent.getSource().getParent().destroyContent();
				}
			}
		}),
		rightButton: new sap.m.Button({ 
			text: "Close", 
			press: function(oEvent) {
				if( oEvent.getSource().getParent().isOpen() ) {
					oEvent.getSource().getParent().close();
					
					// Clear result Message
					oEvent.getSource().getParent().destroyContent();
				}
			}
		})
	}),
	
	deleteEmployee: function() {
		var employee = {
			email: this.getView().email.getText()	
		};
		
		this.employeeEndpoint.removeEmployee(employee).execute(function(response) {
			// Response...
		});
	}
	
});