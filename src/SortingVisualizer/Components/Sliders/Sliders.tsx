import ArrayBarSlider from "./ArrayBarSlider/ArrayBarSlider";
import "./Sliders.css";

interface SliderProps {
  arrayNumber: number;
  onChangeArrayBarSlider: (event: Event, value: number) => void;
}

const Slider = ({ arrayNumber, onChangeArrayBarSlider }: SliderProps) => {
  return (
    <div id="range-slider">
      <div className="column">
        <ArrayBarSlider
          arrayNumber={arrayNumber}
          onChangeArrayBarSlider={onChangeArrayBarSlider}
        />
      </div>
    </div>
  );
};

export default Slider;
