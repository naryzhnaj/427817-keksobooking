'use strict';
(function () {
  var PINS_AMOUNT = 5;
  var PinSize = {
    RADIUS: 25,
    HEIGHT: 70};

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var address = document.getElementById('address');

  window.initialStage(true);

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

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
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (!window.activeStage) {
        window.initialStage(false);
        window.load(insertMapPins, window.errorMessage);
        map.addEventListener('click', window.closePopup);
        window.activeStage = true;
      }
      address.value = (mainPin.offsetLeft + PinSize.RADIUS) + ', ' + (mainPin.offsetTop + PinSize.HEIGHT);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

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

  window.errorMessage = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: yellow;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
})();
