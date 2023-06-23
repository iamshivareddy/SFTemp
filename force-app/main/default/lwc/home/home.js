import { LightningElement, track } from 'lwc';
import getContactDetails from '@salesforce/apex/ContactController.getContactDetails';


export default class Home extends LightningElement {
    @track selectedContact;
    @track showSelectedContact;


    handleContactSelect(event) {
        const contactId = event.detail;
        getContactDetails({ contactId: contactId })
        .then(result => {
            this.selectedContact = result;
            this.showSelectedContact = true;
        })
        .catch(error => {
            console.error('Error retrieving contact details', error);
        });
}
       
}