'use strict';
(function () {
  var MIN_GUESTS = 0;
  var PINS_AMOUNT = 5;
  var StartPoint = {
    X: 570,
    Y: 375};
  var FlatPrices = {'flat': 1000, 'house': 5000, 'bungalo': 0, 'palace': 10000};

  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.getElementsByTagName('fieldset');
  var rooms = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  var timein = document.getElementById('timein');
  var timeout = document.getElementById('timeout');
  var houseType = document.getElementById('type');
  var price = document.getElementById('price');
  var success = document.querySelector('.success');
  var mapPin = document.querySelector('.map__pin--main');

  // Переключение состояний карты
  window.activateMap = function (isDisabled) {
    if (isDisabled) {
      adForm.classList.add('ad-form--disabled');
      map.classList.add('map--faded');
      window.activeStage = false;

      document.getElementById('address').value = StartPoint.X + ', ' + StartPoint.Y;
      mapPin.style.top = StartPoint.Y + 'px';
      mapPin.style.left = StartPoint.X + 'px';
    } else {
      adForm.classList.remove('ad-form--disabled');
      map.classList.remove('map--faded');
      openForm();
    }

    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = isDisabled;
    }
  };

  var openForm = function () {
    houseType.addEventListener('change', function () {
      price.min = FlatPrices[houseType.value];
      price.placeholder = FlatPrices[houseType.value];
    });

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
        rooms.validity.valid = false;
        rooms.validity.customError = true;
        rooms.setCustomValidity('Извините, число комнат должно соответствовать числу гостей');
      } else {
        window.upload(new FormData(adForm), function () {
          success.classList.remove('hidden');
          adForm.reset();

          document.addEventListener('click', closeSuccess);
        }, window.errorMessage);
      }
    });

    adForm.addEventListener('reset', function () {
      window.initialStage(true);
      delPins();

      var popup = map.querySelector('.popup');
      if (popup) {
        map.removeChild(popup);
      }
    });
  };

  var delPins = function () {
    if (mapPins.children.length > PINS_AMOUNT) {
      for (var i = 0; i < PINS_AMOUNT; i++) {
        mapPins.removeChild(mapPins.lastChild);
      }
    }
  };

  var closeSuccess = function () {
    success.classList.add('hidden');
    document.removeEventListener('click', closeSuccess);
  };
})();
