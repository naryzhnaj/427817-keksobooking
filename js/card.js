'use strict';
(function () {
  var FlatTypes = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало', 'palace': 'Дворец'};
  var map = document.querySelector('.map');
  var createOneOffer = function (house) {

    var offerTemplate = document.querySelector('template').content;
    var newOffer = offerTemplate.cloneNode(true);
    var offer = house.offer;

    newOffer.querySelector('.popup__title').textContent = offer.title;
    newOffer.querySelector('.popup__text--address').textContent = offer.address;
    newOffer.querySelector('.popup__avatar').src = house.author.avatar;
    newOffer.querySelector('.popup__text--price').textContent = offer.price + String.fromCharCode(0x20bd) + '/ночь';
    newOffer.querySelector('.popup__type').textContent = FlatTypes[offer.type];
    newOffer.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей.';
    newOffer.querySelector('.popup__text--time').textContent = 'Заезд после' + offer.checkin + ', выезд до ' + offer.checkout;
    newOffer.querySelector('.popup__description').textContent = offer.description;

    var allFeatures = newOffer.querySelector('.popup__features').children;
    offer.features.forEach(function (housefeature, i) {
      allFeatures[i].className = 'popup__feature popup__feature--' + housefeature;
    });

    var housePhotos = offer.photos;
    var photos = newOffer.querySelector('.popup__photos');
    photos.firstElementChild.src = housePhotos[0];
    for (var i = 1; i < housePhotos.length; i++) {
      var newPicture = photos.firstElementChild.cloneNode(true);
      newPicture.src = housePhotos[i];
      photos.appendChild(newPicture);
    }
    return newOffer;
  };

  // вставка объявления
  window.insertOffer = function (currentOffer) {
    var popup = map.querySelector('.popup');
    var newCard = createOneOffer(currentOffer);

    if (!popup) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(newCard);
      map.insertBefore(fragment, document.querySelector('.map__filters-container'));
    } else {
      map.replaceChild(newCard, popup);
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  };

  window.closePopup = function (evt) {
    if (evt.target.className === 'popup__close') {
      map.removeChild(evt.target.parentNode);
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  };
})();
