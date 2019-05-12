(function() {

  var similarList = document.querySelector('.list-for-templates');
  var chosenTestArray = '';
  var CARDLIMIT = 10;

  function textFromServerApplyingToCards(mainTestButtonCounter) {
    window.backEnd.downloadData(function(xhr) {
      var serverDataArray = [];
      for (var t = 0; t < xhr.length; t++) {
        serverDataArray.push(xhr[t])
      }
      cardDataAppend(serverDataArray, mainTestButtonCounter);
    })
  }

  var cardDataAppend = function(data, eventTarget) {
    generationTextForCards(data, eventTarget);
    var testCards = similarList.querySelectorAll('.test-card');

    for (var cardCounter = 0; cardCounter < testCards.length; cardCounter++) {
      var oneCard = testCards[cardCounter].classList.contains('hidden');
      var previousTestCard;
      var currentCounter;
      if (!oneCard[cardCounter] && cardCounter >= 1) {
        previousTestCard = testCards[cardCounter - 1];
        previousTestCard.classList.add('hidden');
      } else {
        cardCounter = 0;
      }
      var currentTestCard = testCards[cardCounter];
      currentCounter = cardCounter;
    }
    window.listners.addListenersToCardButtons(currentTestCard, currentCounter, testCards);
    window.functionality.selectOneAnswer(currentTestCard);
    window.closeButtonUtil.displayCloseButton();
  }

  var generationTextForCards = function(data, eventTarget) {
    var similarTestTemplate = document.querySelector('#test-card-template')
      .content.querySelector('.test-card');
    var testCard = similarTestTemplate.cloneNode(true);
    var testCardText = testCard.querySelectorAll('.inner-test-wrap_item');
    var questionNumberText = testCard.querySelector('.question-number');
    var questionText = testCard.querySelector('.inner-test-wrap_title');
    var quantityOfAppendedCards = similarList.children.length;
    questionText.textContent = getChosenTestArray(data, eventTarget).question; // подставляем вопросы из данных с сервера
    questionNumberText.textContent = 'Вопрос №' + (quantityOfAppendedCards + 1 + ' из ' + CARDLIMIT); // подставляем варианты ответа из данных с сервера
    for (var i = 0; i < testCardText.length; i++) {
      testCardText[i].textContent = getChosenTestArray(data, eventTarget).answers[i]; // подставляем варианты ответа из данных с сервераподставляем порядковый номер вопроса
    }
    similarList.appendChild(testCard);
  }

  function getChosenTestArray(data, eventTarget) {
    var quantityOfAppendedCards = similarList.children.length;
    var chosenTest = eventTarget.target.parentNode.parentNode.dataset; // dataset через eventTarget (first, second, ...)
    var chosenTestNumber = chosenTest.testNumber;
    var chosenTestName = chosenTest.testName;
    if (chosenTestName === 'space') {
      chosenTestArray = data[chosenTestNumber].space;
    } else if (chosenTestName === 'nature') {
      chosenTestArray = data[chosenTestNumber].nature;
    } else if (chosenTestName === 'common') {
      chosenTestArray = data[chosenTestNumber].common;
    }
    return chosenTestArray[quantityOfAppendedCards]
  }

  window.dataInit = {
    textFromServerApplyingToCards: textFromServerApplyingToCards,
    cardDataAppend: cardDataAppend
  }

})()