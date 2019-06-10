(function() {

  var displayMarker = {
    isFinishButtonDisplayed: false
  }
  var CARD_LIMIT = 6; // Количество вопросов в тесте
  var FINISH_BUTTON_ADVICE = 
  'Все вопросы сгенерированы, ответьте на все для того чтобы закончить тест';
  var FINISH_ADVICE = 
  'Поздравляем, Вы ответили на все вопросы, варианты ответов еще можно изменить, когда будете готовы закончить нажмите кнопку завершить';
  var similarList = document.querySelector('.list-for-templates');

  function displayFinishButton() {
    var finishButton = document.querySelector('.finish-test-btn');
    var results = document.querySelector('.results');
    var answers = document.querySelector('.correct-answers-number');
    var closeButton = document.querySelector('.close-button');
    closeButton.classList.add('hidden');
    finishButton.classList.remove('hidden');
    answers.textContent =  getTextOfCorrectAnswers();

    finishButton.addEventListener('click', function() {
      results.classList.remove('hidden');
    });
    displayMarker.isFinishButtonDisplayed = true;
    addHandlerClosingTheTest(results, finishButton);
  }

  function showFinalAdvise() {
    if (displayMarker.isFinishButtonDisplayed && displayMarker.isFinishButtonDisplayed === true) {
   window.modal.displayModalAdvise(FINISH_ADVICE);
   displayMarker.isFinishButtonDisplayed = false;
   document.removeEventListener('click', showFinalAdvise);
 }
}

  function getTextOfCorrectAnswers() {
    var answers = getNumberOfMockAnswers(0, CARD_LIMIT);
    var textOfAnswer = ''
     if (answers == 0) {
        textOfAnswer = 'К сожалению, нет ни одного правильного ответа';
     } else if(answers == 1){
        textOfAnswer = answers + ' правильный ответ';
     } else if(answers >= 5){
        textOfAnswer = answers + ' правильных ответов';
     } else {
        textOfAnswer = answers + ' правильных ответа';
     }
     return textOfAnswer;
  }

  function getNumberOfMockAnswers(min, max) {
    var numberOfAnswers = window.helpers.randomInteger(min, max);
    return numberOfAnswers;
  }
    
  function addHandlerClosingTheTest(windowWhithResults, button) {
    var closeButton = document.querySelector('.close-button');
    var confirmButton = document.querySelector('.confirm-btn');
    confirmButton.addEventListener('click', function() {
      var allAppends = similarList;
      allAppends.innerHTML = '';
      windowWhithResults.classList.add('hidden');
      button.classList.add('hidden');
      closeButton.classList.add('hidden');
      window.helpers.testSelectionPicruresShow()
    });
  }

  function appendCardByClick(eventTarget) {
    var lengthOfAllAppendedCards = similarList.querySelectorAll('.test-card').length;
    if (lengthOfAllAppendedCards < CARD_LIMIT) {
      window.dataInit.textFromServerApplyingToCards(eventTarget);
    } 
    else if (displayMarker.isFinishButtonDisplayed){
      var buttonGeneratingNextCards = document.querySelectorAll('.btn__next-question');
      for (var i = 0; i < buttonGeneratingNextCards.length; i++) {
        buttonGeneratingNextCards[i].disabled = true;
      }
    } else {
      window.modal.displayModalAdvise(FINISH_BUTTON_ADVICE);
    }
  }

  function ifTestIsDoneDisplayFinishButton() {
    var currentAnsweredQuestions = getNumberOfAnsweredAnswers()
    if (currentAnsweredQuestions === CARD_LIMIT) {
      displayFinishButton(currentAnsweredQuestions)
      removeEventListener('click', ifTestIsDoneDisplayFinishButton)
    }

  }

  function getNumberOfAnsweredAnswers() {
    var quantytyOfAnsweredAnswers = 0;
    for (var k = 0; k < similarList.children.length; k++) {
      var similarListCard = similarList.children[k].querySelector('.inner-test-wrap');
      if (similarListCard !== null) {
        quantytyOfAnsweredAnswers += incrementOfAnsweredAnswers(similarListCard);
      }
    }
    return quantytyOfAnsweredAnswers;
  }
  function incrementOfAnsweredAnswers(appendedCard) {
    var answersFromAppendedCard = appendedCard.querySelectorAll('.inner-test-wrap_item');
    var counterForCurrentCard = 0;
    for (var i = 0; i < answersFromAppendedCard.length; i++) {
      if (answersFromAppendedCard[i].classList.contains('selected')) {
        counterForCurrentCard++;
        break;
      } 
    }
    return counterForCurrentCard;
  }


  function insertCurrentIndexNumberOfCard(card) {
    var questionNumberText = card.querySelector('.question-number');
    var quantityOfAppendedCards = similarList.children.length;
    questionNumberText.textContent = 'Вопрос №' + (quantityOfAppendedCards + 1 + ' из ' + CARD_LIMIT);
  }

  window.testCheck = {
    appendCardByClick: appendCardByClick,
    getNumberOfAnsweredAnswers: getNumberOfAnsweredAnswers,
    ifTestIsDoneDisplayFinishButton: ifTestIsDoneDisplayFinishButton,
    insertCurrentIndexNumberOfCard: insertCurrentIndexNumberOfCard,
    displayMarker: displayMarker,
    showFinalAdvise: showFinalAdvise
  }

})()