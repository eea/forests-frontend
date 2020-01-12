/**
 * Document view component.
 * @module components/theme/View/DefaultView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from '@plone/volto/helpers';
import { injectIntl } from 'react-intl'; // defineMessages,

import { Container, Image } from 'semantic-ui-react';
import { map } from 'lodash';

import { settings, blocks } from '~/config';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers';

// const messages = defineMessages({
//   unknownBlock: {
//     id: 'Unknown Block',
//     defaultMessage: 'Unknown Block {block}',
//   },
// });

/**
 * Component to display the default view.
 * @function DefaultView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const DefaultView = ({ content, intl }) => {
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);

  return hasBlocksData(content) ? (
    <div id="page-document" className="ui container">
      <Helmet title={content.title} />
      {map(content[blocksLayoutFieldname].items, block => {
        const Block =
          blocks.blocksConfig[(content[blocksFieldname]?.[block]?.['@type'])]?.[
            'view'
          ] || null;
        return Block !== null &&
          content[blocksFieldname][block]['@type'] !== 'title' ? (
          <Block
            key={block}
            id={block}
            properties={content}
            data={content[blocksFieldname][block]}
          />
        ) : (
          //   <div key={block}>
          //     {intl.formatMessage(messages.unknownBlock, {
          //       block: content[blocksFieldname]?.[block]?.['@type'],
          //     })}
          //   </div>
          ''
        );
      })}
    </div>
  ) : (
    <Container id="page-document">
      {/* <Helmet title={content.title} />
      <h1 className="documentFirstHeading">{content.title}</h1>
      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )} */}
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
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
DefaultView.propTypes = {
  /**
   * Content of the object
   */
  content: PropTypes.shape({
    /**
     * Title of the object
     */
    title: PropTypes.string,
    /**
     * Description of the object
     */
    description: PropTypes.string,
    /**
     * Text of the object
     */
    text: PropTypes.shape({
      /**
       * Data of the text of the object
       */
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default injectIntl(DefaultView);