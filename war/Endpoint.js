jQuery.sap.declare("Endpoint");
jQuery.sap.require("sap.ui.base.ManagedObject");

sap.ui.base.ManagedObject.extend("Endpoint", {
	
	metadata: {  
		properties: {  
            "root": {type: "string", defaultValue: "http://127.0.0.1:8888/_ah/api"},
            "gapiObject": "object", 
            "library": "object",
        }  
    },  
    
    init: function() {  
    	// Gets called right after instantiation
    },  
    
    successDialog: new sap.m.Dialog({
		title: "Endpoint Client Libraries Successfully Loaded.",
		leftButton:  new sap.m.Button({ 
			text: "Close", 
			state: sap.ui.core.ValueState.Success,
			press: function(oControlEvent) {
				if( oControlEvent.getSource().getParent().isOpen() ) {
					oControlEvent.getSource().getParent().close();
				}
			} 
		}),
	}),
    
    createLibrary: function() {
    	var gapis = this.getGapiObject();
    	
    	var successDialog = this.successDialog;
    	var simpleForm    = new sap.ui.layout.form.SimpleForm({
    		content: [ new sap.ui.core.Title({ text: "Success!" }) ]
    	});
    	successDialog.addContent(simpleForm);
    	
		var response = function(endpointName) {
    		console.log(endpointName + " has been loaded.");
    		simpleForm.addContent( new sap.m.Label({ text: "Successfully Loaded" }) );
    		simpleForm.addContent( new sap.m.Text({ text: endpointName }) );
    		
    		if( !successDialog.isOpen() ) {
    			successDialog.open();
    		}
    	};
    	
    	for( k = 0; k < gapis.length; k++ ) {   
    		// Load the client libraries through googles api object (Connects to the endpoint classes)
    		gapi.client.load(gapis[k].name, gapis[k].version, response(gapis[k].name), this.getRoot());
    		
    		// Set the google api client to the library object for easy access
    		this.setLibrary(gapi.client);
    	}
    	
    	return this.getLibrary();
    },
    
    getEndpoint: function(name) {
    	return this.getLibrary()[name];
    }
	
});