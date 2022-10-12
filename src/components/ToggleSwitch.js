import { useState, useContext, useEffect } from "react";
import "../blocks/ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../utils/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const [isChecked, setIsChecked] = useState(currentTemperatureUnit === "C");
  useEffect(
    () => setIsChecked(currentTemperatureUnit === "C"),
    [currentTemperatureUnit]
  );

  return (
    <div className="toggleswitch">
      <label className="toggleswitch__wrapper">
        <input
          className="toggleswitch__checkbox toggleswitch__checkbox-hide"
          type="checkbox"
          name="toggleswitch_checkbox"
          value={currentTemperatureUnit}
          onChange={handleToggleSwitchChange}
          checked={isChecked}
        />
        <span className="toggleswitch__checkbox toggleswitch__checkbox-view"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
