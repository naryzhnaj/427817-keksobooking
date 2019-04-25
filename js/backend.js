'use strict';

(function () {
  var Url = {
    POST: 'https://js.dump.academy/keksobooking',
    GET: 'https://js.dump.academy/keksobooking/data'};
  var SUCCESS_STATUS = 200;

  /**
   * @description отправление данных формы
   *
   * @param {String} method тип запроса
   * @param {callback} onLoad если успешно
   * @param {callback} onError если ошибки
   * @param {FormData} data данные формы
   */
  function getResponse (method, onLoad, onError, data) {
    var request = new XMLHttpRequest();
    request.responseType = 'json';

    request.addEventListener('load', function () {
      if (request.status === SUCCESS_STATUS) {
        onLoad(request.response);
      } else {
        onError('Статус ответа: ' + request.status + ' ' + request.statusText);
      }
    });

    request.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    request.open(method, Url[method]);
    request.send(data || null);
  };

  /**
   * @description отправление данных формы
   *
   * @param {FormData} data данные формы
   * @param {callback} onLoad если успешно
   * @param {callback} onError если ошибки
   */
  var upload = function (data, onLoad, onError) {
    getResponse('POST', onLoad, onError, data);
  };

  /**
   * @description загрузка данных с сервера
   *
   * @param {callback} onLoad если успешно
   * @param {callback} onError если ошибки
   */
  var load = function (onLoad, onError) {
    getResponse('GET', onLoad, onError);
  };

  /**
   * @description показать сообщение, если есть ошибки
   *
   * @param {String} errorMessage текст сообщения
   */
  var errorMessage = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: yellow;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.errorMessage = errorMessage;
  window.load = load;
  window.upload = upload;
})();
