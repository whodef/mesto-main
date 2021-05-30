import Card from './Card.js'
import FormValidator from './FormValidator.js'

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Всплывающее окно профайла
const changeProfileOpenOverlayBtn = document.querySelector('#change-profile');
const profileDescriptionOnPage = document.querySelector('.profile__description');
const profileNameOnPage = document.querySelector('.profile__name');
const changeProfileOverlay = document.querySelector('#change-profile-overlay');
const changeProfileForm = changeProfileOverlay.querySelector('.overlay__form');
const changeProfileFormNameInput = changeProfileOverlay.querySelector('.overlay__form-input_type_name');
const changeProfileFormExtInput = changeProfileOverlay.querySelector('.overlay__form-input_type_ext');
// Всплывающее окно карточки
const addCardOpenOverlayBtn = document.querySelector('#add-new-card');
const addCardOverlay = document.querySelector('#new-card-overlay');
const addCardForm = addCardOverlay.querySelector('.overlay__form');
const addCardFormNameInput = addCardOverlay.querySelector('.overlay__form-input_type_name');
const addCardFormExtInput = addCardOverlay.querySelector('.overlay__form-input_type_ext');
// Template для создания карточек
const cardsContainer = document.querySelector('.card__list');
const cardTemplate = document.querySelector('#card-template').content;
const viewImageOverlay = document.querySelector('#image-overlay');
const viewImageContentImage = viewImageOverlay.querySelector('.overlay__image');
const viewImageContentCaption = viewImageOverlay.querySelector('.overlay__image-caption');

const forms = [
    {
        name: 'profileForm',
        form: changeProfileForm
    },
    {
        name: 'addCardForm',
        form: addCardForm
    }
];

const formValidators = {};

// Открытие-закрытие всплывающего окна
const openOverlay = ((elem) => {
    elem.classList.add('overlay_open');
    elem.addEventListener('click', closeOverlayClickListener);
    document.addEventListener('keyup', closeOverlayEscListener);
});

const closeOverlay = ((elem) => {
    elem.classList.remove('overlay_animation-helper', 'overlay_open');
    elem.removeEventListener('click', closeOverlayClickListener);
    document.removeEventListener('keyup', closeOverlayEscListener);
});

const closeOverlayClickListener = ((e) => {
    const elem = e.target;
    const currentOpenOverlay = document.querySelector('.overlay_open');
    if (elem.classList.contains('overlay') || elem.classList.contains('overlay__close-button')) {
        closeOverlay(currentOpenOverlay);
    }
});

const closeOverlayEscListener = ((e) => {
    if (e.key === "Escape") {
        const currentOpenOverlay = document.querySelector('.overlay_open');
        closeOverlay(currentOpenOverlay);
    }
});
// -------------------------------------

const cardImgClickListener = ((e) => {
    const cardImage = e.target;
    viewImageContentImage.src = cardImage.src;
    viewImageContentImage.alt = cardImage.alt;
    viewImageContentCaption.textContent = viewImageContentImage.alt;
    openOverlay(viewImageOverlay);
});

const changeProfileFormSubmitHandler = ((e) => {
    e.preventDefault();
    profileNameOnPage.textContent = changeProfileFormNameInput.value;
    profileDescriptionOnPage.textContent = changeProfileFormExtInput.value;

    const overlay = e.target.closest('.overlay');
    closeOverlay(overlay);
});

const addCardFormSubmitHandler = ((e) => {
    e.preventDefault();
    const card = new Card(addCardFormNameInput.value, addCardFormExtInput.value, cardTemplate, cardImgClickListener);
    cardsContainer.prepend(card.constructCard());

    const overlay = e.target.closest('.overlay');
    closeOverlay(overlay);
});

changeProfileOpenOverlayBtn.addEventListener('click', () => {
    formValidators['profileForm'].cleanFormValidation();
    openOverlay(changeProfileOverlay);
    changeProfileFormNameInput.value = profileNameOnPage.textContent;
    changeProfileFormExtInput.value = profileDescriptionOnPage.textContent;
});

addCardOpenOverlayBtn.addEventListener('click', () => {
    formValidators['addCardForm'].cleanFormValidation();
    openOverlay(addCardOverlay);
});

changeProfileOverlay.querySelector('.overlay__form').addEventListener('submit', changeProfileFormSubmitHandler);

addCardOverlay.querySelector('.overlay__form').addEventListener('submit', addCardFormSubmitHandler);

initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, cardTemplate, cardImgClickListener);
    cardsContainer.append(card.constructCard());
});

forms.forEach(item => {

    formValidators[item.name] = new FormValidator(
        item.form,
        {
            formSelector: '.overlay__form',
            inputSelector: '.overlay__form-input',
            buttonSelector: '.overlay__save-button',
            buttonMode: '.overlay__save-button',
            inputErrorMode: 'overlay__form-input_state',
            errorMode: 'overlay__form-error_visible'
        }
    );
    formValidators[item.name].enableValidation();
});