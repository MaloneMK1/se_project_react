import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );

  return (
    <label className="toggle-switch">
      <input
        className="toggle-switch__checkbox"
        type="checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />
      <span className="toggle-switch__slider">
        <span className="toggle-switch__label toggle-switch__label_f">F</span>
        <span className="toggle-switch__label toggle-switch__label_c">C</span>
      </span>
    </label>
  );
}

export default ToggleSwitch;
