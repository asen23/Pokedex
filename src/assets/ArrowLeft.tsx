import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const ArrowLeft = (props: SvgProps) => (
  <Svg width={24} height={24} {...props}>
    <Path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
  </Svg>
);

export default ArrowLeft;
