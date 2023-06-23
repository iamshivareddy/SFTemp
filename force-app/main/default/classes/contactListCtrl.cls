public class contactListCtrl {

    @AuraEnabled (cacheable=true)
	public static List<Contact> getContactList() {
	
        List<Contact> conList = [select id, lastname from contact limit 10];
		
        return conList;

    }}