'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  // размеры главной метки
  var PinSize = {
    RADIUS: 25,
    HEIGHT: 70};
    // границы для главной метки
  var Range = {
    MIN_X: -PinSize.RADIUS,
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

  var MAX_X = map.clientWidth - PinSize.RADIUS;
  var lastTimeout;

  // перевод в первоначальное состояние
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
        window.load(loadOffers, window.errorMessage);

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

  // фильтрация предложений
  var filterFlats = function () {
    window.closePopup();
    window.deletePins();
    window.flats.forEach(function (house) {
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

      if (((price.value === 'high') && (house.offer.price >= 50000)) ||
       ((price.value === 'middle') && (house.offer.price > 10000) && (house.offer.price < 50000)) ||
       ((price.value === 'low') && (house.offer.price <= 10000))) {
        house.rating++;
      }

      house.offer.features.forEach(function (feature) {
        if (document.getElementById('filter-' + feature).checked) {
          house.rating++;
        }
      });
    });

    window.flats.sort(function (a, b) {
      return b.rating - a.rating;
    });

    window.insertMapPins();
  };

  mapPins.addEventListener('click', function (evt) {
    evt.stopPropagation();
    var target = evt.target;
    if (target.className === 'map__pin') {
      window.insertOffer(target.getAttribute('data-number'));

      var activePin = mapPins.querySelector('.map__pin--active');
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
      target.classList.add('map__pin--active');
    }
  });

  // загрузка и отрисовка меток
  var loadOffers = function (flats) {
    window.flats = flats;
    window.insertMapPins();

    filters.addEventListener('change', function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        filterFlats();
      }, DEBOUNCE_INTERVAL);
    });
  };
})();
