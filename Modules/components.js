/* --------------------
| Different components ↓ 
--------------------*/

//todo: Select list ↓ 
export function separateSelect(selectSelector) {
    //| Vars ↓
    let select = document.querySelector(selectSelector),
        selectLabel = select.querySelector('.js-label'),
        selectTitle = select.querySelector('.js-title'),
        selectOptions = select.querySelector('.js-options'),
        selectOption = select.querySelectorAll('.js-option');

    //| Click outside ↓
    document.addEventListener('click', (e)=> {
        if(!select.contains(e.target) && select.classList.contains('_opened')) {
            selectOptions.style.cssText = `
                max-height: ${null};
            `;
            selectLabel.classList.remove('_active');
            selectOptions.classList.remove('_active');
            select.classList.remove('_opened');
        }
    });

    //| Get option value ↓
    selectOption.forEach((option) => {
        option.hasAttribute('data-checked') ? option.classList.add('_selected') : null;   

        option.addEventListener('click', () => {
            selectTitle.innerHTML = option.innerHTML;

            selectOption.forEach((item) => {
                item.classList.remove('_selected');
            });
            option.classList.add('_selected');
            
            selectOptions.style.cssText = `
                max-height: ${null};
            `;
            selectLabel.classList.remove('_active');
            selectOptions.classList.remove('_active');
            select.classList.remove('_opened');
        });
    });

    //| Open select list ↓
    if(!select.classList.contains('created-selects')) {
        selectLabel.addEventListener('click', () => {
            if (selectOptions.style.maxHeight) {
                selectOptions.style.cssText = `
                    max-height: ${null};
                `;
                select.classList.remove('_opened');
                selectLabel.classList.remove('_active');
                selectOptions.classList.remove('_active');
            }
            else {
                selectOptions.style.cssText = `
                    max-height: ${selectOptions.scrollHeight}px;        
                `;
                select.classList.add('_opened');
                selectLabel.classList.add('_active');
                selectOptions.classList.add('_active');
            }
        });
        select.classList.add('created-selects'); 
    }    
}

//todo: Counters ↓
// Counters -→> Standart counter ↓  
export function standartCounter(counterSelector, length, setItemLength) {
    let counter = document.querySelector(counterSelector),
        counterNumber = counter.querySelector('.js-number span'),
        currentNumber = +counterNumber.innerHTML,  
        btnMinus = counter.querySelector('.js-minus'),
        btnPlus = counter.querySelector('.js-plus'),
        itemLength = length;
  
    //| Btn listeners ↓
    btnMinus.addEventListener('click', decreaseValue);
    btnPlus.addEventListener('click', increaseValue);

    //| Start actions ↓
    addLimitClasses();
    setItemLength(currentNumber);

    //| Change value functions ↓
    function decreaseValue() {
        if(addLimitClasses()) return;
        else if (currentNumber > 1) {
            counterNumber.innerHTML = --currentNumber;
            setItemLength(currentNumber);
            removeLimitClasses();
            addLimitClasses();
        }
    }
    function increaseValue() {
        if(addLimitClasses()) return;
        else if (currentNumber < itemLength) {
            counterNumber.innerHTML = ++currentNumber;
            setItemLength(currentNumber);
            removeLimitClasses();
            addLimitClasses();
        }
    }

    //| Halpers ↓
    function addLimitClasses() {
        currentNumber === 1 ? btnMinus.classList.add('_limit') : null;
        currentNumber === itemLength ? btnPlus.classList.add('_limit') : null;
    }

    function removeLimitClasses() {
        btnMinus.classList.contains('_limit') ? btnMinus.classList.remove('_limit') : null;
        btnPlus.classList.contains('_limit') ? btnPlus.classList.remove('_limit') : null;
    }
}
// Counters -→> Slider counter ↓  
export function sliderCounter(counterSelector, length, speed, setItemLength) {
    let counter = document.querySelector(counterSelector),
        sliderWrapper = counter.querySelector('.js-number'),
        itemLength = length,
        numberItem = 1,
        counterDataNumber = +counter.dataset.counterNumber;

    //| Slides generation ↓
    if(!sliderWrapper.classList.contains('_slider-created')) {
        for(let i = 0; i < itemLength; i++) {
            let sliderItem = document.createElement('span');
            
            sliderItem.innerHTML = numberItem;
            sliderWrapper.insertAdjacentElement("afterbegin", sliderItem);
            numberItem++;
        }
        sliderWrapper.classList.add('_slider-created');
    }

    //| Slider ↓
    let sliderItems = document.querySelectorAll('.js-number span'),
        btnMinus = counter.querySelector('.js-minus'),
        btnPlus = counter.querySelector('.js-plus'),
        itemHeight = sliderItems[0].offsetHeight;

    //| Btn listeners ↓
    btnMinus.addEventListener('click', decreaseValue);
    btnPlus.addEventListener('click', increaseValue);

    //| Start actions ↓
    addLimitClasses();
    setItemLength(counterDataNumber + 1);
    counter.setAttribute('data-counter-number', counterDataNumber);
    updateSliderPosition();

    sliderWrapper.style.transition = `all ${speed} ease 0s;`

    //| Scroll slider ↓
    function updateSliderPosition() {
        sliderWrapper.style.cssText = 
        `
            transition: all ${speed} ease 0s;
            transform: translateY(${counterDataNumber * itemHeight}px);
        `;
    }  

    //| Decrease value ↓
    function decreaseValue() {
        if (counterDataNumber > 0) {
            counterDataNumber--;
            updateSliderPosition();
            setItemLength(counterDataNumber + 1);
            removeLimitClasses();
            addLimitClasses();
            counter.setAttribute('data-counter-number', counterDataNumber);
        }
    }

    //| Increase value ↓
    function increaseValue() {
        if (counterDataNumber < itemLength - 1) {
            counterDataNumber++;
            updateSliderPosition();
            setItemLength(counterDataNumber + 1);
            removeLimitClasses();
            addLimitClasses();
            counter.setAttribute('data-counter-number', counterDataNumber);
        }
    }

    //| Halpers ↓
    function addLimitClasses() {
        counterDataNumber === 0 ? btnMinus.classList.add('_limit') : null;
        counterDataNumber === itemLength - 1 ? btnPlus.classList.add('_limit') : null;
    }

    function removeLimitClasses() {
        btnMinus.classList.contains('_limit') ? btnMinus.classList.remove('_limit') : null;
        btnPlus.classList.contains('_limit') ? btnPlus.classList.remove('_limit') : null;
    }
} 
