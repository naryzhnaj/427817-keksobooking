'use strict';
(function () {
  var createOneOffer = function (house) {

    var offer = house.offer;
    var houseType;
    switch (offer.type) {
      case 'flat':
        houseType = 'Квартира';
        break;
      case 'bungalo':
        houseType = 'Бунгало';
        break;
      case 'house':
        houseType = 'Дом';
        break;
      case 'palace':
        houseType = 'Дворец';
        break;
    }

    var offerTemplate = document.querySelector('template').content;
    var newOffer = offerTemplate.cloneNode(true);
    newOffer.querySelector('.popup__title').textContent = offer.title;
    newOffer.querySelector('.popup__text--address').textContent = offer.address;
    newOffer.querySelector('.popup__avatar').src = house.author.avatar;
    newOffer.querySelector('.popup__text--price').textContent = offer.price + String.fromCharCode(0x20bd) + '/ночь';
    newOffer.querySelector('.popup__type').textContent = houseType;
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
    newOffer.querySelector('.popup__close').addEventListener('click', function () {
      newOffer.parentNode.removeChild(newOffer);
    });
    return newOffer;
  };

  // вставка объявления
  window.insertOffer = function (currentOffer) {
    var fragment = document.createDocumentFragment();
    var newCard = createOneOffer(currentOffer);
    fragment.appendChild(newCard);

    document.querySelector('.map').insertBefore(fragment, document.querySelector('.map__filters-container'));
  };
})();
