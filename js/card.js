'use strict';

(function () {
  var FlatTypes = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'palace': 'Дворец'};

  var map = document.querySelector('.map');

  // создать и заполнить карточку
  var createCard = function (num) {
    var offerTemplate = document.querySelector('template').content;
    var newOffer = offerTemplate.cloneNode(true);
    var offer = window.flats[num].offer;

    newOffer.querySelector('.popup__title').textContent = offer.title;
    newOffer.querySelector('.popup__text--address').textContent = offer.address;
    newOffer.querySelector('.popup__avatar').src = window.flats[num].author.avatar;
    newOffer.querySelector('.popup__text--price').textContent = offer.price + String.fromCharCode(0x20bd) + '/ночь';
    newOffer.querySelector('.popup__type').textContent = FlatTypes[offer.type];
    newOffer.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей.';
    newOffer.querySelector('.popup__text--time').textContent = 'Заезд после' + offer.checkin + ', выезд до ' + offer.checkout;
    newOffer.querySelector('.popup__description').textContent = offer.description;

    var allFeatures = newOffer.querySelector('.popup__features').children;
    offer.features.forEach(function (housefeature, i) {
      allFeatures[i].className = 'popup__feature popup__feature--' + housefeature;
    });

    var photos = newOffer.querySelector('.popup__photos');
    offer.photos.forEach(function (photo) {
      var newPhoto = document.createElement('img');
      newPhoto.alt = 'Фотография жилья';
      newPhoto.className = 'popup__photo';
      newPhoto.width = 45;
      newPhoto.height = 40;
      newPhoto.src = photo;
      photos.appendChild(newPhoto);
    });
    return newOffer;
  };

  // вставка объявления
  window.insertOffer = function (offerNumber) {
    var newCard = createCard(offerNumber);
    var popup = map.querySelector('.popup');
    if (!popup) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(newCard);
      map.insertBefore(fragment, document.querySelector('.map__filters-container'));
    } else {
      map.replaceChild(newCard, popup);
    }
  };

  // закрыть карточку
  window.closePopup = function () {
    var popup = map.querySelector('.popup');
    if (popup) {
      map.removeChild(popup);
      map.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  };
})();
