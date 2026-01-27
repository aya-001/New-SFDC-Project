import { LightningElement,api } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';
export default class LwcChildReadOnlyComponent extends LightningElement {

    @api fieldLabel;
    _fieldValue; 
    @api fieldLevelHelp;
    @api displayValue = '';
    @api isRichText;

    renderedCallback() {
        // eslint-disable-next-line no-console
        console.log('[child] isRichText:', this.isRichText, 'type:', typeof this.isRichText);
    }

    @api
    get fieldValue() {
        return this._fieldValue;
    }
    set fieldValue(v) {
        this._fieldValue = v || '';
        this.syncFlowOutputs();
    }

    get valueToDisplay(){
        return this._fieldValue;
    }

    get renderRichText(){
        console.log('this.isRichText:',this.isRichText);
        if (this.isRichText === true) return true;
        if (this.isRichText === false) return false;
        return this.autoIsRichText;
    }
    
    get autoIsRichText(){
        const v = this._fieldValue;
        if(!v) return false;
        //if it contains HTML tags, retunr true
        return /<(\/)?(p|br|div|span|strong|em|b|i|u|ul|ol|li|a|img|table|tr|td|th|h[1-6])(\s|>|\/)/i.test(v);
    } 


    syncFlowOutputs(){
        const next =this._fieldValue;
        if(this.displayValue !== next){
            this.displayValue = next;
            this.dispatchEvent(new FlowAttributeChangeEvent('displayValue', this.displayValue));
        }
    }
    

}
