'use strict';

(function() {

  var downloadData = function(onLoad) {
    var xhr = new XMLHttpRequest()
    var URL = 'http://test.kovalhall.ru/data-new.json';
    xhr.responseType = 'json';

    xhr.addEventListener('load', function(evt) {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    })
    xhr.open('GET', URL);
    xhr.send();

  }

  window.backEnd = {
    downloadData: downloadData
  }

})()
