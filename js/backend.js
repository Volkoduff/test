'use strict';

(function() {

  var downloadData = function(onLoad) {
    var xhr = new XMLHttpRequest()
    // var URL = 'http://data.dump.kovalhall.ru/data.json'; // 1 тест
    var URL = 'http://data.dump.kovalhall.ru/data-new.json'; // 3 теста
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
