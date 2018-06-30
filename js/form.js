'use strict';
(function () {
  var X0 = 570;
  var Y0 = 375;
  var MIN_GUESTS = 0;

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
  var mainPin = document.querySelector('.map__pin--main');

  window.initialStage = function (isDisabled) {
    if (isDisabled) {
      adForm.classList.add('ad-form--disabled');
      map.classList.add('.map--faded');
      document.getElementById('address').value = X0 + ', ' + Y0;
      mainPin.style.top = Y0 + 'px';
      mainPin.style.left = X0 + 'px';
    } else {
      adForm.classList.remove('ad-form--disabled');
      map.classList.remove('.map--faded');
    }

    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = isDisabled;
    }
  };

  window.openForm = function () {
    // синхронизация цены и типа жилья
    houseType.addEventListener('change', function () {
      switch (houseType.selectedIndex.value) {
        case 'bungalo':
          price.min = 0;
          break;
        case 'flat':
          price.min = 1000;
          break;
        case 'house':
          price.min = 5000;
          break;
        case 'palace':
          price.min = 10000;
          break;
      }
    });

    // синхронизация заезда
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
        rooms.setCustomValidity('Извините, число комнат должно соответствовать числу гостей');
      } else {
        rooms.setCustomValidity('');

        success.classList.remove('hidden');
        window.initialStage(true);

        document.addEventListener('click', function () {
          success.classList.add('hidden');
        });
      }
    });

    adForm.addEventListener('reset', function () {
      window.initialStage(true);
    });

  };
})();
