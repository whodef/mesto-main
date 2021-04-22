const openOverlayButton = document.querySelector('.profile__change-button');
const closeOverlayButton = document.querySelector('.overlay__close-button');
const overlay = document.querySelector('.overlay');
const formElement = overlay.querySelector('.overlay__form');
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

openOverlayButton.addEventListener('click', () => {
    overlay.classList.add('overlay_open');
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
});

closeOverlayButton.addEventListener('click', closeOverlay)
formElement.addEventListener('submit', formSubmitHandler);