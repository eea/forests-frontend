/**
 * View map block.
 * @module components/manage/Blocks/Maps/View
 */

import React, { useState } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import cx from 'classnames';
import VisibilitySensor from 'react-visibility-sensor';
import { Placeholder } from 'semantic-ui-react';

const messages = defineMessages({
  EmbededGoogleMaps: {
    id: 'Embeded Google Maps',
    defaultMessage: 'Embeded Google Maps',
  },
});

/**
 * View image block class.
 * @class View
 * @extends Component
 */

const View = ({ data, intl }) => {
  const [visible, setVisibility] = useState(false);
  console.log('map', data);
  // partialVisibility={true}
  return (
    <div
      className={cx(
        'block maps align',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      <div
        className={cx('video-inner', {
          'full-width': data.align === 'full',
        })}
      >
        <VisibilitySensor
          onChange={isVisible => {
            console.log('is visible', isVisible, visible);
            !visible && isVisible && setVisibility(true);
          }}
        >
          {visible ? (
            <iframe
              title={intl.formatMessage(messages.EmbededGoogleMaps)}
              src={data.url}
              className="google-map"
              frameBorder="0"
              allowFullScreen
              style={{ height: '45vh' }}
            />
          ) : (
            <Placeholder style={{ height: '100%', width: '100%' }}>
              <Placeholder.Image rectangular />
            </Placeholder>
          )}
        </VisibilitySensor>
      </div>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default injectIntl(View);
