(function() {

  addHandlerToMainTestButtons();

  addHandlerToShowFinalAdvise()

  function addHandlerToMainTestButtons() {
    var beginTestButton = document.querySelectorAll('.test-wrap');
    for (var i = 0; i < beginTestButton.length; i++) {
      beginTestButton[i].addEventListener('click', window.testCheck.appendCardByClick);
      beginTestButton[i].addEventListener('click', function() {
        window.helpers.testSelectionPicruresHide();
      })
    }
  }

  function addHandlerToShowFinalAdvise() {
    document.addEventListener('click', window.testCheck.showFinalAdvise);
  }

  function addHandlersToCardButtons(card, iterator, cards) {
    addHandlerToNextQuestionButton(card);
    addHandlerToBackButton(card, iterator, cards);
    addHandlerToNextButton(card, iterator, cards);
    addHandlerToAnswerChoices(card);
  }

  function addHandlerToAnswerChoices(card) {
    card.addEventListener('click', window.testCheck.getNumberOfAnsweredAnswers);
    card.addEventListener('click', window.testCheck.ifTestIsDoneDisplayFinishButton);

  }

  function addHandlerToNextQuestionButton(card) {
    var nextQuestionButton = card.querySelector('.btn__next-question');
    nextQuestionButton.addEventListener('click', window.testCheck.appendCardByClick);
  }

  function addHandlerToBackButton(card, iterator, cards) {
    var backButton = card.querySelector('.back-btn');
    backButton.addEventListener('click', function() {
      if (iterator >= 1) {
        cards[iterator].classList.add('hidden');
        card = cards[iterator].previousElementSibling.classList.remove('hidden');
      } else {
        backButton.disabled = true;
      }
    });
  }

  function addHandlerToNextButton(card, iterator, cards) {
    var forwardButton = card.querySelector('.next-btn');
    forwardButton.addEventListener('click', function() {
      if (iterator < cards.length && cards[iterator].nextElementSibling !== null) {
        cards[iterator].classList.add('hidden');
        cards[iterator].nextElementSibling.classList.remove('hidden');
      } else if (iterator + 1 === cards.length) {
        forwardButton.disabled = true;
      }
    });
  }

  window.listners = {
    addHandlersToCardButtons: addHandlersToCardButtons,
  }

})()