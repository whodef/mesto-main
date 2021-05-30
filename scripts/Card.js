export default class Card {
    _name;
    _link;
    _cardWrapper;
    _handleCardClick;

    constructor(name, link, cardTemplate, handleCardClick) {
        this._name = name;
        this._link = link;
        this._cardWrapper = cardTemplate.querySelector('.card__item').cloneNode(true);
        this._handleCardClick = handleCardClick;
    }

    _handleLike = () => {
        const likeButton = this._cardWrapper.querySelector('.card__like-button');
        likeButton.classList.toggle('card__like-button_active');
    }

    _handleRemove = () => {
        this._cardWrapper.remove();
    }

    constructCard = () => {
        const cardImage = this._cardWrapper.querySelector('.card__image');
        const likeButton = this._cardWrapper.querySelector('.card__like-button');
        const deleteButton = this._cardWrapper.querySelector('.card__delete-button');

        this._cardWrapper.querySelector('.card__description-title').textContent = this._name;

        cardImage.src = this._link;
        cardImage.alt = this._name;

        likeButton.addEventListener('click', this._handleLike);
        cardImage.addEventListener('click', this._handleCardClick);
        deleteButton.addEventListener('click', this._handleRemove);

        return this._cardWrapper;
    }
}