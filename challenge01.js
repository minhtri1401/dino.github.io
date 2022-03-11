//Testcase
var listTestCase = [
  { param: [1, 2, 1], expected: [-1] },
  { param: [0, 2, 1], expected: [-0.5] },
  { param: [1, 0, 1], expected: [] },
  { param: [7, -2, 3], expected: [] },
  { param: [2, -7, 3], expected: [0.5, 3] },
  { param: [6, 1, -5], expected: [-1, 5 / 6] },
  { param: [1, -8, 16], expected: [4] },
  { param: [16, 24, 9], expected: [-0.75] },
  { param: [3, 5, 2], expected: [-1, -2 / 3] },
  { param: [6, 1, -5], expected: [] },
  { param: [4, -4, 1], expected: [1 / 2] },
  { param: [25, 0, -16], expected: [-4 / 5, 4 / 5] },
];

//Answer
/**
 * This function helps you solve quadratic equation Ax^2 + Bx + C
 * @param {Number} a is numerical coefficients of X^2
 * @param {Number} b is numerical coefficients of X
 * @param {Number} c is constant
 * @returns list of solutions from smallest to largest if no solution found return empty list
 */
function solveQuadraticEquation(param) {
  let a = param[0];
  let b = param[1];
  let c = param[2];

  if (a == 0) {
    // In case a = 0 this is not a quadratic equations.
    if (b == 0) {
      return [];
    } else {
      return [-c / b];
    }
  } else {
    //Find delta
    var delta = b ** 2 - 4 * a * c;

    if (delta > 0) {
      // Equation have 2 distinct solutions
      sol1 = (-b - Math.sqrt(delta)) / (2 * a);
      sol2 = (-b + Math.sqrt(delta)) / (2 * a);

      // Sort solutions from smallest to largest
      if (sol1 < sol2) return [sol1, sol2];
      else return [sol2, sol1];
    } else if (delta == 0) {
      // Equation have 1 solution
      return [-b / (2 * a)];
    } else {
      // Impossible equation
      return [];
    }
  }
}

//Set variable to popup
function setVariable(eqaParams) {
  console.log(eqaParams);
  let varA = document.getElementById("varA");
  let varB = document.getElementById("varB");
  let varC = document.getElementById("varC");

  varA.innerHTML = "A = " + eqaParams[0];
  varB.innerHTML = "B = " + eqaParams[1];
  varC.innerHTML = "C = " + eqaParams[2];
}
