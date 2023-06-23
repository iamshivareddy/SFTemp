import { LightningElement,track , wire } from 'lwc';
import getContactList from '@salesforce/apex/contactListCtrl.getContactList'

export default class ContactlistCmp extends LightningElement {

    @track conlist;
    @track showContact = false;
    // @wire(getContactlist) conlist;
    @wire(getContactList)
    contactlist({data, error}){
    if(data) {
    this.conList = data;
    }
    else if(error){
    console.log('error #'+ error);
    }
   /* getcontactlists(){
        getContactList().then(result=>{
        this.conlist=result;
        })
        .catch(error=>{
        console.log('error#'+error);
        })  */


}

handlechange(event) {
    this.showContact= event.target.checked;
    }

}