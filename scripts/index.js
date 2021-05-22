// Реализация блока с карточками
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

const profileDescriptionOnPage = document.querySelector('.profile__description');
const profileNameOnPage = document.querySelector('.profile__name');
const cardsContainer = document.querySelector('.card__list');
const changeProfileOpenOverlayBtn = document.querySelector('#change-profile');
const changeProfileOverlay = document.querySelector('#change-profile-overlay');
const changeProfileFormNameInput = changeProfileOverlay.querySelector('.overlay__form-input_type_name');
const changeProfileFormExtInput = changeProfileOverlay.querySelector('.overlay__form-input_type_ext');
const addCardOpenOverlayBtn = document.querySelector('#add-new-card');
const addCardOverlay = document.querySelector('#new-card-overlay');
const addCardFormNameInput = addCardOverlay.querySelector('.overlay__form-input_type_name');
const addCardFormExtInput = addCardOverlay.querySelector('.overlay__form-input_type_ext');
const viewImageOverlay = document.querySelector('#image-overlay');
const viewImageContentImage = viewImageOverlay.querySelector('.overlay__image');
const viewImageContentCaption = viewImageOverlay.querySelector('.overlay__image-caption');

const simulateClick = (elem) => {
    const simulateClick = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: false
    });
    elem.dispatchEvent(simulateClick);
};

const escHandler = (e) => {
    if (e.key !== "Escape") {
        return;
    }

    const currentOpenOverlay = document.querySelector('.overlay_open');
    if (null === currentOpenOverlay) {
        return;
    }
    simulateClick(currentOpenOverlay);
};

const openOverlayHandler = (elem) => {
    elem.classList.add('overlay_open');
    elem.addEventListener('click', closeOverlayHandler);
};

const closeOverlayHandler = (e) => {
    const elem = e.target;
    if (!(elem.classList.contains('overlay') || elem.classList.contains('overlay__close-button'))) {
        return;
    }

    let overlay = elem;
    if(!elem.classList.contains('overlay')) {
        overlay = elem.closest('.overlay');
    }

    overlay.classList.remove('overlay_open');
    overlay.removeEventListener('click', closeOverlayHandler);
};

const changeProfileFormSubmitHandler = (e) => {
    e.preventDefault();
    profileNameOnPage.textContent = changeProfileFormNameInput.value;
    profileDescriptionOnPage.textContent = changeProfileFormExtInput.value;

    const overlay = e.target.closest('.overlay');
    simulateClick(overlay);
};

const addCardFormSubmitHandler = (e) => {
    e.preventDefault();
    const name = addCardFormNameInput;
    const url = addCardFormExtInput;

    cardsContainer.prepend(constructCard(name.value, url.value));

    const overlay = e.target.closest('.overlay');
    simulateClick(overlay);

    name.value = '';
    url.value = '';
};

changeProfileOpenOverlayBtn.addEventListener('click', () => {
    openOverlayHandler(changeProfileOverlay);
    changeProfileFormNameInput.value = profileNameOnPage.textContent;
    changeProfileFormExtInput.value = profileDescriptionOnPage.textContent;
});

addCardOpenOverlayBtn.addEventListener('click', () => {
    resetForm(addCardOverlay);
    openOverlayHandler(addCardOverlay);
});

document.addEventListener('keydown', escHandler);
changeProfileOverlay.querySelector('.overlay__form').addEventListener('submit', changeProfileFormSubmitHandler);
addCardOverlay.querySelector('.overlay__form').addEventListener('submit', addCardFormSubmitHandler);

const constructCard = (name, link) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card__item').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const likeBtn = card.querySelector('.card__like-button');
    const deleteBtn = card.querySelector('.card__delete-button');

    cardImage.src = link;
    cardImage.alt = name;
    card.querySelector('.card__description-title').textContent = name;

    likeBtn.addEventListener('click', (e) => {
        e.target.classList.toggle('card__like-button_active');
    });

    deleteBtn.addEventListener('click', () => {
        card.remove();
    });

    // Реализация всплывающего контейнера с описанием картинок
    cardImage.addEventListener('click', () => {
        viewImageContentImage.src = link;
        viewImageContentImage.alt = name;
        viewImageContentCaption.textContent = name;
        openOverlayHandler(viewImageOverlay);
    });
    return card;
};

initialCards.forEach((card) => {
    cardsContainer.append(constructCard(card.name, card.link));
});