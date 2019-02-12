'use strict';

(function () {
  // кол-во отображаемых меток
  var PINS_AMOUNT = 5;
  // размеры метки
  var Pin = {
    IMAGE_RADIUS: 20,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70};

  var mapPins = document.querySelector('.map__pins');

  /**
   * @description создать одну метку
   *
   * @param {Object} house объявление
   *
   * @return {DOM-элемент} newPin метка на карте
   */
  var createOnePin = function (house) {
    var newPin = document.createElement('button');
    newPin.className = 'map__pin';
    newPin.alt = house.offer.title;
    newPin.style.left = house.location.x - Pin.PIN_WIDTH / 2 + 'px';
    newPin.style.top = house.location.y - Pin.PIN_HEIGHT + 'px';

    var newPinImg = document.createElement('img');
    newPinImg.width = 2 * Pin.IMAGE_RADIUS;
    newPinImg.height = 2 * Pin.IMAGE_RADIUS;
    newPinImg.src = house.author.avatar;
    newPinImg.draggable = 'false';

    newPin.appendChild(newPinImg);

    return newPin;
  };

  /**
   * @description создать метки для всех объявлений
   */
  window.insertMapPins = function () {
    window.flats.slice(0, PINS_AMOUNT).forEach(function (house, i) {
      var pin = createOnePin(house);
      pin.setAttribute('data-number', i);
      mapPins.appendChild(pin);
    });
  };

  /**
   * @description удалить с карты все метки объявлений
  */
  window.deletePins = function () {
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };
})();
