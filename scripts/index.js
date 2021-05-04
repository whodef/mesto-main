// Реализация блока с карточками
let initialCards = [
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

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.card__list');

const cards = (name, link) => {
    const card = cardTemplate.querySelector('.card__item').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const likeBtn = card.querySelector('.card__like-button');
    const deleteBtn = card.querySelector('.card__delete-button');

    cardImage.src = link;
    cardImage.alt = name;
    card.querySelector('.card__description-title').textContent = name;

    likeBtn.addEventListener('click', (evt) => {
        evt.target.classList.toggle('card__like-button_active');
    });

    deleteBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        card.remove();
    });

    cardImage.addEventListener('click', (evt) => {
        evt.preventDefault();
        // TODO: нужно дописать всплывающее окно к карточкам
    });
    return card;
};

initialCards.forEach((card) => {
    cardsContainer.append(cards(card.name, card.link));
});

// Всплывающее окно для изменений в .profile__change-button
const handleOverlayProfile = () => {

    const overlay = document.querySelector('#change-profile-overlay');

    // profile block elements
    // --------------
    let profileDescription = document.querySelector('.profile__description');
    let profileName = document.querySelector('.profile__name');

    const openOverlay = () => {
        overlay.classList.add('overlay_open');
        nameInput.value = profileName.textContent;
        descriptionInput.value = profileDescription.textContent;
    };

    const openOverlayButton = document.querySelector('#change-profile');
    openOverlayButton.addEventListener('click', openOverlay);
    // --------------

    // overlay elements
    // --------------
    let nameInput = overlay.querySelector('.overlay__form-input_type_name');
    let descriptionInput = overlay.querySelector('.overlay__form-input_type_description');

    const formSubmitHandler = (e) => {
        e.preventDefault();
        profileName.textContent = nameInput.value;
        profileDescription.textContent = descriptionInput.value;
        closeOverlay();
    };

    const formElement = overlay.querySelector('.overlay__form');
    formElement.addEventListener('submit', formSubmitHandler);

    const closeOverlay = () => {
        overlay.classList.remove('overlay_open');
    };

    const closeOverlayButton = overlay.querySelector('.overlay__close-button');
    closeOverlayButton.addEventListener('click', closeOverlay);
    // --------------

};

// Всплывающее окно для изменений в .profile__add-button
const handleOverlayNewCard = (initialCards, cards) => {

    const overlay = document.querySelector('#new-card-overlay');

    // profile block elements
    // --------------
    const openOverlay = () => {
        overlay.classList.add('overlay_open');
    };

    const openOverlayButton = document.querySelector('#add-new-card');
    openOverlayButton.addEventListener('click', openOverlay);
    // --------------

    // overlay elements
    // --------------
    let cardName = overlay.querySelector('.overlay__form-input_type_name');
    let cardImageUrl = overlay.querySelector('.overlay__form-input_type_imageurl');

    const formSubmitHandler = (e) => {
        e.preventDefault();

        initialCards.unshift({
            name: cardName.value,
            link: cardImageUrl.value
        });

        cardsContainer.prepend(cards(initialCards[0].name, initialCards[0].link));

        closeOverlay();

        cardName.value = '';
        cardImageUrl.value = '';
    };

    const formElement = overlay.querySelector('.overlay__form');
    formElement.addEventListener('submit', formSubmitHandler);

    const closeOverlay = () => {
        overlay.classList.remove('overlay_open');
    };

    const closeOverlayButton = overlay.querySelector('.overlay__close-button');
    closeOverlayButton.addEventListener('click', closeOverlay);
    // --------------
};

handleOverlayProfile();
handleOverlayNewCard(initialCards, cards);

// TODO: Плавное открытие и закрытие всех попапов



