//| Regular expressions ↓
let regex = {
    // Regex -→> isMobile ↓
    isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },

    // Regex -→> Email ↓ 
    checkEmail(input) {
        return /^\w+([\._-]?\w+)*@\w+([\._-]?\w+)*(\.[a-zA-Z]{2,8})+$/.test(input);
    },

    // Regex -→> Number ↓ 
    checkNumber(input) {
        let numbersOnly = input.replace(/\D/g, '');
        return /^(\+|00)\d{1,3}([- ]*)?\(?(\d{3})\)?([- ]*)?\d{3}([- ]*)?\d{2}([- ]*)?\d{2}$/.test(input)
        && /\d{7,15}/.test(numbersOnly);
    },
}
export let isMobile = regex.isMobile;
export let checkEmail = regex.checkEmail;
export let checkNumber = regex.checkNumber;
