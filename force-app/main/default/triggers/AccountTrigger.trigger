trigger AccountTrigger on Account (before insert ,before update , after insert) {
    
    if(Trigger.isInsert){
        if(Trigger.isBefore){
            
    AccountTriggerHandler.beforeInsert(Trigger.New);
        }else if(Trigger.isAfter){
            ///
            
        }else if(Trigger.isUpdate) {
            
            ///
        }
    }
}