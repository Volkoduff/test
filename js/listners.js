(function() {
  var similarList = document.querySelector('.list-for-templates');
  var warnings = {
    pressNextButtonAdvice: 'Это пока что последний вопрос, нажмите кнопку "Перейти к следующему вопросу" для продолжения теста',
    pressFinishButtonAdvice: 'Когда вы ответите на все вопросы появится кнопка "Завершить тест"',
    firstCardWarning: 'Это самый первый вопрос'
  }
  addListnersToMainTestButtons(similarList);

  function addListnersToMainTestButtons() {
    var beginTestButton = document.querySelectorAll('.test-wrap');
    for (var mainTestButtonCounter = 0; mainTestButtonCounter < beginTestButton.length; mainTestButtonCounter++) {
      beginTestButton[mainTestButtonCounter].addEventListener('click', window.testCheck.appendCardByClick);
    }
  }

  function addListenersToCardButtons(currentTestCard, currentCounter, testCards, ) {
    addListnerToNextQuestionButton(currentTestCard);
    addListnerToBackButton(currentTestCard, currentCounter, testCards);
    addListnerToNextButton(currentTestCard, currentCounter, testCards);
  }

  function addListnerToNextQuestionButton(currentTestCard) {
    var nextQuestionButton = currentTestCard.querySelector('.next-qiestion-btn');
    nextQuestionButton.addEventListener('click', window.testCheck.appendCardByClick);
  }

  function addListnerToBackButton(currentTestCard, currentCounter, testCards) {
    var backButton = currentTestCard.querySelector('.back-btn');
    backButton.addEventListener('click', function() {
      if (currentCounter >= 1) {
        testCards[currentCounter].classList.add('hidden');
        currentTestCard = testCards[currentCounter].previousElementSibling.classList.remove('hidden');
      } else {
        alert(warnings.firstCardWarning);
      }
    });
  }

  function addListnerToNextButton(currentTestCard, currentCounter, testCards) {
    var forwardButton = currentTestCard.querySelector('.next-btn');
    forwardButton.addEventListener('click', function() {
      if (currentCounter < testCards.length && testCards[currentCounter].nextElementSibling !== null) {
        testCards[currentCounter].classList.add('hidden');
        testCards[currentCounter].nextElementSibling.classList.remove('hidden');
      } else {
        alert(warnings.pressNextButtonAdvice);
      }
    });
  }





  window.listners = {
    addListenersToCardButtons: addListenersToCardButtons,
    warnings: warnings
  }

})()

// ПЕРЕДАЧА ПЕРЕМЕННЫХ С ФУНКЦИЕЙ КОЛЛБЭКОМ
// глобальная переменная
// var generalLastName = 'Elison';

// function getInput(options, callback) { 
//     allUserData.push(options);
//     callback(generalLastName, options);
// }