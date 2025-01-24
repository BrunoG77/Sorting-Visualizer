import ArrayBarSlider from "./ArrayBarSlider/ArrayBarSlider";
import SpeedSlider from "./SpeedSlider/SpeedSlider";
import "./Sliders.css";

interface SliderProps {
  arrayNumber: number;
  onChangeArrayBarSlider: (event: Event, value: number) => void;
  animationSpeed: number;
  onChangeAnimationSpeedSlider: (value: number) => void;
}

const Slider = ({
  arrayNumber,
  onChangeArrayBarSlider,
  animationSpeed,
  onChangeAnimationSpeedSlider,
}: SliderProps) => {
  return (
    <div id="range-slider">
      <div className="column">
        <ArrayBarSlider
          arrayNumber={arrayNumber}
          onChangeArrayBarSlider={onChangeArrayBarSlider}
        />
      </div>
      <div className="column">
        <SpeedSlider
          animationSpeed={animationSpeed}
          onChangeAnimationSpeedSlider={onChangeAnimationSpeedSlider}
        />
      </div>
    </div>
  );
};

export default Slider;
