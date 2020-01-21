import * as voltoConfig from '@plone/volto/config';

import {
  applyConfig as addonsConfig,
  installImageSlides,
  installPortlets,
  installTableau,
} from 'volto-addons/config';
import { applyConfig as plotlyConfig } from 'volto-plotlycharts/config';
import { applyConfig as ckeditorConfig } from 'volto-ckeditor/config';
import { applyConfig as mosaicConfig } from 'volto-mosaic/config';
import { applyConfig as dataBlocksConfig } from 'volto-datablocks/config';
import { applyConfig as installFiseFrontend } from './localconfig';
import { applyConfig as installSidebar } from 'volto-sidebar/config';
// import { applyConfig as installSearch } from 'volto-nfisearch/config';

const config = [
  addonsConfig,
  installSidebar,
  installPortlets,
  installImageSlides,
  installTableau,
  plotlyConfig,
  ckeditorConfig,
  mosaicConfig,
  // installSearch,
  dataBlocksConfig,
  installFiseFrontend,
].reduce((acc, apply) => apply(acc), voltoConfig);

export const settings = {
  ...config.settings,
  contentExpand: [
    ...config.settings.contentExpand.filter(
      content => content !== 'navigation',
    ),
    ...['navigation', '&expand.navigation.depth=3'],
  ],
};

export const views = {
  ...config.views,
};

export const widgets = {
  ...config.widgets,
};

export const blocks = {
  ...config.blocks,
};

// TODO: should we move custom stuff to settings variable?
// It would make future adding new settings types easier, as this file wouldn't
// have to be updated in all frontend implementations
export const addonReducers = { ...config.addonReducers };
export const addonRoutes = [...(config.addonRoutes || [])];

export const viewlets = [...(config.viewlets || [])];

export const portlets = {
  ...config.portlets,
};

export const editForms = {
  ...config.editForms,
};
