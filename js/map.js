'use strict';
(function () {
  var PINS_AMOUNT = 5;
  var Range = {
    MIN_X: 300,
    MAX_X: 900,
    MIN_Y: 130,
    MAX_Y: 630};
  var PinSize = {RADIUS: 25,
    HEIGHT: 70};

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var address = document.getElementById('address');

  window.initialStage(true);
  var startCoords = {};

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
  });

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x - PinSize.RADIUS) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    if (!window.activeStage) {
      window.initialStage(false);
      map.addEventListener('click', popupClose);
      window.load(insertMapPins, window.errorMessage);

      window.activeStage = true;
    }
    address.value = (mainPin.offsetLeft + PinSize.RADIUS) + ', ' + (mainPin.offsetTop + PinSize.HEIGHT);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  // создать метки
  var insertMapPins = function (flats) {
    for (var i = 0; i < PINS_AMOUNT; i++) {
      var pin = window.createOnePin(flats[i]);
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
  var popupClose = function (evt) {
    if (evt.target.className === 'popup__close') {
      map.removeChild(evt.target.parentNode);
    }
  };

  window.errorMessage = function () {
  };
})();
