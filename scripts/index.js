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
    if (elem.classList.contains('overlay') || elem.classList.contains('overlay__close-button')) {
        const currentOpenOverlay = document.querySelector('.overlay_open');
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

const cardImgClickListener = ((name, link) => {
    viewImageContentImage.src = link;
    viewImageContentImage.alt = name;
    viewImageContentCaption.textContent = viewImageContentImage.alt;
    openOverlay(viewImageOverlay);
});

const changeProfileFormSubmitHandler = ((e) => {
    e.preventDefault();
    profileNameOnPage.textContent = changeProfileFormNameInput.value;
    profileDescriptionOnPage.textContent = changeProfileFormExtInput.value;
    closeOverlay(changeProfileOverlay);
});

const createCard = (name, link) => {
    const card = new Card(name, link, cardTemplate, cardImgClickListener);
    return card.constructCard();
}

const addCardFormSubmitHandler = ((e) => {
    e.preventDefault();
    cardsContainer.prepend(createCard(addCardFormNameInput.value, addCardFormExtInput.value));
    closeOverlay(addCardOverlay);
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
    cardsContainer.append(createCard(item.name, item.link));
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