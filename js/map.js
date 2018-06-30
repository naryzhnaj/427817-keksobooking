'use strict';
(function () {
  var flatOffers = window.createOffers();
  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mouseup', function () {
    window.initialStage(false);
    window.openForm();
    window.insertMapPins(flatOffers);
  });
})();
