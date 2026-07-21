import Button from "./Button";

const buttons = [
  "(",
  ")",
  "C",
  "⌫",

  "sin",
  "cos",
  "tan",
  "/",

  "log",
  "ln",
  "√",
  "^",

  "7",
  "8",
  "9",
  "×",

  "4",
  "5",
  "6",
  "-",

  "1",
  "2",
  "3",
  "+",

  "π",
  "0",
  ".",
  "=",
];

const ButtonGrid = ({ onButtonClick }) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {buttons.map((btn) => (
        <Button
          key={btn}
          value={btn}
          onClick={onButtonClick}
        />
      ))}
    </div>
  );
};

export default ButtonGrid;