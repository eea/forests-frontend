/**
 * App container.
 * @module components/theme/App/App
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { asyncConnect } from 'redux-connect';
import { Segment, Container } from 'semantic-ui-react';
import Raven from 'raven-js';
import { renderRoutes } from 'react-router-config';
import { Slide, ToastContainer, toast } from 'react-toastify';
import ViewletsRenderer from 'volto-addons/Viewlets/Render';

import Error from '@plone/volto/error';

import {
  Icon,
  Messages,
  Footer,
  Header,
  OutdatedBrowser,
} from '@plone/volto/components';
import { BodyClass, getBaseUrl, getView } from '@plone/volto/helpers';
import {
  getContent,
  getNavigation,
  getTypes,
  getWorkflow,
  purgeMessages,
} from '@plone/volto/actions';
import { getFrontpageSlides, getDefaultHeaderImage } from '~/actions';
import { getPortlets } from 'volto-addons/actions';

import clearSVG from '@plone/volto/icons/clear.svg';

class App extends Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    purgeMessages: PropTypes.func.isRequired,
    folderHeader: PropTypes.any,
    // getDefaultHeaderImage: PropTypes.func.isRequired,
    // defaultHeaderImage: PropTypes.object.isRequired,
  };

  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  /**
   * ComponentDidMount
   * @method ComponentDidMount
   * @param {string} error  The error
   * @param {string} info The info
   * @returns {undefined}
   */
  componentDidMount() {
    // this.props.getDefaultHeaderImage();
    if (__CLIENT__ && process.env.SENTRY_DSN) {
      Raven.config(process.env.SENTRY_DSN).install();
    }
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.loadingContent.loading || nextProps.search.loading) {
  //     console.log('dont load');
  //     return false;
  //   }
  //   console.log('load:', nextProps.loadingContent);
  //   return true;
  // }
  //
  /**
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.purgeMessages();

      if (this.state.hasError) {
        this.setState({ hasError: false });
      }
    }
  }

  /**
   * ComponentDidCatch
   * @method ComponentDidCatch
   * @param {string} error  The error
   * @param {string} info The info
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, errorInfo: info });
    if (__CLIENT__ && process.env.SENTRY_DSN) {
      Raven.captureException(error, { extra: info });
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const path = getBaseUrl(this.props.pathname);
    const action = getView(this.props.pathname);
    const headerImage = this.props.defaultHeaderImage;
    // console.log('navigation in appjsx', this.props.navigation)
    return (
      <Fragment>
        <BodyClass className={`view-${action}view`} />
        <Header
          folderHeader={this.props.folderHeader}
          actualPathName={this.props.pathname}
          pathname={path}
          defaultHeaderImage={headerImage}
          navigationItems={this.props.navigation}
          frontpage_slides={this.props.frontpage_slides}
        />
        <Segment basic className="content-area">
          <Container>
            <main>
              <OutdatedBrowser />
              <Messages />
              <div className="editor-toolbar-wrapper" />

              {this.state.hasError ? (
                <Error
                  message={this.state.error.message}
                  stackTrace={this.state.errorInfo.componentStack}
                />
              ) : (
                <>
                  {renderRoutes(this.props.route.routes)}
                  <ViewletsRenderer {...this.props} />
                </>
              )}
            </main>
          </Container>
        </Segment>
        <Footer />
        <ToastContainer
          position={toast.POSITION.BOTTOM_CENTER}
          hideProgressBar
          transition={Slide}
          closeButton={
            <Icon
              className="toast-dismiss-action"
              name={clearSVG}
              size="18px"
            />
          }
        />
      </Fragment>
    );
  }
}

export const __test__ = connect(
  (state, props) => ({ pathname: props.location.pathname }),
  { purgeMessages },
)(App);

export default compose(
  asyncConnect([
    {
      key: 'content',
      promise: ({ location, store: { dispatch } }) =>
        __SERVER__ && dispatch(getContent(getBaseUrl(location.pathname))),
    },
    {
      key: 'frontpage_slides',
      promise: ({ store: { dispatch } }) =>
        __SERVER__ && dispatch(getFrontpageSlides()),
    },
    {
      key: 'defaultHeaderImage',
      promise: ({ store: { dispatch } }) =>
        __SERVER__ && dispatch(getDefaultHeaderImage()),
    },
    {
      key: 'navigation',
      promise: ({ location, store: { dispatch } }) =>
        __SERVER__ && dispatch(getNavigation(getBaseUrl(location.pathname))),
    },
    {
      key: 'types',
      promise: ({ location, store: { dispatch } }) =>
        __SERVER__ && dispatch(getTypes(getBaseUrl(location.pathname))),
    },
    {
      key: 'workflow',
      promise: ({ location, store: { dispatch } }) =>
        __SERVER__ && dispatch(getWorkflow(getBaseUrl(location.pathname))),
    },
    {
      key: 'portlets',
      promise: ({ location, store: { dispatch } }) =>
        __SERVER__ && dispatch(getPortlets(getBaseUrl(location.pathname))),
    },
    {
      key: 'portlets_left',
      promise: ({ location, store: { dispatch } }) =>
        __SERVER__ &&
        dispatch(
          getPortlets(getBaseUrl(location.pathname), 'plone.leftcolumn'),
        ),
    },
    {
      key: 'portlets_right',
      promise: ({ location, store: { dispatch } }) =>
        __SERVER__ &&
        dispatch(
          getPortlets(getBaseUrl(location.pathname), 'plone.rightcolumn'),
        ),
    },
    {
      key: 'portlets_footer',
      promise: ({ location, store: { dispatch } }) =>
        __SERVER__ &&
        dispatch(
          getPortlets(getBaseUrl(location.pathname), 'plone.footerportlets'),
        ),
    },
  ]),
  connect(
    (state, props) => ({
      folderHeader: state.folder_header.items,
      defaultHeaderImage: state.default_header_image.items?.[0],
      pathname: props.location.pathname,
      // content: state.content.data,
      content: state.prefetch?.[props.location.pathname] || state.content.data,
      frontpage_slides: state.frontpage_slides.items,
      navigation: state.navigation.items,

      // loadingContent: state.content?.get,
      // search: state.search,
    }),
    { purgeMessages },
  ),
)(App);
