import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const Dark = (props: SvgProps) => (
  <Svg width={24} height={24} fill="white" {...props}>
    <Path d="M11.993 3a9.326 9.326 0 0 0-1.138 4.477 8.8 8.8 0 0 0 8.569 9.015c.2 0 .385-.017.576-.03A8.5 8.5 0 0 1 12.569 21 8.8 8.8 0 0 1 4 11.985 8.83 8.83 0 0 1 11.993 3Z" />
  </Svg>
);

export default Dark;
