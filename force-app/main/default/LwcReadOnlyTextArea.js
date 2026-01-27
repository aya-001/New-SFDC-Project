import { LightningElement,api } from 'lwc';
export default class LwcReadOnlyTextArea extends LightningElement {

    @api fieldLabel;
    @api fieldValue;
    @api isRichText;
    @api fieldLevelHelp;

    connectedCallback() {
        console.log('pass fieldLabel', this.fieldLabel);
    }
    
    renderedCallback(){
        console.log('[wrapper] isRichText:', this.isRichText, 'type:', typeof this.isRichText);
    }

}
