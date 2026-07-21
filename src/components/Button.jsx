const Button = ({ value, onClick }) => {

  let color = "bg-slate-700 hover:bg-slate-600";

  if (["+", "-", "×", "/", "="].includes(value)) {
    color = "bg-orange-500 hover:bg-orange-600";
  }

  if (["sin", "cos", "tan", "log", "ln", "√", "π", "e"].includes(value)) {
    color = "bg-blue-600 hover:bg-blue-700";
  }

  if (value === "C" || value === "⌫") {
    color = "bg-red-500 hover:bg-red-600";
  }

  return (
    <button
      onClick={() => onClick(value)}
      className={`h-14 rounded-xl text-white text-lg font-semibold transition active:scale-95 ${color}`}
    >
      {value}
    </button>
  );
};

export default Button;