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

const profileDescription = document.querySelector('.profile__description');
const profileName = document.querySelector('.profile__name');
const cardsContainer = document.querySelector('.card__list');
const cardOverlayContainer = document.querySelector('#image-overlay');
const cardOverlayImage = cardOverlayContainer.querySelector('.overlay__image');
const cardOverlayCaption = cardOverlayContainer.querySelector('.overlay__image-caption');
const overlayCloseButtons = document.querySelectorAll('.overlay__close-button');

overlayCloseButtons.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        e.preventDefault();
        closeOverlay();
    })
});

const openOverlay = (elem) => {
    elem.classList.add('overlay_open');
};

const closeOverlay = () => {
    const overlay = document.querySelector('.overlay_open');
    overlay.classList.remove('overlay_open');
};

const overlayFormNameInput = () => document.querySelector('.overlay.overlay_open .overlay__form-input_type_name');
const overlayFormExtInput = () => document.querySelector('.overlay.overlay_open .overlay__form-input_type_ext');

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

    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        card.remove();
    });

    // Реализация всплывающего контейнера с описанием картинок

    cardImage.addEventListener('click', (e) => {
        e.preventDefault();
        cardOverlayImage.src = link;
        cardOverlayImage.alt = name;
        cardOverlayCaption.textContent = name;
        openOverlay(cardOverlayContainer);
    });

    return card;
};

initialCards.forEach((card) => {
    cardsContainer.append(constructCard(card.name, card.link));
});

// Всплывающее окно для изменений в .profile__change-button
const handleOverlayProfile = () => {
    // Переменная названа контекстно
    const overlay = document.querySelector('#change-profile-overlay');

    const formSubmitHandler = (e) => {
        e.preventDefault();
        profileName.textContent = overlayFormNameInput().value;
        profileDescription.textContent = overlayFormExtInput().value;
        closeOverlay();
    };

    overlay.querySelector('.overlay__form').addEventListener('submit', formSubmitHandler);

    const openOverlayButton = document.querySelector('#change-profile');
    openOverlayButton.addEventListener('click', () => {
        openOverlay(overlay);
        overlayFormNameInput().value = profileName.textContent;
        overlayFormExtInput().value = profileDescription.textContent;
    });
};

// Всплывающее окно для изменений в .profile__add-button
const handleOverlayNewCard = () => {
    // Переменная названа контекстно
    const overlay = document.querySelector('#new-card-overlay');

    const formSubmitHandler = (e) => {
        e.preventDefault();

        const name = overlayFormNameInput();
        const url = overlayFormExtInput();
        cardsContainer.prepend(constructCard(name.value, url.value));

        closeOverlay();

        name.value = '';
        url.value = '';
    };

    overlay.querySelector('.overlay__form').addEventListener('submit', formSubmitHandler);

    const openOverlayButton = document.querySelector('#add-new-card');
    openOverlayButton.addEventListener('click', () => {
        openOverlay(overlay);
    });
};

handleOverlayProfile();
handleOverlayNewCard();
