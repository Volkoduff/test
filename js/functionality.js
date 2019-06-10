(function() {

  // один вариант ответа для текущей карточки вопроса
  function addHandlerForOneAnswerSelection(currentTestCard) {
    var cardItemsList = currentTestCard.querySelectorAll('.inner-test-wrap_item');
    for (var testItemsCounter = 0; testItemsCounter < cardItemsList.length; testItemsCounter++) {
      cardItemsList[testItemsCounter].addEventListener('click', function(evt) {

        if (isAnswered(cardItemsList)) {
          unSelectButton(cardItemsList);
          selectButton(evt);
        } else {
          selectButton(evt);
        }

      });
    }
  }

  function selectButton(clickedButton) {
     clickedButton.target.classList.add('selected');
  }

  function isAnswered(listOfAnswers) {
    for (var h = 0; h < listOfAnswers.length; h++) {
      var selectedAnswer = listOfAnswers[h].classList.contains('selected');
      if (selectedAnswer) {
        return true;
      } 
    }
  }

  function unSelectButton(listOfAnswers) {
    for (var h = 0; h < listOfAnswers.length; h++) {
      listOfAnswers[h].classList.remove('selected');;
    }
  }

  window.functionality = {
    addHandlerForOneAnswerSelection: addHandlerForOneAnswerSelection
  }

})()