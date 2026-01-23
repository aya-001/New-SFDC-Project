import { LightningElement,api} from 'lwc';
export default class LwcLongTextArea extends LightningElement {

    @api height;
    @api defaultText;
    @api fieldLabel;
    @api isRequired;
    @api maxChars;

    connectedCallback(){
        console.log('height is:', this.height);
        console.log('defaultText is:', this.defaultText);
    }

    @api
    validate(){
        return this.template.querySelector('c-lwc-longtext-hight-text').validate();
    }
}
