/* --------------------
| Form modules ↓ 
--------------------*/
import {checkEmail, checkNumber} from "./Modules/Regex.js";

//todo: Send form ↓ 
let sendForm = (formSelector, processingOptions) => {
    let form = document.querySelector(`.${formSelector}`),
        popup = document.querySelector('.formalize__popup');

    //| Work with object ↓
    formSections.receivedForm = form; 
    formSections.formProcessing(processingOptions);

    //| Listeners ↓ 
    form.addEventListener('submit', formSend);

    //| Server request
    async function formSend(e) {
        e.preventDefault();
    
        // Work with object when form was submitted
        formSections.submitStatus = true; 
        formSections.formProcessing(processingOptions);
        
        let selects = form.querySelectorAll('.select');
        for(let i = 0; i < selects.length; i++) {
            let selectSelector = selects[i].getAttribute('id');
            formSections.selectProcessing(`#${selectSelector}`, true);
        }
            // clearPreview() <←- not created;

        // Form send 
        let errors = formSections.errors;
        if(errors === 0) {
            let formData = new FormData(form);
            console.log(...formData.entries());

            form.classList.add('_sending');
            let response = await fetch('sending.php', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            try{
                form.reset();
                form.classList.remove('_sending');
                popup.classList.add('_sended');
            }
            catch {
                form.classList.add('_error-popup');
            }            
            form.classList.remove('_sending');
        }
        else {
            form.classList.add('_invalid');
        }

        formSections.resetErrors();
    }
}

//todo: Form processing ↓ 
let formSections = {
    errors: 0,
    receivedForm: null,
    submitStatus: null,

    //| Methods regulatop ↓
    formProcessing(optionsOfProcessing) {
        // Form vars ↓
        let currentForm = this.receivedForm,
            requiredFileds,
            selects;

        // Options vars ↓
        let options = optionsOfProcessing,
            fieldsCheck = options.fieldsCheck,
            processingSelect = options.processingSelect;

        // Methods calls ↓
        if(fieldsCheck) {
            requiredFileds = currentForm.querySelectorAll('._req');
            this.submitStatus ? this.checkFields(requiredFileds) : null;
        }
        if(processingSelect) {
            selects = currentForm.querySelectorAll('.select');
            for(let i = 0; i < selects.length; i++) {
                let selectSelector = selects[i].getAttribute('id');
                this.selectProcessing(`#${selectSelector}`, null);
                this.clickOutside(`#${selectSelector}`);
            }
        }
    },

    //| Fieds processing ↓
    checkFields(requiredFileds) {
        let fields = requiredFileds;
        this.resetErrors();
        for (let i = 0; i < fields.length; i++) {    
            let input = fields[i];
            this.errorHalpers('remove', input);

            // Empty fields ↓
            if(input.value == '') {
                this.errors++;
                this.errorHalpers('add', input);
            }
            
            // Validation email ↓
            else if(input.classList.contains('email')) { 
                if(!checkEmail(input.value)) {
                    this.errors++;
                    this.errorHalpers('add', input);
                } 
            }

            // Validation tel number ↓
            else if(input.classList.contains('number')) {
                if(!checkNumber(input.value)) {
                    this.errors++;
                    this.errorHalpers('add', input);
                }
                else {
                    let numbersOnly = input.value.replace(/\D/g, '');
                    input.value = `+${numbersOnly}`;
                }
            }
        }            
        return this.errors;
    },

    //| Select processing ↓
    selectProcessing(currentSelect, reset) {
        let select = document.querySelector(currentSelect),
            selectInput = select.querySelector('.select__input'),
            selectList = select.querySelector('.select__item'),
            selectLabel = select.querySelector('.select__label'),
            selectTitle = select.querySelector('.select__title'),
            selectContent = select.querySelector('.select__options'),
            selectOption = select.querySelectorAll('.select__option');

        // Default item 
        selectInput.value == '' ? selectInput.value = selectTitle.innerHTML : selectInput.value;

        // Get option value
        selectOption.forEach((option) => {
            option.hasAttribute('data-checked') ? option.classList.add('_selected') : null;   

            option.addEventListener('click', () => {
                selectTitle.innerHTML = option.innerHTML;
                selectInput.value = option.innerHTML;

                selectOption.forEach((item) => {
                    item.classList.remove('_selected');
                });
                option.classList.add('_selected');
                
                selectContent.style.cssText = `
                    max-height: ${null};
                    `;
                selectLabel.classList.remove('_active');
                selectContent.classList.remove('_active');
            });
        });

        // Open select list
        selectLabel.addEventListener('click', () => {
            if (selectContent.style.maxHeight) {
                selectContent.style.cssText = `
                    max-height: ${null};
                `;
                selectList.classList.add('_closed');
                selectLabel.classList.remove('_active');
                selectContent.classList.remove('_active');
            }
            else {
                selectContent.style.cssText = `
                    max-height: ${selectContent.scrollHeight + 40}px;
                `;
                selectList.classList.remove('_closed');
                selectLabel.classList.add('_active');
                selectContent.classList.add('_active');
            }
        });

        // Reset sellect
        if(reset) {
            selectOption.forEach((item) => {
                item.classList.remove('_selected');
                
                if(item.hasAttribute('data-checked')) {
                    item.classList.add('_selected');
                    selectTitle.innerHTML = item.innerHTML;
                }  
            });            
        }
    },

    //| Click outside ↓
    clickOutside(currentSelect) {
        let select = document.querySelector(currentSelect),
            selectList = select.querySelector('.select__item'),
            selectLabel = select.querySelector('.select__label'),
            selectContent = select.querySelector('.select__options');
  
        document.addEventListener('click', (e)=> {
            // Select
            if(!selectList.contains(e.target) && !selectList.classList.contains('_closed')) {
                selectContent.style.cssText = `
                    max-height: ${null};
                `;
                selectList.classList.add('_closed');
                selectLabel.classList.remove('_active');
                selectContent.classList.remove('_active');
            }
        });
    },    

     //| Error halpers ↓
    errorHalpers(action, input) {
        action === 'add' ? input.classList.add('_invalid') :
        action === 'remove' ? input.classList.remove('_invalid') : 
        null;
    },

    //| Reset errors ↓
    resetErrors() {
        this.errors = 0;
    }
}

//todo: Export Form modules ↓ 
export {sendForm};

