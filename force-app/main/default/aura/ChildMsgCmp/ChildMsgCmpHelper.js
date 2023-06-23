({
	showMessageHelper : function (component, event, severity) {
		var messages = event.getParam("arguments");
		var displayMessage ='';

        if(messages){
				displayMessage = messages.message;
				var messagePanel = component.find("messages");
		
            $A.createComponents([
						[
					"ui:message",{"title" : severity.toUpperCase(),
									'severity': severity,
									'closable' : 'true'
                                  }
                        ],
                	[
                        "ui:outputText",{'value' : displayMessage}
              	    ]
                ],
                                
                 function (components, status, statusMessagesList){
				if(status === "SUCCESS")
				var uimessage = components [0];
				var uioutput = components[1];
                 uimessage.set("v.body", uioutput);
                 messagePanel.set("v.body", uimessages);
                 }
                     
           );
      }
    },
          
      removeMessageHelper : function(component) {
                var messagePanel = component.find("messages");
                messagePanel.set ("v.body", []);
				}
        
})