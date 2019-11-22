/**
 * View container.
 * @module components/theme/View/View
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Portal } from 'react-portal';
import { injectIntl } from 'react-intl';
import qs from 'query-string';
import { views } from '~/config';

import { Comments, Tags, Toolbar } from '@plone/volto/components';
import { listActions, getContent } from '@plone/volto/actions';
import { BodyClass, getBaseUrl, getLayoutFieldname } from '@plone/volto/helpers';
import BasicForestIMG from '~/components/theme/HomepageView/images/basic-forest.png';
import ForestCarbonIMG from '~/components/theme/HomepageView/images/forest-carbon.png';
import ForestIMG from '~/components/theme/HomepageView/images/forest.png';
import NatureIMG from '~/components/theme/HomepageView/images/nature.png';
import MosaicView from 'volto-mosaic/components/theme/View'

/**
 * View container class.
 * @class View
 * @extends Component
 */
class View extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    actions: PropTypes.shape({
      object: PropTypes.arrayOf(PropTypes.object),
      object_buttons: PropTypes.arrayOf(PropTypes.object),
      user: PropTypes.arrayOf(PropTypes.object),
    }),
    listActions: PropTypes.func.isRequired,
    /**
     * Action to get the content
     */
    getContent: PropTypes.func.isRequired,
    /**
     * Pathname of the object
     */
    pathname: PropTypes.string.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
      pathname: PropTypes.string,
    }).isRequired,
    /**
     * Version id of the object
     */
    versionId: PropTypes.string,
    /**
     * Content of the object
     */
    content: PropTypes.shape({
      /**
       * Layout of the object
       */
      layout: PropTypes.string,
      /**
       * Allow discussion of the object
       */
      allow_discussion: PropTypes.bool,
      /**
       * Title of the object
       */
      title: PropTypes.string,
      /**
       * Description of the object
       */
      description: PropTypes.string,
      /**
       * Type of the object
       */
      '@type': PropTypes.string,
      /**
       * Subjects of the object
       */
      subjects: PropTypes.arrayOf(PropTypes.string),
      is_folderish: PropTypes.bool,
    }),
    error: PropTypes.shape({
      /**
       * Error type
       */
      status: PropTypes.number,
    }),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    actions: null,
    content: null,
    versionId: null,
    error: null,
  };

  state = {
    hasObjectButtons: null,
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.listActions(getBaseUrl(this.props.pathname));
    this.props.getContent(
      getBaseUrl(this.props.pathname),
      this.props.versionId,
    );
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.listActions(getBaseUrl(nextProps.pathname));
      this.props.getContent(
        getBaseUrl(nextProps.pathname),
        this.props.versionId,
      );
    }

    if (nextProps.actions.object_buttons) {
      const objectButtons = nextProps.actions.object_buttons;
      this.setState({
        hasObjectButtons: !!objectButtons.length,
      });
    }
  }

  /**
   * Default fallback view
   * @method getViewDefault
   * @returns {string} Markup for component.
   */
  getViewDefault = () => views.defaultView;

  /**
   * Get view by content type
   * @method getViewByType
   * @returns {string} Markup for component.
   */
  getViewByType = () =>
    views.contentTypesViews[this.props.content['@type']] || null;

  /**
   * Get view by content layout property
   * @method getViewByLayout
   * @returns {string} Markup for component.
   */
  getViewByLayout = () =>
    views.layoutViews[
      this.props.content[getLayoutFieldname(this.props.content)]
    ] || null;

  /**
   * Cleans the component displayName (specially for connected components)
   * which have the Connect(componentDisplayName)
   * @method cleanViewName
   * @param  {string} dirtyDisplayName The displayName
   * @returns {string} Clean displayName (no Connect(...)).
   */
  cleanViewName = dirtyDisplayName =>
    dirtyDisplayName
      .replace('Connect(', '')
      .replace(')', '')
      .toLowerCase();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.error) {
      let FoundView;
      if (this.props.error.status === undefined) {
        // For some reason, while development and if CORS is in place and the
        // requested resource is 404, it returns undefined as status, then the
        // next statement will fail
        FoundView = views.errorViews['404'];
      } else {
        FoundView = views.errorViews[this.props.error.status.toString()];
      }
      if (!FoundView) {
        FoundView = views.errorViews['404']; // default to 404
      }
      return (
        <div id="view">
          <FoundView />
        </div>
      );
    }
    if (!this.props.content) {
      return <span />;
    }
    const RenderedView = MosaicView
    
    return (
      <div id="view">
        {/* Body class if displayName in component is set */}
        <BodyClass
          className={
            RenderedView.displayName
              ? `view-${this.cleanViewName(
                  RenderedView.displayName
                    .replace('injectIntl(', '')
                    .toLowerCase(),
                )}`
              : null
          }
        />

        <RenderedView
          content={this.props.content}
          location={this.props.location}
          token={this.props.token}
          history={this.props.history}
        />

          <div className="thematic-areas">
            <div className="centered-content">
              <h2>Main thematic areas</h2>
              <p>
                For several decades now, environmental forest functions have
                attracted increasing attention mainly in relation to the
                protection of biodiversity and, more recently, in the context of
                climate change impacts and energy policies. Forests are
                increasingly valued for their role as regulators of climate and
                local weather, protection against natural disasters and
                renewable energy sources.
              </p>
            </div>

            <div className="ui stackable four column grid">
              <div className="column area-section">
                <div className="area-image">
                  <img src={BasicForestIMG} alt="" />
                </div>
                <div className="area-content">
                  <h5 className="area-title">Basic forest information</h5>
                  <p className="area-description">
                    Forests provide renewable raw materials and energy, maintain
                    biodiversity, and protect land and water resources.
                  </p>
                </div>
                <button className="ui button">Learn more</button>
              </div>

              <div className="column area-section">
                <div className="area-image">
                  <img src={NatureIMG} alt="" />
                </div>
                <div className="area-content">
                  <h5 className="area-title">Nature and biodiversity</h5>
                  <p className="area-description">
                    Biodiversity is the wide variety of animals, plants, their
                    habitats and their genes, and it is vital to countless human
                    activities.
                  </p>
                </div>
                <button className="ui button">Learn more</button>
              </div>

              <div className="column area-section">
                <div className="area-image">
                  <img src={ForestCarbonIMG} alt="" />
                </div>
                <div className="area-content">
                  <h5 className="area-title">Forest carbon - LULUCF</h5>
                  <p className="area-description">
                    EU climate policy which helps reduce EU greenhouse gas
                    emissions to at least 40 per cent below 1990 levels by 2030.
                  </p>
                </div>
                <button className="ui button">Learn more</button>
              </div>

              <div className="column area-section">
                <div className="area-image">
                  <img src={ForestIMG} alt="" />
                </div>
                <div className="area-content">
                  <h5 className="area-title">Forest bioeconomy</h5>
                  <p className="area-description">
                    Usin renewable biological resources to produce food,
                    materials and energy.
                  </p>
                </div>
                <button className="ui button">Learn more</button>
              </div>
            </div>
          </div>


        {this.props.content.subjects &&
          this.props.content.subjects.length > 0 && (
            <Tags tags={this.props.content.subjects} />
          )}
        {/* Add opt-in social sharing if required, disabled by default */}
        {/* In the future this might be parameterized from the app config */}
        {/* <SocialSharing
          url={typeof window === 'undefined' ? '' : window.location.href}
          title={this.props.content.title}
          description={this.props.content.description || ''}
        /> */}
        {this.props.content.allow_discussion && (
          <Comments pathname={this.props.pathname} />
        )}

        <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
          <Toolbar pathname={this.props.pathname} inner={<span />} />
        </Portal>
      </div>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      actions: state.actions.actions,
      token: state.userSession.token,
      content: state.content.data,
      error: state.content.get.error,
      pathname: props.location.pathname,
      versionId:
        qs.parse(props.location.search) &&
        qs.parse(props.location.search).version_id,
    }),
    {
      listActions,
      getContent,
    },
  ),
)(View);