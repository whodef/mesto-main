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

// Всплывающее окно для изменений в .profile__indication

const overlay = document.querySelector('#change-overlay');
const formElement = overlay.querySelector('.overlay__form');
const openOverlayButton = document.querySelector('.profile__change-button');
const closeOverlayButton = document.querySelector('.overlay__close-button');
let nameInput = document.querySelector('.overlay__form-input_type_name');
let descriptionInput = document.querySelector('.overlay__form-input_type_description');
let profileName = document.querySelector('.profile__name');
let profileDescription= document.querySelector('.profile__description');

const closeOverlay = () => {
    overlay.classList.remove('overlay_open');
};

const formSubmitHandler = (e) => {
    e.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeOverlay();
};

const pushOverlay = () => {
    overlay.classList.add('overlay_open');
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
};

openOverlayButton.addEventListener('click', pushOverlay);
closeOverlayButton.addEventListener('click', closeOverlay);
formElement.addEventListener('submit', formSubmitHandler);


// TODO: Всплывающее окно для изменений .profile__add-button
// TODO: Форма добавления карточки
// TODO: Добавление карточки

// TODO: Плавное открытие и закрытие всех попапов



