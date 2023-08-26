const cardNumberInput = document.querySelector('.card-number-input');
const cardNumberElement = document.querySelector('.card-number');
const cardholderInput = document.querySelector('.cardholder-input');
const cardholderElement = document.querySelector('.cardholder');
const mmInput = document.querySelector('.ex-date');
const yyInput = document.querySelector('.ex-date.yy');
const mmElement = document.querySelector('.ex-date-month');
const yyElement = document.querySelector('.ex-date-year');
const cvcInput = document.querySelector('.cvc-input');
const cvcElement = document.querySelector('.cvc-number');

const form = document.querySelector('form');
const thankYouMessage = document.querySelector('.thank-you-message');
const confirmButton = document.getElementById('confirm-btn');
const continueButton = document.getElementById('continue-btn');

const cardNumberError = document.querySelector('.card-number-input ~ em');
const mmError = document.querySelector('.ex-date ~ em');
const yyError = document.querySelector('.ex-date.yy ~ em');
const cvcError = document.querySelector('.cvc-input ~ em')



// event listeners
cardNumberInput.addEventListener('input', formatCardNumber);
cvcInput.addEventListener('input', formatCVC);
cardholderInput.addEventListener('input', formatCardholder);
mmInput.addEventListener('input', formatMonth);
yyInput.addEventListener('input', formatYear);
confirmButton.addEventListener('click', showThankYouMessage);
continueButton.addEventListener('click', hideThankYouMessage);
cardNumberInput.addEventListener('input', validateCardNumber);
mmInput.addEventListener('input', validateMM);
yyInput.addEventListener('input', validateYY);
cvcInput.addEventListener('input', validateCVC);


// Functions
function formatCardNumber() {
    const input = cardNumberInput.value.replace(/\s/g, ''); 
    const maxLength = 16;
    const formattedInput = input.slice(0, maxLength).replace(/(\d{4})(?=\d)/g, '$1 ');

    
    cardNumberElement.textContent = formattedInput || '0000 0000 0000 0000';
}

function formatCVC() {
    const input = cvcInput.value;
    const maxLength = 3;
    const formattedInput = input.slice(0, maxLength);
    cvcInput.value = formattedInput;

    cvcElement.textContent = formattedInput || '000';
}

function formatCardholder() {
    const input = cardholderInput.value;
    const maxLength = 30;
    const formattedInput = input.slice(0, maxLength);
    cardholderElement.textContent =  formattedInput || 'Jane Appleseed';
}

function formatMonth() {
    const input = mmInput.value;
    const maxMonth = 12;
    const formattedInput = Math.min(Math.max(input, 0), maxMonth).toString().padStart(2, '0');
    mmInput.value = formattedInput;

    mmElement.textContent = formattedInput;
}

function formatYear() {
    const input = yyInput.value;
    const maxYear = 99;
    const formattedInput = Math.min(Math.max(input, 0), maxYear).toString().padStart(2, '0');
    yyInput.value = formattedInput;

    yyElement.textContent = formattedInput;

}

function showThankYouMessage(event) {
    event.preventDefault(); // Prevent form submission

    if (form.checkValidity()) {
        form.style.display = 'none';
        thankYouMessage.style.display = 'block';
    } else {
        form.reportValidity();

        validateCardNumber();
        validateMM();
        validateYY();
        validateCVC();
        updateConfirmButtonState();
    }
}

function hideThankYouMessage() {
    form.style.display = 'flex';
    thankYouMessage.style.display = 'none';
}

function validateCardNumber() {
    if (/[^0-9 ]/.test(cardNumberInput.value)) {
        cardNumberError.style.display = 'block';
        cardNumberInput.classList.add('input-error');
        confirmButton.disabled = true;
    } else {
        cardNumberError.style.display = 'none';
        cardNumberInput.classList.remove('input-error');
        confirmButton.disabled = false;
    }
}

function validateMM() {
    if (mmInput.value === '') {
        mmError.style.display = 'block';
        mmInput.classList.add('input-error');
    } else {
        mmError.style.display = 'none';
        mmInput.classList.remove('input-error');

    }
}

function validateYY() {
    if(yyInput.value === '') {
        yyError.style.display = 'block';
        yyInput.classList.add('input-error');

    } else {
        yyError.style.display = 'none';
        yyInput.classList.remove('input-error');

    }
}

function validateCVC() {
    if (cvcInput.value === '') {
        cvcError.style.display = 'block';
        cvcInput.classList.add('input-error');

    } else {
        cvcError.style.display = 'none';
        cvcInput.classList.remove('input-error');

    }
}

function updateConfirmButtonState() {
    if (
        cardNumberError.style.display === 'none' &&
        mmError.style.display === 'none' &&
        yyError.style.display === 'none' &&
        cvcError.style.display === 'none'
    ) {
        confirmButton.disabled = false;
        confirmButton.classList.remove('shake');
    } else {
        confirmButton.disabled = true;
        confirmButton.classList.add('shake');
    }
}