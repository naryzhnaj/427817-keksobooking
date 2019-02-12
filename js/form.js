'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var StartPoint = {
    X: 570,
    Y: 375};

  var MIN_GUESTS = 0;
  var FlatPrices = {
    'flat': 1000,
    'house': 5000,
    'bungalo': 0,
    'palace': 10000};

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.getElementsByTagName('fieldset');
  var success = document.querySelector('.success');
  var mapPin = document.querySelector('.map__pin--main');

  var rooms = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  var timein = document.getElementById('timein');
  var timeout = document.getElementById('timeout');
  var houseType = document.getElementById('type');
  var price = document.getElementById('price');

  // проверка вместительности дома
  var checkCapacity = function () {
    if (!isCapacityEnough()) {
      capacity.setCustomValidity('Извините, число комнат должно соответствовать числу гостей');
    } else {
      rooms.setCustomValidity('');
      capacity.setCustomValidity('');
    }
  };

  // достаточно ли гостям комнат
  var isCapacityEnough = function () {
    var selectedRooms = rooms.value;
    var guests = capacity.value;

    return (((selectedRooms >= guests) && (guests > 0)) || ((guests === MIN_GUESTS) && (selectedRooms === MIN_GUESTS)));
  };

  // закрыть сообщение об успешной отправке
  var closeSuccess = function () {
    success.classList.add('hidden');
    adForm.reset();
    document.removeEventListener('click', closeSuccess);
  };

  /**
     * @description обработка нажатия Esc
     *
     * @param {event} evt
     *
   */
  window.isEscPressed = function (evt) {
    if (evt.keyCode !== ESC_KEYCODE) {
      return;
    }

    if (success.className === 'success') {
      closeSuccess();
    }

    window.closePopup();
  };

  /**
     * @description Переключение состояний карты, блокировка/разблокировка формы
     *
     * @param {bool} isDisabled состояние формы и карты
     *
     */
  window.changeStage = function (isDisabled) {
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
      document.addEventListener('keydown', window.isEscPressed);
    }

    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = isDisabled;
    }
  };

  houseType.addEventListener('change', function () {
    price.min = FlatPrices[houseType.value];
    price.placeholder = FlatPrices[houseType.value];
  });

  price.addEventListener('change', function () {
    price.min = FlatPrices[houseType.value];
  });

  timein.addEventListener('change', function () {
    timeout.selectedIndex = timein.selectedIndex;
  });

  timeout.addEventListener('change', function () {
    timein.selectedIndex = timeout.selectedIndex;
  });

  rooms.addEventListener('change', checkCapacity);

  capacity.addEventListener('change', checkCapacity);

  // отправляем данные формы
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.upload(new FormData(adForm), function () {
      success.classList.remove('hidden');
      document.addEventListener('click', closeSuccess);
    }, window.errorMessage);
  });

  // очистка формы и карты
  adForm.addEventListener('reset', function () {
    window.changeStage(true);
    document.removeEventListener('keydown', window.isEscPressed);
    window.closePopup();
    window.deletePins();
  });
})();
