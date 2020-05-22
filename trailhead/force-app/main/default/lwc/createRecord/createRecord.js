/*
@ lwc : The core module in Lightning Web Components is lwc. 
@ import : The import statement imports LightningElement from the lwc module.
@ LightningElement :  LightningElement is a custom wrapper of the standard HTML element.
@ Extend : Extend LightningElement to create a JavaScript class for a Lightning web component.
@ export : export default keywords export a MyComponent class for other components to use.
@ lightning/uiRecordApi : This module includes wire adapters to record data and get default values to 
                            create records. It also includes JavaScript APIs to create, delete, 
                            update, and refresh records.

@ createRecord(recordInput) : Creates a record
@ recordInput : recordInput—(Required) A RecordInput object used to create the record. 
                To create a RecordInput object, use generateRecordInputForCreate(record,objectInfo).
@ reduceErrors : reduceErrors is imported from the module ldsUtils.
*/
import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
//import { reduceErrors } from 'c/ldsUtils';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import SITE_FIELD from '@salesforce/schema/Account.Site';
import ACCOUNT_COMPANY from '@salesforce/schema/Account.Account_Company__c';


export default class LdsCreateRecord extends LightningElement {
    @track accountId;
    name = '';
    site = '';
    Account_Company__c = '';

   onNameChange(event) {
        this.accountId = undefined;
        this.name = event.target.value;
    }

    handleSiteChange(event){
        this.site=event.target.value;
    }

    handleAccCompChange(event){
        this.Account_Company__c=event.target.value;
    }

    createAccount() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        fields[SITE_FIELD.fieldApiName] =this.site;
        fields[ACCOUNT_COMPANY.fieldApiName] =this.Account_Company__c;
        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName,
            fields };
        createRecord(recordInput)
            .then(account => {
                this.accountId = account.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
}