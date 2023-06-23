public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [SELECT Name, MailingPostalCode, MailingCountry , Phone , Department FROM Contact];
    }
  
    @AuraEnabled(cacheable=true)
    public static Contact getContactDetails(Id contactId) {
        return [SELECT Id, Name, Phone, Department FROM Contact WHERE Id = :contactId];
    }
}