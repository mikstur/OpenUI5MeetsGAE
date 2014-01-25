sap.ui.controller("js.ListEmployee", {
	
	onInit: function() {
		
	},
	
	onBeforeRendering: function() {
		// Assign the employee endpoint to this controller to use
		this.employeeEndpoint = this.getView().getParent().getParent().getParent().library.employeeendpoint;
		this.listEmployees();
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
	
	listEmployees: function() {
		var controller = this;
		var listEmployee = this.getView().listEmployee;
		
		this.employeeEndpoint.listEmployee().execute(function(response) {
			var jsonModel = new sap.ui.model.json.JSONModel(response);
			listEmployee.setModel(jsonModel);
			
			var template = new sap.m.ObjectListItem({
				title: "{key/name}",
				type: sap.m.ListType.Navigation,
				press: [controller.toGetEmployee, controller]
			});
		
			listEmployee.bindItems("/result/items", template);
		});
	},
	
	filterEmployeeList: function(event) {
		var listEmployee = this.getView().listEmployee;
		var binding      = listEmployee.getBinding("items");
		
		// Multiple Filters
		var emailFilter = new sap.ui.model.Filter("key/name", sap.ui.model.FilterOperator.Contains, event.getSource().getValue());
		binding.filter([emailFilter]);
	},
	
	toGetEmployee: function(event) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id: "GetEmployee",
			data: {
				context: event.getSource().getBindingContext()
			}
		});
	}
	
});