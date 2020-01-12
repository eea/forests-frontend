/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { Container, List, Segment, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import footerImage from './footer.png';
import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';

import Loadable from 'react-loadable';

const eeaLogo = Loadable({
  loader: () => import('./ec.svg.png'),
  loading() {
    return <div>Loading...</div>;
  },
});

const ecLogo = Loadable({
  loader: () => import('./eea.png'),
  loading() {
    return <div>Loading...</div>;
  },
});

const messages = defineMessages({
  copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
});

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = ({ intl }) => (
  <Segment
    role="contentinfo"
    vertical
    padded
    // textAlign="center"
    className="footerWrapper"
  >
    <img className="footerImage" src={footerImage} alt="" />
    <Container>
      <div className="ui vertically divided grid">
        <div className="four column row">
          <div className="column">
            <b>ABOUT</b>
            <p>
              FISE - Forest Information System for Europe is a forest knowledge
              base in support of the EU Forest Strategy.{' '}
              {/* <a href="#">See more</a> */}
            </p>
            <img
              style={{ width: '250px', marginTop: '2rem' }}
              src={LogoImage}
              alt="Forest"
            />
          </div>

          <div style={{ flexGrow: '1' }} className="column">
            <div>
              <div style={{ display: 'none' }}> a </div>
            </div>
          </div>

          <div
            style={{ width: '150px!important', fontSize: '.9rem' }}
            className="column"
            id="links_column"
          >
            <b>LINKS</b>
            <ul className="unlist">
              <li>
                <Link className="item" to="/legal_notice">
                  <FormattedMessage
                    id="legal_notice"
                    defaultMessage="Legal notice"
                  />
                </Link>
              </li>

              <li>
                <Link className="item" to="/privacy_policy">
                  <FormattedMessage
                    id="privacy_policy"
                    defaultMessage="Privacy policy"
                  />
                </Link>
              </li>
              <li>
                <Link className="item" to="/credits">
                  <FormattedMessage id="Credits" defaultMessage="Credits" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="column">
            <b>PARTNERS</b>
            <div className="footerLogoWrapper">
              <a href="https://ec.europa.eu/" title="European Commission">
                <img className="footerLogo" src={eeaLogo} alt="" />
              </a>
              <a
                href="https://www.eea.europa.eu/"
                title="European Environment Agency"
              >
                <img className="footerLogo" src={ecLogo} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </Segment>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
};

export default injectIntl(Footer);
