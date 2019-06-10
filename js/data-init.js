(function() {

  var cardDataAppend = function(data, eventTarget) {
    var similarList = document.querySelector('.list-for-templates');
    scrollToTop();
    appendingOfCards(data, eventTarget, similarList);
    var testCards = similarList.querySelectorAll('.test-card');
    var currentTestCard = replaceCards(testCards);
    window.functionality.addHandlerForOneAnswerSelection(currentTestCard);
    window.closeButtonUtil.displayCloseButton();
  }

  var appendingOfCards = function(data, eventTarget, templatesList) {
    var similarTestTemplate = document.querySelector('#test-card-template')
      .content.querySelector('.test-card');
    var testCard = similarTestTemplate.cloneNode(true);
    insertQuestionText(testCard, data, eventTarget);
    window.testCheck.insertCurrentIndexNumberOfCard(testCard);
    insertAnswerChoises(testCard, data, eventTarget);
    templatesList.appendChild(testCard);
  }

  function textFromServerApplyingToCards(mainTestButtonCounter) {
    window.backEnd.downloadData(function(xhr) {
      var serverDataArray = [];
      for (var t = 0; t < xhr.length; t++) {
        serverDataArray.push(xhr[t])
      }
      cardDataAppend(serverDataArray, mainTestButtonCounter);
    })
  }

  function insertAnswerChoises(currentCard, dataArray, openedTest) {
    var testCardText = currentCard.querySelectorAll('.inner-test-wrap_item');
    for (var i = 0; i < testCardText.length; i++) {
      // подставляем варианты ответа из серверных данных
      testCardText[i].textContent = getTestArrayDataOfChosenCard(dataArray, openedTest).answers[i];
    }
  }

  function insertQuestionText(currentCard, dataArray, openedTest) {
    var questionText = currentCard.querySelector('.inner-test-wrap_title');
    questionText.textContent = getTestArrayDataOfChosenCard(dataArray, openedTest).question;
  }

  function getTestArrayDataOfChosenCard(dataArray, openedTest) {
    var similarList = document.querySelector('.list-for-templates');
    var indexOfCurrendCard = similarList.children.length;
    // dataset через eventTarget (space, nature, common)
    chosenTest = selectorCheck(openedTest).dataset
    var chosenTestNumber = chosenTest.testNumber;
    var chosenTestName = chosenTest.testName;
    if (chosenTestName === 'space') {
      requiredDataSet = dataArray[chosenTestNumber].space;
    } else if (chosenTestName === 'nature') {
      requiredDataSet = dataArray[chosenTestNumber].nature;
    } else if (chosenTestName === 'common') {
      requiredDataSet = dataArray[chosenTestNumber].common;
    }
    return requiredDataSet[indexOfCurrendCard]
  }

  function replaceCards(cards) {
    for (var cardCounter = 0; cardCounter < cards.length; cardCounter++) {
      var oneCard = cards[cardCounter].classList.contains('hidden');
      if (!oneCard[cardCounter] && cardCounter >= 1) {
        var previousTestCard = cards[cardCounter - 1];
        previousTestCard.classList.add('hidden');
      } else {
        cardCounter = 0;
      }
      var currentCard = cards[cardCounter];
      var currentCounter = cardCounter;
    }
    window.listners.addHandlersToCardButtons(currentCard, currentCounter, cards);
    return currentCard;
  }

  function insertQuantityOfQuerstionsNeedToFinish(currentCard) {
    var answeresToAnswer = currentCard.querySelector('.question-answered');
    answeresToAnswer.textContent =
      'Вы ответили на ' + window.testCheck.counterOfAnsweredAnsweres() + ' вопросов';
  }



  function selectorCheck(openedTest) {
    var foundSelector;
    var arrayOfClickedTestSelectors = openedTest.path;
    if (!openedTest.srcElement.classList.contains('btn__next-question')) {
      for (var i = 0; i < arrayOfClickedTestSelectors.length; i++) {
        var neededSelector = arrayOfClickedTestSelectors[i].classList.contains('test-wrap');
        if (neededSelector) {
          foundSelector = arrayOfClickedTestSelectors[i];
          break;
        }
      }
    } else {
      foundSelector = arrayOfClickedTestSelectors[0];
    }
    return foundSelector;
  }

  function scrollToTop() {
    window.helpers.scrollToPosition(0, 0);
  }

  window.dataInit = {
    textFromServerApplyingToCards: textFromServerApplyingToCards,
    cardDataAppend: cardDataAppend
  }

})()