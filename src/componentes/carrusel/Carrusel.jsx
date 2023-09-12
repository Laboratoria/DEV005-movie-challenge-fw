import { useState } from "react";
import "./carrusel.css"; // Importa tu archivo de estilos CSS

function Slider() {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={handleSliderChange}
        className="slider"
      />
      <p>Valor del slider: {sliderValue}</p>
    </div>
  );
}

export default Slider;
