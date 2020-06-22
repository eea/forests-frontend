/**
 * Root reducer.
 * @module reducers/root
 */

import defaultReducers from '@plone/volto/reducers';
import frontpage_slides from '~/reducers/frontpage_slides';
import folder_header from '~/reducers/folder_header';
import folder_tabs from '~/reducers/folder_tabs';
import default_header_image from '~/reducers/default_header_image';
import parent_folder_data from '~/reducers/parent_folder_data';
import localnavigation from '~/reducers/localnavigation';
import navSiteMap from '~/reducers/sitemap';
import map_data from '~/reducers/map_data';

/**
 * Root reducer.
 * @function
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
const reducers = {
  ...defaultReducers,
  frontpage_slides,
  folder_header,
  default_header_image,
  folder_tabs,
  parent_folder_data,
  localnavigation,
  navSiteMap,
  map_data,
};

export default reducers;
