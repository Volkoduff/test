(function() {
  var similarList = document.querySelector('.list-for-templates');
  var CARDLIMIT = 2; // Количество вопросов в тесте

  function checkAmountOfCards(finalAmount, finalCounOfCorrectAnswers) {
    if (finalAmount === CARDLIMIT) {
      var finishButton = document.querySelector('.finish-test-btn');
      var results = document.querySelector('.results');
      finishButton.classList.remove('hidden');
      finishButton.addEventListener('click', function() {
        results.classList.remove('hidden');
        // results.children[1].textContent = 'Правильныx ответов: ' + finalCounOfCorrectAnswers;
      });
      addListnerClosingTheTest(results, finishButton);
    }
  }

  function addListnerClosingTheTest(results, finishButton) {
    var closeButton = document.querySelector('.close-button');
    var confirmButton = document.querySelector('.confirm-btn');
    confirmButton.addEventListener('click', function() {
      var allAppends = similarList;
      allAppends.innerHTML = '';
      results.classList.add('hidden');
      finishButton.classList.add('hidden');
      closeButton.classList.add('hidden');
    });
  }

  function counterOfAnsweredAnsweres() {
    var finalAmount = 0;
    var finalCounOfCorrectAnswers = 0;
    for (var k = 0; k < similarList.children.length; k++) {
      var similarListCard = similarList.children[k].querySelector('.inner-test-wrap');
      if (similarListCard !== null) {

        // Подсчет отвеченных вопросов
        for (var i = 0; i < similarListCard.children.length; i++) {
          if (similarListCard.children[i].classList.contains('selected')) {
            var quantityOfAnsweredAnswers = 0;
            quantityOfAnsweredAnswers++;
            break;
          } else {
            quantityOfAnsweredAnswers = 0;
          }
        }
        finalAmount += quantityOfAnsweredAnswers;

        // Подсчет правильных вопросов по маркеру "chosen-correct-answer"
        for (var t = 0; t < similarListCard.children.length; t++) {
          if (similarListCard.children[t].classList.contains('chosen-correct-answer')) {
            var quantityOfCorrectAnswers = 0;
            quantityOfCorrectAnswers++;
            break;
          } else {
            quantityOfCorrectAnswers = 0;
          }
        }
      }
      finalCounOfCorrectAnswers += quantityOfCorrectAnswers;
    }
    checkAmountOfCards(finalAmount, finalCounOfCorrectAnswers);
  }

  function appendCardByClick(eventTarget) {
    var allTestCards = similarList.querySelectorAll('.test-card');
    if (allTestCards.length + 1 <= CARDLIMIT) {
      window.dataInit.textFromServerApplyingToCards(eventTarget)
    } else {
      alert(window.listners.warnings.pressFinishButtonAdvice);
    }
  }

  similarList.addEventListener('click', counterOfAnsweredAnsweres);

  window.testCheck = {
    appendCardByClick: appendCardByClick,
    addListnerClosingTheTest: addListnerClosingTheTest
  }

})()