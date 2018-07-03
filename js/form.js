'use strict';
(function () {
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

  window.initialStage = function (isDisabled) {
    if (isDisabled) {
      adForm.classList.add('ad-form--disabled');
      map.classList.add('map--faded');
      window.activeStage = false;
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
        adForm.reset();

        document.addEventListener('click', closeSuccess);
      }
    });

    adForm.addEventListener('reset', function () {
      window.initialStage(true);
    });
  };

  var closeSuccess = function () {
    success.classList.add('hidden');
    document.removeEventListener('click', closeSuccess);
  };
})();
