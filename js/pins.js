'use strict';
(function () {

  var IMAGE_RADIUS = 20;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPins = document.querySelector('.map__pins');
  // создание метки
  var createOnePin = function (house) {
    var newPin = document.createElement('button');
    newPin.className = 'map__pin';
    newPin.alt = house.offer.title;
    newPin.style.left = house.location.x - PIN_WIDTH / 2 + 'px';
    newPin.style.top = house.location.y - PIN_HEIGHT + 'px';

    var newPinImg = document.createElement('img');
    newPinImg.width = 2 * IMAGE_RADIUS;
    newPinImg.height = 2 * IMAGE_RADIUS;
    newPinImg.src = house.author.avatar;
    newPinImg.draggable = 'false';

    newPin.appendChild(newPinImg);
    return newPin;
  };

  // отрисовываем метки
  window.insertMapPins = function (flats) {
    for (var i = 0; i < flats.length; i++) {
      var pin = createOnePin(flats[i]);
      pin.setAttribute('data-number', i);
      mapPins.appendChild(pin);
    }

    mapPins.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.className === 'map__pin') {
        window.insertOffer(flats[target.getAttribute('data-number')]);
      }
    });
  };
})();
