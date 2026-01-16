import { LightningElement,wire, api, track } from 'lwc';
import { createElement } from "lwc";
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';
export default class LwcChildReadOnlyComponent extends LightningElement {

    @api fieldLabel;
    @api fieldValue; 
        /*  _fieldValue; */
   /*  @api fieldType; */
    @api fieldLevelHelp;

    /* isURL= false;
    isLookup = false; */

    lineHeight = 13; 
    letterHeight = 12;
    padding = 5;
    lineNum;

    //every time component is rendered
    renderedCallback() {

        //method to be called to calucualte texts number
        this.calculateTextArea();
       /*  setTimeout(()=> {
            this.calculateTextArea();
        }); */

    }

/* 
    @api
    get fieldValue(){
        console.log('get fieldValue');
        return this._fieldValue;
    }


    set fieldValue(value){
        console.log('set fieldValue(value)');
        this._fieldValue = value;
        //Trigger caluculation method for text area height
        this.calculateTextArea();
    }
 */

    //change height acoordingly //${this.lineHeight * this.lineNum + this.padding}
    get textareaStyle(){
        console.log('this.lineHeight * this.lineNum + this.padding', this.lineHeight * this.lineNum + this.padding);
        return `--sds-c-textarea-sizing-min-height: ${this.lineHeight * this.lineNum + this.padding}px !important`;
    }
    

    //calculate the height of text area based on the number of letters
    calculateTextArea(){
        //get value of lightning-textarea
        const textarea = this.template.querySelector('lightning-textarea');
        console.log('textarea :',textarea);

        if(textarea){ 
            console.log('calculateTextArea()');
 
            //Create temporary element in order to measure height based on number of letters
            const temporaryDiv = document.createElement('div');
            console.log('temporaryDiv');

            temporaryDiv.style.position = 'absolute';
            temporaryDiv.style.visibility = 'hidden';
            temporaryDiv.style.width = textarea.offsetWidth + 'px';

            //reflect breaking-line by Enter//Space//Wrap & Starting a new line in the end of line
            temporaryDiv.style.whiteSpace = 'pre-wrap';
            console.log('pre-wrap:');

            //innerHTML//returns text/letters including html tags // include <br> 
            temporaryDiv.innerHTML = textarea.value;
            console.log('temporaryDiv.innerHTML:', temporaryDiv.innerHTML);

            //count the number of <br> line break
            /* const brTags = temporaryDiv.querySelector('br').length; */

            //add values to child element of this parent element
            document.body.appendChild(temporaryDiv);

            //calculate the number of lines //letter font size 12
            this.lineNum = Math.ceil(temporaryDiv.offsetHeight / this.letterHeight);
            console.log('temporaryDiv.offsetHeight:', temporaryDiv.offsetHeight);
            console.log('this.lineNum:', this.lineNum);


            //remove temporary Div element from parent element
            document.body.removeChild(temporaryDiv);

            //notofy FLow runtime that there is some change
            const changeEvent = new FlowAttributeChangeEvent('fieldValue', this.fieldValue);
            //fire this event
            this.dispatchEvent(changeEvent);


        }
    }

}
