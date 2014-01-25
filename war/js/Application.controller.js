sap.ui.controller("js.Application", {
	
	onInit: function() {
		
		this.app = this.getView().app;
		
		// Navigation
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("nav", "to", this.navToHandler, this);
		bus.subscribe("nav", "back", this.navBackHandler, this);
		
	},
	
	onBeforeRendering: function() {
		
	},
	
	onAfterRendering: function() {
		
	},
	
	onExit: function() {
		
	},
	
	navToHandler: function(channelId, eventId, data) {
		if( data && data.id ) {
			
			if( this.app.getPage(data.id) == null ) {
				jQuery.sap.log.info("Loading page '" + data.id + "'");
				this.app.addPage(sap.ui.jsview(data.id, "js." + data.id));
			}
			
			// Navigate to given page
			this.app.to(data.id, data.data.context);
			
		}
	},
	
	navBackHandler: function() {
		this.app.back();
	}
	
});