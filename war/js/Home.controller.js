sap.ui.controller("js.Home", {
	
	onInit: function() {
		
	},
	
	onBeforeRendering: function() {
		
	},
	
	onAfterRendering: function() {
		
	},
	
	onExit: function() {
		
	},
	
	navToCreateEmployee: function() {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id: "CreateEmployee",
			data: {
				context: {}
			}
		});
	},
	
	navToListEmployee: function() {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id: "ListEmployee",
			data: {
				context: {}
			}
		});
	},
	
});