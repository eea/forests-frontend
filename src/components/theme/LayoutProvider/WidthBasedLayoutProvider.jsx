import React from 'react';
import componentQueries from 'react-component-queries';
import { compose } from 'redux';

const WidthBasedLayoutProvider = WrappedComponent => props => {
  return <WrappedComponent {...props} />;
};
/* 767        768-1199      1200-1599     1600+
mobile     tablet         desktop       widescreen */

export default compose(
  componentQueries(({ width }) => ({
    layout_type: (() => {
      if (__SERVER__) {
        return 'widescreen';
      }
      if (width > 1600 - 20) {
        return 'widescreen';
      }
      if (width > 1200 - 20) {
        return 'desktop';
      }
      if (width > 767 - 20) {
        return 'tablet';
      }
      return 'phone';
    })(),
  })),
  WidthBasedLayoutProvider,
);

/* export const breakpoints = { lg: 1600, md: 1200, sm: 768, xs: 0, xxs: 0 }; */
