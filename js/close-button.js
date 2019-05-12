(function() {

  function displayCloseButton() {
    var closeButton = document.querySelector('.close-button');
    var closeButtonDescription = document.querySelector('.close-button_description');
    var closeButtonWrap = document.querySelector('.close-button_wrap');
    var closeIcon = document.querySelector('.fa-window-close');
    closeButton.classList.remove('hidden');

    closeButton.addEventListener('click', function() {
      var similarList = document.querySelector('.list-for-templates');
      var allAppends = similarList;
      allAppends.innerHTML = '';
      closeButton.classList.add('hidden');
    });

    closeButton.addEventListener('mouseover', function(evt) {
      var card = document.querySelector('.inner-test-wrap');
      if (evt.target === closeButtonWrap || evt.target === closeIcon) {
        closeButtonDescription.classList.remove('fadeOutUp');
        closeButtonDescription.classList.remove('hidden');
        closeButton.addEventListener('mouseout', hideDiscriptionOfCloseButton())
      }

      function hideDiscriptionOfCloseButton() {
        if (evt.target === closeButtonWrap || evt.target === closeIcon) {
          closeButtonDescription.classList.remove('fadeInDown');
          setTimeout(function() {
            closeButtonDescription.classList.add('fadeOutUp');
          }, 1500);
        }
      }

    })
  }



  window.closeButtonUtil = {
    displayCloseButton: displayCloseButton
  }
})();