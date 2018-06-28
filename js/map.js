'use strict';
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'house', 'bungalo', 'palace'];
var CHECK = ['12:00', '13:00', '14:00'];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MAX_GUESTS = 5;
var MIN_GUESTS = 0;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 130;
var MAX_Y = 630;
var X0 = 570;
var Y0 = 375;
var IMAGE_RADIUS = 20;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var FLAT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var FLAT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFER_AMOUNT = 8; // кол-во предложений

// получить случайный элемент из массива
var getRandomEl = function (flatAttributes) {
  return flatAttributes[Math.trunc(Math.random() * flatAttributes.length)];
};
// заполняем массив случайными данными
var createOffers = function () {
  var flats = [];
  var flatX;
  var flatY;
  for (var i = 0; i < OFFER_AMOUNT; i++) {
    flatX = Math.round(Math.random() * (MAX_X - MIN_X)) + MIN_X;
    flatY = Math.round(Math.random() * (MAX_Y - MIN_Y)) + MIN_Y;
    flats.push({
      'author': {'avatar': 'img/avatars/user0' + (i + 1) + '.png'},
      'offer': {
        'title': getRandomEl(OFFER_TITLES),
        'address': flatX + ', ' + flatY,
        'price': MIN_PRICE + Math.round(Math.random() * (MAX_PRICE - MIN_PRICE)),
        'type': getRandomEl(OFFER_TYPES),
        'rooms': Math.round(Math.random() * (MAX_ROOMS - MIN_ROOMS)) + MIN_ROOMS,
        'guests': Math.round(Math.random() * MAX_GUESTS),
        'checkin': getRandomEl(CHECK),
        'checkout': getRandomEl(CHECK),
        'features': FLAT_FEATURES,
        'description': '',
        'photos': FLAT_PHOTOS.sort(function () {
          return Math.random() - 0.5;
        })
      },
      'location': {
        'x': flatX,
        'y': flatY,
      }
    });
  }
  return flats;
};

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
  for (var i = 0; i < OFFER_AMOUNT; i++) {
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
  for (i = 0; i < housePhotos.length; i++) {
    var newPicture = photos.firstChild.cloneNode(true);
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
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = isDisabled;
  }
};

var flatOffers = createOffers();
var map = document.querySelector('.map');
var address = document.getElementById('address');
var fieldsets = document.querySelector('.ad-form').getElementsByTagName('fieldset');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var rooms = document.getElementById('room_number');
var capacity = document.getElementById('capacity');
var timein = document.getElementById('timein');
var timeout = document.getElementById('timeout');
var houseType = document.getElementById('type');
var price = document.getElementById('price');

mainPin.addEventListener('mouseup', function () {
  disabledForm(false);
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('.map--faded');
  address.value = X0 + ', ' + Y0;
  insertMapPins();
});

// синхронизация цены и типа жилья
houseType.addEventListener('change', function () {
  switch (houseType.selectedIndex.value) {
    case 'bungalo':
      price.min = 0;
      break;
    case 'flat':
      price.min = 1000;
      break;
    case 'house':
      price.min = 5000;
      break;
    case 'palace':
      price.min = 10000;
      break;
  }
});
// синхронизация заезда и отъезда
timein.addEventListener('change', function () {
  timeout.selectedIndex = timein.selectedIndex;
});
timeout.addEventListener('change', function () {
  timein.selectedIndex = timeout.selectedIndex;
});
adForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var selectedRooms = rooms.selectedIndex.value;
  var selectedGuests = capacity.selectedIndex.value;
  var isCapacityEnough = (selectedRooms < selectedGuests) || ((selectedGuests === MIN_GUESTS) && (selectedRooms > 0));
  if (isCapacityEnough) {
    rooms.setCustomValidity('Извините, число комнат должно соответствовать числу гостей');
  } else {
    rooms.setCustomValidity('');
  }
});
