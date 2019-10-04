/**
 * Add your config changes here.
 * @module config
 * @example
 * export const settings = {
 *   ...defaultSettings,
 *   port: 4300,
 *   listBlockTypes: {
 *     ...defaultSettings.listBlockTypes,
 *     'my-list-item',
 *   }
 * }
 */

import {
  settings as defaultSettings,
  views as defaultViews,
  widgets as defaultWidgets,
  tiles as defaultTiles,
} from '@plone/volto/config';

import TokenWidget from '@plone/volto/components/manage/Widgets/TokenWidget';

// Tiles
import ChartTileEdit from '~/components/manage/Tiles/ChartTile/ChartTileEdit';
import ChartTileView from '~/components/manage/Tiles/ChartTile/ChartTileView';

import TableauTileEdit from '~/components/manage/Tiles/TableauTile/TableauTileEdit';
import tableauTileView from '~/components/manage/Tiles/TableauTile/TableauTileView';

import TextTileEdit from '~/components/manage/Tiles/Text/Edit';
import TextTileView from '~/components/manage/Tiles/Text/View';

// Display types
import CountryView from '~/components/theme/CountryView/CountryView';
import CountryPageView from '~/components/theme/CountryPageView/CountryPageView';
import HomepageView from '~/components/theme/HomepageView/HomepageView';

import React from 'react';
import createInlineStyleButton from 'draft-js-buttons/lib/utils/createInlineStyleButton';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import underlineSVG from '@plone/volto/icons/underline.svg';
import chartIcon from '@plone/volto/icons/world.svg';

// TODO: this needs to be reorganized
import { layoutViews } from '../volto-mosaic/src';

// import ImageAndRichTextTileEdit from '~/components/manage/Tiles/ImageAndRichTextTile/Edit';
// import ImageAndRichTextTileView from '~/components/manage/Tiles/ImageAndRichTextTile/View';
// import MosaicSettingsView from '~/components/theme/TestViews/MosaicSettingsView';
// import TableauTestView from '~/components/theme/TableauTestView/View';
// import MosaicView from '~/components/theme/MosaicView/MosaicView';
// import divideVertical from '@plone/volto/icons/divide-vertical.svg';

const Underline = createInlineStyleButton({
  style: 'UNDERLINE',
  children: <Icon name={underlineSVG} size="24px" />,
});

export const settings = {
  ...defaultSettings,
  richTextEditorInlineToolbarButtons: [
    Underline,
    ...defaultSettings.richTextEditorInlineToolbarButtons,
  ],
};

export const views = {
  ...defaultViews,
  layoutViews: {
    ...defaultViews.layoutViews,
    full_view: CountryView,
    country_tab_view: CountryPageView,
    homepage_view: HomepageView,
    // tableau_test_view: TableauTestView,
    // mosaic_tiles_view: MosaicView,
    ...layoutViews,
  },
  contentTypesViews: {
    ...defaultViews.contentTypesViews,
    'Plone Site': HomepageView,
  },
};

// read @plone/volto/components/manage/Form/Field.jsx to understand this
export const widgets = {
  ...defaultWidgets,
  vocabulary: {
    ...defaultWidgets.vocabulary,
    'fise.topics': TokenWidget,
    'fise.keywords': TokenWidget,
    'fise.publishers': TokenWidget,
  },
};

console.log('Widgets', widgets);

// console.log('------', defaultTiles);

export const tiles = {
  ...defaultTiles,

  tilesConfig: {
    ...defaultTiles.tilesConfig,
    charttile: {
      title: 'charttile',
      view: ChartTileView,
      edit: ChartTileEdit,
      icon: chartIcon,
      height: 400,
    },
    tableautile: {
      title: 'tableautile',
      view: tableauTileView,
      edit: TableauTileEdit,
      icon: chartIcon,
      height: 400,
    },
    text: {
      ...defaultTiles.tilesConfig.text,
      view: TextTileView,
      edit: TextTileEdit,
      height: 200,
    },
    video: {
      ...defaultTiles.tilesConfig.video,
      height: 600,
    },
    image: {
      ...defaultTiles.tilesConfig.image,
      height: 600,
    },
    hero: {
      ...defaultTiles.tilesConfig.hero,
      height: 600,
    },
    maps: {
      ...defaultTiles.tilesConfig.maps,
      height: 600,
    },
    html: {
      ...defaultTiles.tilesConfig.html,
      height: 600,
    },
    table: {
      ...defaultTiles.tilesConfig.image,
      height: 600,
    },
  },
};
