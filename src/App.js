import React, { useState, useEffect } from "react";

const FinalAdjustedCarmaSizingCalculator = () => {
  const [unit, setUnit] = useState("mm");
  const [canvasSize, setCanvasSize] = useState(297);
  const [result, setResult] = useState(0);
  const elements = [
    { name: "Headline 1", multiplier: 24.27, base: 15 },
    { name: "Headline 2", multiplier: 22.652, base: 14 },
    { name: "Headline 3", multiplier: 19.416, base: 12 },
    { name: "Headline 4", multiplier: 16.18, base: 10 },
    { name: "Headline 5", multiplier: 12.944, base: 8 },
    { name: "Headline 6", multiplier: 11.326, base: 7 },
    { name: "Subline", multiplier: 6.472, base: 4 },
    { name: "Body", multiplier: 4.854, base: 3 },
    { name: "Annotation", multiplier: 1.618, base: 1 },
    { name: "Button Text", multiplier: 2.5888, base: 1.6 },
    { name: "Button height", multiplier: 2.427, base: 1.5 },
    { name: "Button width", multiplier: 2.5888, base: 1.6 },
    { name: "Page Margin", multiplier: 5.9866, base: 3.7 },
    { name: "Sun Visor Height", multiplier: 21.034, base: 13 },
    { name: "Corner radius", multiplier: 1.9416, base: 1.2 }, // Updated element
  ];

  useEffect(() => {
    const calculatedValue = 0.01 * canvasSize; // 1vh is always 1% of canvas size
    setResult(calculatedValue.toFixed(2));
  }, [unit, canvasSize]);

  const formatResult = (multiplier) => {
    return (result * multiplier).toFixed(2);
  };

  const renderElement = (element, index) => (
    <div key={index} className="mt-3 text-lg">
      <span className="text-black">
        {element.name} = {formatResult(element.multiplier)} {unit} (1vh *{" "}
        {element.multiplier.toFixed(3)})
        <span className="text-gray-600 ml-2">
          {element.base.toFixed(1)} * 1.618
        </span>
      </span>
    </div>
  );

  const typeHierarchyElements = elements.slice(0, 9); // Headline 1 to Annotation
  const graphicElements = elements.slice(9); // Button Text to Corner radius

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#F9F8F5" }}
    >
      <div
        className="p-6 max-w-4xl w-full rounded-xl shadow-md"
        style={{ backgroundColor: "#F9F8F5" }}
      >
        <h2 className="text-2xl font-bold mb-6">Carma Sizing Calculator</h2>
        <div className="mb-6">
          <div className="flex border-b">
            <button
              className={`py-2 px-6 text-lg ${unit === "mm"
                ? "border-b-2 text-[#FF385C] font-bold"
                : "text-gray-700"
                }`}
              style={{ borderColor: unit === "mm" ? "#FF385C" : "transparent" }}
              onClick={() => setUnit("mm")}
            >
              mm
            </button>
            <button
              className={`py-2 px-6 text-lg ${unit === "px"
                ? "border-b-2 text-[#FF385C] font-bold"
                : "text-gray-700"
                }`}
              style={{ borderColor: unit === "px" ? "#FF385C" : "transparent" }}
              onClick={() => setUnit("px")}
            >
              px
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg">Length of shortest side:</label>
          <input
            type="number"
            value={canvasSize}
            onChange={(e) => setCanvasSize(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded text-lg"
          />
        </div>
        <p className="text-lg mb-4">
          1vh = {result} {unit}
        </p>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-4">Type Hierarchy:</h3>
              {typeHierarchyElements.map((element, index) =>
                renderElement(element, index)
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2 mt-4 md:mt-0">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-4">
                Graphic Element Sizing:
              </h3>
              {graphicElements.map((element, index) =>
                renderElement(element, index)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalAdjustedCarmaSizingCalculator;
