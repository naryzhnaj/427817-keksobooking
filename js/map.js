'use strict';
(function () {
  var X0 = 570;
  var Y0 = 375;
  var flatOffers = window.createOffers();
  var mainPin = document.querySelector('.map__pin--main');
  var address = document.getElementById('address');

  address.value = X0 + ', ' + Y0;

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
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    if (!window.activeStage) {
      window.initialStage(false);
      window.insertMapPins(flatOffers);
      window.activeStage = true;
    }
    address.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

})();
