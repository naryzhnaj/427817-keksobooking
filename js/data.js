'use strict';
// генерация случайных данных
(function () {
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPES = ['flat', 'house', 'bungalo', 'palace'];
  var CHECK = ['12:00', '13:00', '14:00'];
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MAX_GUESTS = 5;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_X = 300;
  var MAX_X = 900;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var FLAT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var FLAT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var OFFER_AMOUNT = 8; // кол-во предложений

  var getRandomEl = function (flatAttributes) {
    return flatAttributes[Math.trunc(Math.random() * flatAttributes.length)];
  };

  window.createOffers = function () {
    var flatOffers = [];
    var flatX;
    var flatY;
    for (var i = 0; i < OFFER_AMOUNT; i++) {
      flatX = Math.round(Math.random() * (MAX_X - MIN_X)) + MIN_X;
      flatY = Math.round(Math.random() * (MAX_Y - MIN_Y)) + MIN_Y;
      flatOffers.push({
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
          'features': FLAT_FEATURES.sort(function () {
            return Math.random() - 0.5;
          }),
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
    return flatOffers;
  };
})();
