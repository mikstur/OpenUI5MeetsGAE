sap.ui.controller("js.CreateEmployee", {
	
	onInit: function() {
	
	},
	
	onBeforeRendering: function() {
		// Assign the employee endpoint to this controller to use
		this.employeeEndpoint = this.getView().getParent().getParent().getParent().library.employeeendpoint;
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
			text: "Home",
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
	
	save: function() {
		var resultDialog = this.resultDialog;
		
		// Inputs
		var firstName   = this.getView().firstName;
		var lastName    = this.getView().lastName;
		var city        = this.getView().city;
		var country     = this.getView().country;
		var phoneNumber = this.getView().phoneNumber;
		var cellNumber  = this.getView().cellNumber;
		var email       = this.getView().email;
		
		var clearInputs = function() {
			firstName.setValue("");
			lastName.setValue("");
			city.setValue("");
			country.setValue("");
			phoneNumber.setValue("");
			cellNumber.setValue("");
			email.setValue("");
		}
		
		var employee = {
			firstName: firstName.getValue(),
			lastName: lastName.getValue(),
			city: city.getValue(),
			country: country.getValue(),
			phoneNumber: phoneNumber.getValue(),
			cellNumber: cellNumber.getValue(),
			email: email.getValue()
		};
		
		this.employeeEndpoint.insertEmployee(employee).execute(function(response) {
			var resultMessage = new sap.m.Text({});
			
			if( !response.code ) { // No Error
				if( !resultDialog.isOpen() ) {
					resultDialog.setTitle("Success");
					resultDialog.setState(sap.ui.core.ValueState.Success);
					resultMessage.setText("Successfully saved the employee to the datastore.");
					resultDialog.addContent(resultMessage);
					resultDialog.open();
					
					clearInputs();
				}
			} else  { // Error
				if( !resultDialog.isOpen() ) {
					resultDialog.setTitle("Error");
					resultDialog.setState(sap.ui.core.ValueState.Error);
					resultMessage.setText(response.message);
					resultDialog.addContent(resultMessage);
					resultDialog.open();
					
					clearInputs();
				}
			}
		});
	}
	
});