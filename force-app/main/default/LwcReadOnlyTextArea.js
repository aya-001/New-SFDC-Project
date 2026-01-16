import { LightningElement,api } from 'lwc';
export default class LwcReadOnlyTextArea extends LightningElement {

    @api fieldLabel;
    @api fieldValue;
    /* @api fieldType; */
    @api fieldLevelHelp;

    connectedCallback() {
        console.log('pass fieldLabel', this.fieldLabel);
    }
    

}
