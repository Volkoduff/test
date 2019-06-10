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
    closeButton.addEventListener('click', function() {
      window.helpers.testSelectionPicruresShow();
    })

    closeButton.addEventListener('mouseover', function(evt) {
      var card = document.querySelector('.inner-test-wrap');
      window.helpers.scrollToPosition(0, 0)
      if (evt.target === closeButtonWrap || evt.target === closeIcon) {
        closeButtonDescription.classList.remove('fadeOutUp');
        closeButtonDescription.classList.remove('hidden');
        closeButton.addEventListener('mouseout', function() {
          hideDiscriptionOfCloseButton()
        })
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