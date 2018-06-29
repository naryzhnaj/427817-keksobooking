'use strict';
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 130;
var MAX_Y = 630;
var IMAGE_RADIUS = 20;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

// создание метки
var createOnePin = function (number) {
  var newPin = document.createElement('button');
  newPin.className = 'map__pin';
  var house = flatOffers[number];
  newPin.alt = house.offer.title;
  newPin.style.left = house.location.x - PIN_WIDTH / 2 + 'px';
  newPin.style.top = house.location.y - PIN_HEIGHT + 'px';
  newPin.setAttribute('data-number', number);
  var newPinImg = document.createElement('img');
  newPinImg.width = 2 * IMAGE_RADIUS;
  newPinImg.height = 2 * IMAGE_RADIUS;
  newPinImg.src = house.author.avatar;
  newPinImg.draggable = 'false';

  newPin.appendChild(newPinImg);
  return newPin;
};

// отрисовываем метки
var insertMapPins = function () {
  var mapPins = map.querySelector('.map__pins');
  for (var i = 0; i < flatOffers.length; i++) {
    mapPins.appendChild(createOnePin(i));
  }
  mapPins.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.className === 'map__pin') {
      insertOffer(target.getAttribute('data-number'));
    }
  });
};

// создаем объявление
var createOneOffer = function (house) {
  var offerTemplate = document.querySelector('template').content;
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
  var newOffer = offerTemplate.cloneNode(true);
  newOffer.querySelector('.popup__title').textContent = offer.title;
  newOffer.querySelector('.popup__text--address').textContent = offer.address;
  newOffer.querySelector('.popup__avatar').src = house.author.avatar;
  newOffer.querySelector('.popup__text--price').textContent = offer.price + String.fromCharCode(0x20bd) + '/ночь';
  newOffer.querySelector('.popup__type').textContent = houseType;
  newOffer.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей.';
  newOffer.querySelector('.popup__text--time').textContent = 'Заезд после' + offer.checkin + ', выезд до ' + offer.checkout;
  newOffer.querySelector('.popup__description').textContent = offer.description;
  var housefeatures = offer.features;
  var allFeatures = newOffer.querySelector('.popup__features').children;
  for (var i = 0; i < housefeatures.length; i++) {
    allFeatures[i].className = 'popup__feature popup__feature--' + housefeatures[i];
  }
  var housePhotos = offer.photos;
  var photos = newOffer.querySelector('.popup__photos');
  photos.firstElementChild.src = housePhotos[0];
  for (i = 1; i < housePhotos.length; i++) {
    var newPicture = photos.firstElementChild.cloneNode(true);
    newPicture.src = housePhotos[i];
    photos.appendChild(newPicture);
  }
  return newOffer;
};

var insertOffer = function (currentOffer) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createOneOffer(flatOffers[currentOffer]));
  map.insertBefore(fragment, document.querySelector('.map__filters-container'));
};
// блокировка формы
var disabledForm = function (isDisabled) {
  if (!isDisabled) {
    adForm.classList.remove('ad-form--disabled');
  }
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = isDisabled;
  }
};

var flatOffers = window.createOffers();
var map = document.querySelector('.map');
var address = document.getElementById('address');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var fieldsets = adForm.getElementsByTagName('fieldset');
var x0 = 570;
var y0 = 375;
address.value = x0 + ', ' + y0;
//address.value = mainPin.style.left + ', ' + mainPin.style.top;

mainPin.addEventListener('mouseup', function () {
  disabledForm(false);
//  address.value = mainPin.style.left + ', ' + mainPin.style.top;
  window.openForm();
  map.classList.remove('.map--faded');
  insertMapPins();
});
