import { LightningElement, wire, track, api } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class ContactsList extends LightningElement {
    @track showContacts = false;
    @track contacts;
    @api selectedContact;
    @api showSelectedContact = false;
    @track showSelectedContact;
    
    get buttonLabel() {
        return this.showContacts ? 'Hide Contacts' : 'Show Contacts';
      }
  
   

    handleShowContacts() {

        if (this.showContacts) {
            this.showContacts = false;
        } else {
        getContacts()
            .then(result => {
                this.contacts = result;
                this.showContacts = true;
            })
            .catch(error => {
                console.error('Error retrieving contacts', error);
            });
    }
}
    handleContactClick(event) {
      const contactId = event.currentTarget.dataset.contactId;
      const contactSelectEvent = new CustomEvent('contactselect', {
          detail: contactId
      });
      this.dispatchEvent(contactSelectEvent);
  }
  
}