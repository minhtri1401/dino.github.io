function getRamdomTestcase(testcase) {
  // Find a random case in testcase
  let randomCaseIdx = Math.floor(Math.random() * listTestCase.length);
  testcase.param = listTestCase[randomCaseIdx].param;
  testcase.expected = listTestCase[randomCaseIdx].expected;
}

function bindEvent() {
  flag = true;
  let testcase = { param: [], expected: [] };

  getRamdomTestcase(testcase);
  //Pause the game to show a popup
  scene.scene.pause();
  setVariable(testcase.param);

  showPopup();

  //Add event for the solve button
  var solvedBtn = document.getElementById("solvedBtn");
  solvedBtn.onclick = function () {
    if (isCorrectAnswer(testcase.param, testcase.expected)) {
      // If the answer is correct continue the game
      scene.scene.resume();
    } else {
      // Else game over
      scene.scene.resume();
      onGameOver();
    }
    closePopup();
  };
}

function showPopup() {
  var modal = document.getElementById("myModal");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  // When the user clicks on <span> (x), close the modal\

  modal.style.display = "block";

  span.onclick = function () {
    modal.style.display = "none";
    onGameOver();
    scene.scene.resume();
  };
}

function closePopup() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

/**
 * This function check if your answer is correct
 * @param  param is list numerical coefficients
 * @param  result is list solutions
 * @returns the correctness of the answer
 */
function isCorrectAnswer(param, result) {
  var calResult = solveChallenge(param);

  // Compare the result of your anwser with result in testcase
  var isCorrect =
    calResult.length === result.length &&
    calResult.slice().sort().every(function (value, index) {
      return value === result[index];
    });
  if (isCorrect) return true;
  else return false;
}
