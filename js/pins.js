'use strict';
(function () {
  var PINS_AMOUNT = 5;
  var Pin = {
    IMAGE_RADIUS: 20,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70};

  var mapPins = document.querySelector('.map__pins');

  var createOnePin = function (house) {
    var newPin = document.createElement('button');
    newPin.className = 'map__pin';
    newPin.alt = house.offer.title;
    newPin.style.left = house.location.x - Pin.PIN_WIDTH / 2 + 'px';
    newPin.style.top = house.location.y - Pin.PIN_HEIGHT + 'px';

    var newPinImg = document.createElement('img');
    newPinImg.width = 2 * Pin.IMAGE_RADIUS;
    newPinImg.height = 2 * Pin.IMAGE_RADIUS;
    newPinImg.src = house.author.avatar;
    newPinImg.draggable = 'false';

    newPin.appendChild(newPinImg);
    return newPin;
  };

  window.insertMapPins = function () {
    for (var i = 0; i < PINS_AMOUNT; i++) {
      var pin = createOnePin(window.flats[i]);
      pin.setAttribute('data-number', i);
      mapPins.appendChild(pin);
    }
  };
  window.deletePins = function () {
    while (mapPins.children.length > 1) {
      mapPins.removeChild(mapPins.lastChild);
    }
  };
})();
