(function() {
  var footer = document.querySelector('.footer');
  var testSelectionPicrures = document.querySelector('.test-body');

  function scrollToPosition(xCoordinate, yCoordinate) {
    window.scrollTo(xCoordinate, yCoordinate);
  }

  var footerHide = function() {
    if (!footer.classList.contains('hidden')) {
      footer.classList.add('hidden');
    }
  }

  var footerShow = function() {
    if (footer.classList.contains('hidden')) {
      footer.classList.remove('hidden');
    }
  }
  var testSelectionPicruresHide = function() {
    testSelectionPicrures.classList.add('hidden');
  }
  var testSelectionPicruresShow = function() {
    if (testSelectionPicrures.classList.contains('hidden')) {
      testSelectionPicrures.classList.remove('hidden');
    }
  }

  function randomInteger(min, max) {
      var random = min - 0.5 + Math.random() * (max - min + 1)
      random = Math.round(random);
      return random;
    }

  window.helpers = {
    scrollToPosition: scrollToPosition,
    footerHide: footerHide,
    footerShow: footerShow,
    testSelectionPicruresHide: testSelectionPicruresHide,
    testSelectionPicruresShow: testSelectionPicruresShow,
    randomInteger: randomInteger
  }
})()