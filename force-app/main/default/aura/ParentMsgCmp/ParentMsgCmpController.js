({
	
        handleShow : function (component, event, helper) {
    	component.find("messages").show( "Confirmation Message");
    },
    
        handleError: function (component, event, helper) {
        component.find("messages").error( "Error Message");
     },
        
        handleRemove: function (component, event, helper) {
        component.find("messages").remove( ) ;
            
      }
})