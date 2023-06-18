import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const GoogleIconSvg = (props: any) => (
  <Svg
    width={18}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M9.055 3.612c1.7 0 2.848.758 3.502 1.39l2.555-2.573C13.542.924 11.5 0 9.055 0c-3.541 0-6.6 2.097-8.09 5.148l2.929 2.346C4.628 5.24 6.66 3.612 9.055 3.612Z"
        fill="#EA4335"
      />
      <Path
        d="M17.748 9.549c0-.768-.06-1.329-.19-1.91H9.054v3.466h4.99c-.1.862-.643 2.16-1.85 3.031l2.857 2.284c1.71-1.63 2.696-4.028 2.696-6.871Z"
        fill="#4285F4"
      />
      <Path
        d="M3.904 11.188a5.914 5.914 0 0 1-.302-1.847c0-.643.11-1.266.292-1.847L.966 5.148a9.59 9.59 0 0 0 0 8.386l2.938-2.346Z"
        fill="#FBBC05"
      />
      <Path
        d="M9.055 18.682c2.445 0 4.498-.83 5.997-2.262l-2.858-2.284c-.764.55-1.79.934-3.139.934-2.394 0-4.427-1.63-5.151-3.882L.976 13.534c1.489 3.052 4.538 5.148 8.08 5.148Z"
        fill="#34A853"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v19H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default GoogleIconSvg;
