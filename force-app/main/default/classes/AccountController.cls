public class AccountController {
    
	@AuraEnabled
	public static List<Account> getAccounts() {
        
	List<Account> accList = new List<Account> ();

	accList = [SELECT Id, Name FROM Account LIMIT 10];
	return accList;
}
}