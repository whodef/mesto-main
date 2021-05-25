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
const cardTemplate = document.querySelector('#card-template').content;

const closeOverlayEscListener = (e) => {
    if (e.key === "Escape") {
        const currentOpenOverlay = document.querySelector('.overlay_open');
        closeOverlay(currentOpenOverlay);
    }
};

const openOverlay = (elem) => {
    elem.classList.add('overlay_open');
    elem.addEventListener('click', closeOverlayClickListener);
    // Esc работает только на элементе документ, по крайней мере, в хроме на линуксе
    document.addEventListener('keyup', closeOverlayEscListener);
};

const closeOverlay = (elem) => {
    elem.classList.remove('overlay_animation-helper', 'overlay_open');
    elem.removeEventListener('click', closeOverlayClickListener);
    document.removeEventListener('keyup', closeOverlayEscListener);
};

const closeOverlayClickListener = (e) => {
    const elem = e.target;
    const currentOpenOverlay = document.querySelector('.overlay_open');
    if (elem.classList.contains('overlay') || elem.classList.contains('overlay__close-button')) {
        closeOverlay(currentOpenOverlay);
    }
};

const changeProfileFormSubmitHandler = (e) => {
    e.preventDefault();
    profileNameOnPage.textContent = changeProfileFormNameInput.value;
    profileDescriptionOnPage.textContent = changeProfileFormExtInput.value;

    const overlay = e.target.closest('.overlay');
    closeOverlay(overlay);
};

const addCardFormSubmitHandler = (e) => {
    e.preventDefault();
    cardsContainer.prepend(constructCard(addCardFormNameInput.value, addCardFormExtInput.value));

    const overlay = e.target.closest('.overlay');
    closeOverlay(overlay);
};

const constructCard = (name, link) => {
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
        openOverlay(viewImageOverlay);
    });
    return card;
};

changeProfileOpenOverlayBtn.addEventListener('click', () => {
    resetForm(changeProfileOverlay);
    openOverlay(changeProfileOverlay);
    changeProfileFormNameInput.value = profileNameOnPage.textContent;
    changeProfileFormExtInput.value = profileDescriptionOnPage.textContent;
});

addCardOpenOverlayBtn.addEventListener('click', () => {
    resetForm(addCardOverlay);
    openOverlay(addCardOverlay);
});

changeProfileOverlay.querySelector('.overlay__form').addEventListener('submit', changeProfileFormSubmitHandler);
addCardOverlay.querySelector('.overlay__form').addEventListener('submit', addCardFormSubmitHandler);

initialCards.forEach((card) => {
    cardsContainer.append(constructCard(card.name, card.link));
});