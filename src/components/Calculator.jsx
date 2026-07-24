import { useState } from "react";
import Display from "./Display";
import ButtonGrid from "./Buttongrid";
import { calculate } from "../utils/calculator";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [angleMode, setAngleMode] = useState("DEG");
  const [history, setHistory] = useState([]);

  const scientificButtons = ["sin", "cos", "tan", "log", "ln", "√"];

  const handleButtonClick = (value) => {
    // Clear
    if (value === "C") {
      setDisplay("");
      return;
    }

    // Backspace
    if (value === "⌫") {
      setDisplay((prev) => prev.slice(0, -1));
      return;
    }

    // Equals
    if (value === "=") {
      let expression = display;

      // Auto-close brackets
      const open = (expression.match(/\(/g) || []).length;
      const close = (expression.match(/\)/g) || []).length;

      while (close < open) {
        expression += ")";
      }

     const result = calculate(expression, angleMode);

setHistory((prev) => [
  ...prev,
  {
    expression,
    result,
  },
]);

setDisplay(String(result));
      return;
    }

    // Scientific Functions
    if (scientificButtons.includes(value)) {
      setDisplay((prev) => prev + value + "(");
      return;
    }

    // π
    if (value === "π") {
  setDisplay((prev) => {
    if (prev === "") return "π";

    if (/[0-9)]$/.test(prev)) {
      return prev + "×π";
    }

    return prev + "π";
  });
  return;
}
    // e
    if (value === "e") {
  setDisplay((prev) => {
    if (prev === "") return "e";

    if (/[0-9)]$/.test(prev)) {
      return prev + "×e";
    }

    return prev + "e";
  });
  return;
}

    // × and ÷ stay as symbols
    if (value === "×" || value === "÷") {
      setDisplay((prev) => prev + value);
      return;
    }

    // Everything else
    setDisplay((prev) => prev + value);
  };

  return (
    <div className="w-full max-w-md rounded-3xl bg-slate-800/80 backdrop-blur-lg border border-slate-700 shadow-2xl p-5">

      <Display
        display={display || "0"}
        angleMode={angleMode}
      />

      {/* DEG/RAD Toggle */}
      <div className="flex justify-center my-5">
        <div className="bg-slate-700 rounded-full p-1 flex">

          <button
            onClick={() => setAngleMode("DEG")}
            className={`px-5 py-2 rounded-full transition ${
              angleMode === "DEG"
                ? "bg-blue-600 text-white"
                : "text-gray-300"
            }`}
          >
            DEG
          </button>

          <button
            onClick={() => setAngleMode("RAD")}
            className={`px-5 py-2 rounded-full transition ${
              angleMode === "RAD"
                ? "bg-blue-600 text-white"
                : "text-gray-300"
            }`}
          >
            RAD
          </button>

        </div>
      </div>

      <ButtonGrid onButtonClick={handleButtonClick} />

{/* History */}
<div className="mt-5 border-t border-slate-700 pt-4">

  <div className="flex justify-between items-center mb-2">

    <h3 className="text-white font-semibold">
      History
    </h3>

    <button
      onClick={() => setHistory([])}
      className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
    >
      Clear
    </button>

  </div>

  <div className="max-h-40 overflow-y-auto">

    {history.length === 0 ? (

      <p className="text-gray-400 text-sm">
        No calculations yet
      </p>

    ) : (

      history
        .slice()
        .reverse()
        .map((item, index) => (

          <div
            key={index}
            className="border-b border-slate-700 py-2"
          >

            <div className="text-gray-300 text-sm">
              {item.expression}
            </div>

            <div className="text-blue-400 text-sm">
              = {item.result}
            </div>

          </div>

        ))

    )}

  </div>

</div>

    </div>
  );
};

export default Calculator;