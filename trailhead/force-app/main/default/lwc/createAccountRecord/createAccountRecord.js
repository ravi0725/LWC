/*
@ lwc : The core module in Lightning Web Components is lwc. 
@ import : The import statement imports LightningElement from the lwc module.
@ LightningElement :  LightningElement is a custom wrapper of the standard HTML element.
@ Extend : Extend LightningElement to create a JavaScript class for a Lightning web component.
@ export : export default keywords export a MyComponent class for other components to use.
*/
import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import accountObject from '@salesforce/schema/Account';
import nameField from '@salesforce/schema/Account.Name';
import websiteField from '@salesforce/schema/Account.Website';
import industryField from '@salesforce/schema/Account.Industry';
import ACCOUNT_COMPANY from '@salesforce/schema/Account.Account_Company__c';

export default class CreateAccountRecord extends LightningElement {
     // Code for  create the Account Record
     accountObject = accountObject;
     myFields = [nameField, websiteField, industryField,ACCOUNT_COMPANY];
 
     handleSubmit(){
          
     }
     handleSuccess() {
          const evt = new ShowToastEvent({
               title: "Success!",
               message: "The Accont's record has been successfully saved.",
               variant: "success",
           });
           this.dispatchEvent(evt);
     }
}