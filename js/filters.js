'use strict';

(function () {
  var Prices = {
    LOW: 10000,
    HIGH: 50000};

  var price = document.getElementById('housing-price');
  var houseType = document.getElementById('housing-type');
  var guests = document.getElementById('housing-guests');
  var rooms = document.getElementById('housing-rooms');

  // фильтрация предложений
  window.filterFlats = function () {
    window.closePopup();
    window.deletePins();

    // подсчет рейтинга предложений
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

      if (((price.value === 'high') && (house.offer.price >= Prices.HIGH)) ||
       ((price.value === 'middle') && (house.offer.price > Prices.LOW) && (house.offer.price < Prices.HIGH)) ||
       ((price.value === 'low') && (house.offer.price <= Prices.LOW))) {
        house.rating++;
      }

      house.offer.features.forEach(function (feature) {
        if (document.getElementById('filter-' + feature).checked) {
          house.rating++;
        }
      });
    });

    // сортировка по рейтингу
    window.flats.sort(function (a, b) {
      return b.rating - a.rating;
    });

    // отрисовка меток
    window.insertMapPins();
  };
})();
