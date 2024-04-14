import Thunder from "../images/thunder.svg";
import Sun from "../images/sunrise.svg";
import Clouds from "../images/clouds.svg";
import Rain from "../images/rain.svg";
import Atmosphere from "../images/atmosphere.svg";

const weatherType = {
  Thunderstorm: {
    icon: Thunder,
    is_risk: true,
  },
  Drizzle: {
    icon: Rain,
    is_risk: true,
  },
  Rain: {
    icon: Rain,
    is_risk: false,
  },
  Atmosphere: {
    icon: Atmosphere,
    is_risk: true,
  },
  Clear: {
    icon: Sun,
    is_risk: false,
  },
  Clouds: {
    icon: Clouds,
    is_risk: false,
  },
};

export default weatherType;
