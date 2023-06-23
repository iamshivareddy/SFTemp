/*public inherited sharing class LWCExampleController {

    @AuraEnabled
    public static list<Account> readCSVFile(Id idContentDocument){
        list<Account> lstAccsToInsert = new list<Account>();
        if(idContentDocument != null) {
            
            // getting File Data based on document id 
            ContentVersion objVersion = [SELECT Id, VersionData FROM ContentVersion WHERE ContentDocumentId =:idContentDocument];
            // split the file data
            list<String> lstCSVLines = objVersion.VersionData.toString().split('\n');

            for(Integer i = 1; i < lstCSVLines.size(); i++){
                Account objAcc = new Account();
                list<String> csvRowData = lstCSVLines[i].split(',');
                
              //  System.debug('csvRowData====> '+csvRowData);
             
                
             	objAcc.AId = 'ACC-' + i; // Assigning unique Id values
			 	objAcc.Name = csvRowData[0]; // accName
                objAcc.Industry = csvRowData[1];
                objAcc.Rating = csvRowData[2];
                objAcc.Type = csvRowData[3];
                objAcc.Website = csvRowData[4];
                lstAccsToInsert.add(objAcc);
            }

            try{    
                if(!lstAccsToInsert.isEmpty()) {
                    insert lstAccsToInsert;
                }
            }
            catch (Exception ex) {
                throw new AuraHandledException(ex.getMessage());
            } 
        }
        return lstAccsToInsert;    
    }
}




*/ 
public inherited sharing class LWCExampleController {

    @AuraEnabled
    public static list<Temp> readCSVFile(Id idContentDocument){
        list<Temp> lstAccsToInsert = new list<Temp>();
        if(idContentDocument != null) {
            // getting File Data based on document id 
            ContentVersion objVersion = [SELECT Id, VersionData FROM ContentVersion WHERE ContentDocumentId =:idContentDocument];
            // split the file data
            list<String> lstCSVLines = objVersion.VersionData.toString().split('\n');

            for(Integer i = 1; i < lstCSVLines.size(); i++){
              //  Account objAcc = new Account();
               
                Temp objAcc = new Temp();
                list<String> csvRowData = lstCSVLines[i].split(',');               
                
              	objAcc.Id = i + ''; // Assigning unique Id values
			 	objAcc.Name = csvRowData[0]; // accName
                objAcc.Industry = csvRowData[1];
                objAcc.Rating = csvRowData[2];
                objAcc.Typec = csvRowData[3];
                objAcc.Website = csvRowData[4];
                System.debug('row : ' + objAcc);
                lstAccsToInsert.add(objAcc);
            }
        }
        return lstAccsToInsert;    
    }
    
    
    public class Temp{
        @AuraEnabled
        public String Name {get; set;} 
        @AuraEnabled
        public String Industry  {get; set;}
        @AuraEnabled
        public String Typec  {get; set;}
        @AuraEnabled
        public String Rating  {get; set;}
        @AuraEnabled
        public  String Website  {get; set;}
        @AuraEnabled
        public  String Id  {get; set;}
    }
}