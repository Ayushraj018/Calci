// Degree ↔ Radian
export const toRadians = (deg) => (deg * Math.PI) / 180;

// Convert scientific expression to JavaScript
export const prepareExpression = (expression, angleMode) => {
  let exp = expression;

 // Operators
exp = exp.replace(/×/g, "*");
exp = exp.replace(/÷/g, "/");

// Implicit multiplication
exp = exp
  .replace(/(\d)(π)/g, "$1*π")
  .replace(/(π)(\d)/g, "π*$2")
  .replace(/(\d)(e)/g, "$1*e")
  .replace(/(e)(\d)/g, "e*$2")
  .replace(/(\d)\(/g, "$1*(")
  .replace(/\)(\d)/g, ")*$1")
  .replace(/\)\(/g, ")*(");

// Constants
exp = exp.replace(/π/g, Math.PI);
exp = exp.replace(/\be\b/g, Math.E);

  // Power (^)
  exp = exp.replace(/(\d+(\.\d+)?)\^(\d+(\.\d+)?)/g, "Math.pow($1,$3)");

  // Square root
  exp = exp.replace(/√\(/g, "Math.sqrt(");

  // Log base 10
  exp = exp.replace(/log\(/g, "Math.log10(");

  // Natural log
  exp = exp.replace(/ln\(/g, "Math.log(");

  // Trigonometric functions
  if (angleMode === "DEG") {
    exp = exp.replace(/sin\((.*?)\)/g, "Math.sin(($1)*Math.PI/180)");
    exp = exp.replace(/cos\((.*?)\)/g, "Math.cos(($1)*Math.PI/180)");
    exp = exp.replace(/tan\((.*?)\)/g, "Math.tan(($1)*Math.PI/180)");
  } else {
    exp = exp.replace(/sin\(/g, "Math.sin(");
    exp = exp.replace(/cos\(/g, "Math.cos(");
    exp = exp.replace(/tan\(/g, "Math.tan(");
  }

  return exp;
};

// Evaluate
export const calculate = (expression, angleMode) => {
  try {
    const exp = prepareExpression(expression, angleMode);
    const result = Function('"use strict"; return (' + exp + ")")();

    return Number.isFinite(result)
      ? parseFloat(result.toFixed(10))
      : "Error";
  } catch {
    return "Error";
  }
};