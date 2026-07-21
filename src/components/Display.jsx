const Display = ({ display, angleMode }) => {
  return (
    <div className="bg-slate-900 rounded-2xl p-5 shadow-inner">

      <div className="flex justify-between items-center">

        <span className="text-blue-400 font-bold">
          {angleMode}
        </span>

        <span className="text-gray-400 text-sm">
          Scientific Calculator
        </span>

      </div>

      <div className="text-right text-white text-5xl mt-6 break-all font-light">
        {display}
      </div>

    </div>
  );
};

export default Display;