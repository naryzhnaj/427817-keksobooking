'use strict';

(function () {
  // допустимые типы изображений
  var FILE_TYPE_REGEXP = /\.(gif|jpg|jpeg|png)$/i;

  // фото автора
  var avatar = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  // фото квартиры
  var images = document.querySelector('#images');
  var imagesContainer = document.querySelector('.ad-form__photo-container');

  avatar.addEventListener('change', function () {
    var newAvatar = avatar.files[0];
    if (isFileMatch(newAvatar.name)) {
      loadFiles(newAvatar, avatarPreview);
    }
  });

  images.addEventListener('change', function () {
    var photos = Array.from(images.files);
    photos.forEach(function (file) {
      if (isFileMatch(file.name)) {
        loadFiles(file, addPhotos());
      }
    });
  });

  /**
   * @description загрузить миниатюры
   *
   * @param {FileList} file картинка для вставки
   * @param {DOM-элемент} preview блок для вставки
   */
  var loadFiles = function (file, preview) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  /**
   * @description проверка типа файла
   *
   * @param {String} fileName имя файла
   *
   * @return {Boolean}
   */
  var isFileMatch = function (fileName) {
    return FILE_TYPE_REGEXP.test(fileName);
  };

  /**
   * @description создание контейнера для картинки
   *
   * @return {DOM-элемент} newImage контейнер
   */
  var addPhotos = function () {
    var newPhoto = document.createElement('div');
    newPhoto.classList.add('ad-form__photo');
    var newImage = document.createElement('img');
    newImage.width = 70;
    newImage.height = 70;
    newPhoto.appendChild(newImage);
    imagesContainer.appendChild(newPhoto);

    return newImage;
  };
})();
