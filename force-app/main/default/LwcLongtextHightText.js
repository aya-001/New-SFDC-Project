import { LightningElement,api } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';
export default class LwcLongtextHightText extends LightningElement {
    @api defaultText;
    @api fieldLabel;
    @api height;
    @api isRequired;
    @api textToSave;
    @api maxChars;

    currentCount = 0;

    connectedCallback() {
        //calculate the number of initial text when dom is rendered
        this.currentCount = this.countChars(this.defaultText || '');
    }

    //When the value property is accessed
    //communicate from parent component and flow
    @api
    get value(){
        return this.defaultText;
    }

    //When a new value is assigned to the value 
    set value(value){
        this.defaultText = value;
    }

    //change height acoordingly
    get textareaStyle(){
        return `--sds-c-textarea-sizing-min-height: ${this.height}px`;
    }

    get tooLongMessage(){
        return `${this.fieldLabel || 'この項目'} は ${this.maxChars}文字以内で入力してください`;
    }

    //get text value when text is edited
    onBlurHandler(event){

        console.log('DefaultText is:', this.defaultText);

        this.defaultText = event.target.value;
        this.textToSave = event.target.value;

        // Count characters (Japanese-safe enough)
        const value = event.target.value || '';
        this.currentCount = this.countChars(value);
        const length = value.length;

        // UI validation
        if (this.maxChars && length > this.maxChars) {
            //custm validation
            event.target.setCustomValidity(this.tooLongMessage);
        } else {
            event.target.setCustomValidity('');
        }   

        //display all the current applicable customValidity message on LWC
        event.target.reportValidity();

        console.log('DefaultText 2 after Edited is:', this.defaultText);
        console.log('fieldLabel after Edited is:', this.fieldLabel);
        console.log('height after Edited is:', this.height);
        /* console.log('textToSave after Edited is:', this.textToSave); */

        //assign text value to flow variable
        const changeEvent = new FlowAttributeChangeEvent('defaultText', this.defaultText);
        this.dispatchEvent(changeEvent);

    }

    //make this lwc work with isRequired checkbox for flow screen
    @api
    validate(){
        if(this.isRequired && (!this.defaultText || this.defaultText.trim() === '')){
            return {
                isValid: false,
                errorMessage: `${this.fieldLabel || 'この項目'} は必須です `
            };
        }

        if(this.maxChars && this.defaultText.length > this.maxChars){
            return{
                isValid: false,
                errorMessage: `${this.fieldLabel || "この項目"} は ${this.maxChars}文字以内で入力してください`
            }
        }

        return { isValid: true};
    }

    countChars(text){
        if(!text) return 0;
        
        //Intl.Segmenter, graphem which user recognize as 1 character visually
        if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const seg = new Intl.Segmenter('ja', { granularity: 'grapheme' });
      let n = 0;
      for (const _ of seg.segment(text)) n++;
      return n;
    }
    return text.length;

    }

   

}
