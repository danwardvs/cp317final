import * as React from 'react';

import { Text, TextProps } from './Themed';

// Name of the module: MonoText
// Date of module creation: November 24, 2020
// Author of the module: Danny Van Stemp
// Modification history: None
// Synopsis of the module about what the module does: Formats text

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
