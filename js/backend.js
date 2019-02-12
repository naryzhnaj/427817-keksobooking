'use strict';

(function () {
  var Url = {
    UPLOAD: 'https://js.dump.academy/keksobooking',
    ONLOAD: 'https://js.dump.academy/keksobooking/data'};

  // ф-ия, отправляющая данные из формы
  window.upload = function (data, onLoad, onError) {
    var request = new XMLHttpRequest();
    request.responseType = 'json';

    request.addEventListener('load', function () {
      if (request.status === 200) {
        onLoad(request.response);
      } else {
        onError('Статус ответа: ' + request.status + ' ' + request.statusText);
      }
    });

    request.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    request.open('POST', Url.UPLOAD);
    request.send(data);
  };

  // ф-ия, загружающая данные с сервера
  window.load = function (onLoad, onError) {
    var request = new XMLHttpRequest();
    request.responseType = 'json';

    request .addEventListener('load', function () {
      if (request.status === 200) {
        onLoad(request.response);
      } else {
        onError('Статус ответа: ' + request.status + ' ' + request.statusText);
      }
    });

    request.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    request.open('GET', Url.ONLOAD);
    request.send();
  };

  // показать сообщение, если есть ошибки
  window.errorMessage = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: yellow;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
})();
