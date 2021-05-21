const initValidate = {
    formSelector: '.overlay__form',
    inputSelector: '.overlay__form-input',
    buttonMode: '.overlay__save-button',
    inputErrorMode: 'overlay__form-input_state',
    errorMode: 'overlay__form-error_visible'
};

const checkInputValidity = (formElement, inputElement, initValidate) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, initValidate);
    } else {
        showInputError(formElement, inputElement, initValidate);
    }
};

const checkInputValidityState = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
};

const setBtnMode = (btnElement, inputList) => {
    checkInputValidityState(inputList) ? btnElement.disabled = true : btnElement.disabled = false;
};

const hideInputError = (formElement, inputElement, initValidate) => {
    const {inputErrorMode, errorMode} = initValidate;
    const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorMode);
    errorMessage.textContent = '';
    errorMessage.classList.remove(errorMode);
};

const showInputError = (formElement, inputElement, initValidate) => {
    const {inputErrorMode, errorMode} = initValidate;
    const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(inputErrorMode);
    errorMessage.textContent = inputElement.validationMessage;
    errorMessage.classList.add(errorMode);
};

const setEventListeners = (formElement, initValidate) => {
    const {inputSelector, buttonMode, ...restInit} = initValidate;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));

    const buttonElement = formElement.querySelector(buttonMode);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', (e) => {
            e.preventDefault();
            checkInputValidity(formElement, inputElement, restInit);
            setBtnMode(buttonElement, inputList);
        });
    });

    setBtnMode(buttonElement, inputList);
};

const enableValidation = (initValidate) => {
    const {formSelector, ...restInit} = initValidate;
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach(formElement => {
        setEventListeners(formElement, restInit);
    });
};
enableValidation(initValidate);