export default class FormValidator {
    _selectorConfig;
    _formElement;
    _inputList;
    _buttonElement;

    constructor(element, config) {
        this._formElement = element;
        this._selectorConfig = config;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._selectorConfig.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._selectorConfig.buttonSelector);
    }

    _showInputError = (inputElement, errorMessage) => {
        inputElement.classList.add('overlay__form-input_state');
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._selectorConfig.errorMode);
    }

    _hideInputError = (inputElement) => {
        inputElement.classList.remove('overlay__form-input_state');
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.classList.remove(this._selectorConfig.inputErrorMode);
        errorElement.classList.remove(this._selectorConfig.errorMode);
    }

    _checkInputValidity = (inputElement) => {
        inputElement.validity.valid ? this._hideInputError(inputElement) : this._showInputError(inputElement, inputElement.validationMessage);
    };

    _setEventListeners = () => {
        this._toggleButtonMode();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', (e) => {
                e.preventDefault();
                this._checkInputValidity(inputElement);
                this._toggleButtonMode();
            });
        });
    };

    _toggleButtonMode = () => {
        if (this._hasInvalidInput(this._inputList)) {
            this.disableSubmitButton();
        } else {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._selectorConfig.buttonMode);
        }
    }

    _hasInvalidInput = (inputList) => inputList.some((inputElement) => !inputElement.validity.valid);

    disableSubmitButton = () => {
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(this._selectorConfig.buttonMode);
    }


    enableValidation = () => {
        this._setEventListeners(this._formElement);
    }

    cleanFormValidation = () => {
        this._inputList.forEach(this._hideInputError);
        this.disableSubmitButton();
        this._formElement.reset();
    }
}