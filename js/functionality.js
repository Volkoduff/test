(function() {

  // один вариант ответа для текущей карточки вопроса
  function selectOneAnswer(currentTestCard) {
    var cardItemsList = currentTestCard.querySelectorAll('.inner-test-wrap_item');
    var correctAnswer = false;
    for (var testItemsCounter = 0; testItemsCounter < cardItemsList.length; testItemsCounter++) {
      cardItemsList[testItemsCounter].addEventListener('click', function(evt) {
        if (!getCheckResultIfOfSelectedAnswer(cardItemsList, correctAnswer)) {
          evt.target.classList.add('selected');
          if (evt.target.classList.contains('correct')) {
            evt.target.classList.add('chosen-correct-answer');
          }
        } else if (evt.target.classList.contains('selected')) {
          evt.target.classList.remove('selected');
          if (evt.target.classList.contains('correct')) {
            evt.target.classList.remove('chosen-correct-answer');
          }
        }
      });
    }
  }

  // проверка на то, выбран ли ответ, если ничего не выбрано - дает поставить класс 'selected'
  function getCheckResultIfOfSelectedAnswer(cardItemsList) {
    for (var h = 0; h < cardItemsList.length; h++) {
      var checkForSelectItem = cardItemsList[h].classList.contains('selected');
      if (checkForSelectItem) {
        break;
      }
    }
    return checkForSelectItem;
  }

  window.functionality = {
    selectOneAnswer: selectOneAnswer
  }

})()