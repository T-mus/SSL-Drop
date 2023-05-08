export function reverseTimer(date, stop, loop) {
    //| Set of loop vars ↓
    let loopOptions = loop,
        loopAcces = loopOptions.loopAcces,
        loopYear = loopOptions.loopYear,
        loopMonth = loopOptions.loopMonth,
        loopDays = loopOptions.loopDays,
        loopHours = loopOptions.loopHours,
        loopMinutes = loopOptions.loopMinutes;
    
    //| My date vars ↓
    let myDate = new Date(date),
        myDateYear = myDate.getFullYear(),
        myDateMonth = myDate.getMonth(),
        myDateDays = myDate.getDate(),
        myDateHours = myDate.getHours(),
        myDateMinutes = myDate.getMinutes();      
    
    //| Document vars ↓
    let daysValue = document.querySelector('.timer__days'),  
        hoursValue = document.querySelector('.timer__hours'),  
        minutesValue = document.querySelector('.timer__minutes'),  
        secondsValue = document.querySelector('.timer__seconds');
        
    //| Main function
    let countTime = (e)=> {
        let currentDate = new Date(),
            dateDiff = myDate - currentDate;

        if (dateDiff <= 0 && stop == true) {
            stopTimer();
            return;
        }
        else if(dateDiff <= 0 && loopAcces == true) {
            stopTimer();
            loopTimer();
            return;
        }

        let dateDays = Math.floor(dateDiff / 1000 / 60 / 60 / 24),
            dateHours = Math.floor(dateDiff / 1000 / 60 / 60 % 24),
            dateMinutes = Math.floor(dateDiff / 1000 / 60 % 60),
            dateSeconds = Math.floor(dateDiff / 1000 % 60);

        daysValue.textContent = String(dateDays).padStart(2, '0');
        hoursValue.textContent = String(dateHours).padStart(2, '0');
        minutesValue.textContent = String(dateMinutes).padStart(2, '0');
        secondsValue.textContent = String(dateSeconds).padStart(2, '0');
    }

    let interval = setInterval(countTime, 1000),
        loopInterval;

    function stopTimer() {
        clearInterval(interval);
        clearInterval(loopInterval);
    }

    function loopTimer() {
        myDate.setFullYear(myDateYear += loopYear);
        myDate.setMonth(myDateMonth += loopMonth);
        myDate.setDate(myDateDays += loopDays);
        myDate.setHours(myDateHours += loopHours);
        myDate.setMinutes(myDateMinutes += loopMinutes);

        loopInterval = setInterval(countTime, 1000);
    }
}
