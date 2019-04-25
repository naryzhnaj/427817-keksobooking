'use strict';

(function () {
  var FlatTypes = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'palace': 'Дворец'
  };
  var Image = {
    WIDTH: 45,
    HEIGHT: 40
  };
  var RUBLE = String.fromCharCode(0x20bd);
  var map = document.querySelector('.map');

  /**
   * @description создать и заполнить карточку
   *
   * @param {int} num номер объявления
   *
   * @return {DOM-элемент} newOffer карточка
   */
  var createCard = function (house) {
    var offerTemplate = document.querySelector('template').content;
    var newOffer = offerTemplate.cloneNode(true);

    var offer = house.offer;
    newOffer.querySelector('.popup__title').textContent = offer.title;
    newOffer.querySelector('.popup__text--address').textContent = offer.address;
    newOffer.querySelector('.popup__avatar').src = house.author.avatar;
    newOffer.querySelector('.popup__text--price').textContent = offer.price + RUBLE + '/ночь';
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
      newPhoto.width = Image.WIDTH;
      newPhoto.height = Image.HEIGHT;
      newPhoto.src = photo;
      photos.appendChild(newPhoto);
    });

    return newOffer;
  };

  /**
   * @description вставка объявления
   *
   * @param {int} offerNumber номер объявления
   */
  window.insertOffer = function (offerNumber) {
    var newCard = createCard(window.flats[offerNumber]);
    var popup = map.querySelector('.popup');

    if (!popup) {
      map.insertBefore(newCard, document.querySelector('.map__filters-container'));
    } else {
      map.replaceChild(newCard, popup);
    }
  };

  /**
   * @description закрыть карточку
   */
  window.closePopup = function () {
    var popup = map.querySelector('.popup');
    if (popup) {
      map.removeChild(popup);
      map.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  };
})();
