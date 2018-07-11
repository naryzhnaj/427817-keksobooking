'use strict';
(function () {
  var PINS_AMOUNT = 5;
  var PinSize = {
    RADIUS: 25,
    HEIGHT: 70};
  var Range = {
    MIN_X: 0,
    MIN_Y: 130 - PinSize.HEIGHT,
    MAX_Y: 630 - PinSize.HEIGHT};

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var address = document.getElementById('address');
  var filters = document.querySelector('.map__filters');
  var price = document.getElementById('housing-price');
  var houseType = document.getElementById('housing-type');
  var guests = document.getElementById('housing-guests');
  var rooms = document.getElementById('housing-rooms');
  var MAX_X = map.clientWidth - 2 * PinSize.RADIUS;

  window.changeStage(true);

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

      var x = mainPin.offsetLeft - shift.x;
      var y = mainPin.offsetTop - shift.y;
      if (x < Range.MIN_X) {
        x = Range.MIN_X;
      }
      if (x > MAX_X) {
        x = MAX_X;
      }
      if (y < Range.MIN_Y) {
        y = Range.MIN_Y;
      }
      if (y > Range.MAX_Y) {
        y = Range.MAX_Y;
      }

      mainPin.style.top = y + 'px';
      mainPin.style.left = x + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (!window.activeStage) {
        window.changeStage(false);
        loadOffers();//window.load(loadOffers, window.errorMessage);

        map.addEventListener('click', function (moveEvt) {
          if (moveEvt.target.className === 'popup__close') {
            window.closePopup();
          }
        });
        window.activeStage = true;
      }
      address.value = (mainPin.offsetLeft + PinSize.RADIUS) + ', ' + (mainPin.offsetTop + PinSize.HEIGHT);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var filterFlats = function () {
    window.deletePins();
    window.closePopup();
    var houses = window.flats;

    houses.forEach(function (house) {
      house.rating = 0;
      if (house.offer.type === houseType.value) {
        house.rating++;
      }
      if (house.offer.rooms === rooms.value) {
        house.rating++;
      }
      if (house.offer.guests === guests.value) {
        house.rating++;
      }
    });

    houses.sort(function (a, b) {
      return a.rating > b.rating;
    });
    window.insertMapPins(houses.slice(0, PINS_AMOUNT));
  };

  var loadOffers = function () {
    var flats = window.createOffers();
    window.insertMapPins(flats.slice(0, PINS_AMOUNT));
    window.flats = flats;

    filters.addEventListener('change', filterFlats);
    mapPins.addEventListener('click', window.insertOffer);
    document.addEventListener('keydown', window.isEscPressed);
  };
})();
