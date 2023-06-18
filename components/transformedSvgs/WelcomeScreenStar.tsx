import * as React from "react";
import Svg, { Path } from "react-native-svg";

const WelcomeScreenStar = (props: any) => (
  <Svg
    width={28}
    height={29}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.92 0v1.547c0 7.047-5.713 12.76-12.76 12.76H0h1.16c7.047 0 12.76 5.713 12.76 12.761v1.547-1.547c0-7.048 5.714-12.76 12.761-12.76h.774-.774c-7.047 0-12.76-5.714-12.76-12.761V0Z"
      fill="#6760FF"
    />
  </Svg>
);

export default WelcomeScreenStar;
