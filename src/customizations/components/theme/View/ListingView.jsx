/**
 * Document view component.
 * @module components/theme/View/ListingView
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { getLocalnavigation } from '~/actions';
import { connect } from 'react-redux';
import { flattenToAppURL } from '@plone/volto/helpers';

import { defineMessages, injectIntl } from 'react-intl';

import { Container, Image, Grid } from 'semantic-ui-react';
import { map } from 'lodash';

import { settings, tiles } from '~/config';

import {
  getTilesFieldname,
  getTilesLayoutFieldname,
  hasTilesData,
} from '@plone/volto/helpers';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
});

class ListingView extends Component {
  static propTypes = {
    localNavigation: PropTypes.array,
    getLocalnavigation: PropTypes.func.isRequired,
    content: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      text: PropTypes.shape({
        data: PropTypes.string,
      }),
      items: PropTypes.arrayOf(
        PropTypes.shape({
          '@id': PropTypes.string,
          '@type': PropTypes.string,
          description: PropTypes.string,
          review_state: PropTypes.string,
          title: PropTypes.string,
          url: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  componentDidMount() {
    this.props.getLocalnavigation(flattenToAppURL(this.props.content['@id']));
  }

  render() {
    const content = this.props.content;
    const intl = this.props.intl;
    const tilesFieldname = getTilesFieldname(content);
    const tilesLayoutFieldname = getTilesLayoutFieldname(content);
    const localNavigation = this.props.localNavigation.items || [];

    // return (
    //   <Container id="page-home">
    //     <Helmet title={content.title} />
    //     <section id="content-core">
    //       {content.items.map(item => (
    //         <article key={item.url}>
    //           <h2>
    //             <Link to={item.url} title={item['@type']}>
    //               {item.title}
    //             </Link>
    //           </h2>
    //           {item.description && <p>{item.description}</p>}
    //         </article>
    //       ))}
    //     </section>
    //   </Container>
    // );
    return (
      <Grid columns={2} className="folderWithContent">
        <Grid.Column>
          {hasTilesData(content) ? (
            <div id="page-document" className="ui container">
              <Helmet title={content.title} />
              {map(content[tilesLayoutFieldname].items, tile => {
                const Tile =
                  tiles.tilesConfig[
                    (content[tilesFieldname]?.[tile]?.['@type'])
                  ]?.['view'] || null;
                return Tile !== null ? (
                  <Tile
                    key={tile}
                    id={tile}
                    properties={content}
                    data={content[tilesFieldname][tile]}
                  />
                ) : (
                  <div key={tile}>
                    {intl.formatMessage(messages.unknownBlock, {
                      block: content[tilesFieldname]?.[tile]?.['@type'],
                    })}
                  </div>
                );
              })}
            </div>
          ) : (
            <Container id="page-document">
              <Helmet title={content.title} />
              <h1 className="documentFirstHeading">{content.title}</h1>
              {content.description && (
                <p className="documentDescription">{content.description}</p>
              )}
              {content.image && (
                <Image
                  className="document-image"
                  src={content.image.scales.thumb.download}
                  floated="right"
                />
              )}
              {content.remoteUrl && (
                <span>
                  The link address is:
                  <a href={content.remoteUrl}>{content.remoteUrl}</a>
                </span>
              )}
              {content.text && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: content.text.data.replace(
                      /a href="([^"]*\.[^"]*)"/g,
                      `a href="${settings.apiPath}$1/download/file"`,
                    ),
                  }}
                />
              )}
            </Container>
          )}
        </Grid.Column>
        <Grid.Column>
          <ul className="localNavigation">
            {localNavigation.map(item => (
              <li>
                <Link to={item.url} key={item.url}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  state => ({
    localNavigation: state.localnavigation.items,
  }),
  { getLocalnavigation },
)(injectIntl(ListingView));
