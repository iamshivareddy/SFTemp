import { api, LightningElement } from 'lwc';

export default class Child extends LightningElement {

    myName = 'Shiva';
    company = 'Capgemini';
    designation = 'Senior';
    salary = '300000';

    @api
    get tempname(){
        return this.myName;
    }
    set tempname(val){
        // this.tempMethod();

        this.myName = val;
    }

    @api
    tempMethod(val){
        alert('in alert ' + val);
    }

    testchildmethod(){
        this.dispatchEvent(new CustomEvent('call', {value : 'Satish'}));
    }

}