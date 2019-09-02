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

// Tiles
import TwoColumnsTileEdit from '~/components/manage/Tiles/TwoColumnsTile/Edit'
import TwoColumnsTileView from '~/components/manage/Tiles/TwoColumnsTile/View'

import ImageAndRichTextTileEdit from '~/components/manage/Tiles/ImageAndRichTextTile/Edit'
import ImageAndRichTextTileView from '~/components/manage/Tiles/ImageAndRichTextTile/View'
import ContainerTileEdit from '~/components/manage/Tiles/ContainerTile/Edit'
import ContainerTileView from '~/components/manage/Tiles/ContainerTile/View'

// Display types
import CountryView from '~/components/CountryView/CountryView'
import CountryPageView from '~/components/CountryPageView/CountryPageView'

import React from 'react';
import createInlineStyleButton from 'draft-js-buttons/lib/utils/createInlineStyleButton';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import underlineSVG from '@plone/volto/icons/underline.svg';
import divideVertical from '@plone/volto/icons/divide-vertical.svg';
import containerIcon from '@plone/volto/icons/collection.svg'

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

console.log(settings)

export const views = {
  ...defaultViews,
  layoutViews: {
    ...defaultViews.layoutViews,
    full_view: CountryView,
    country_tab_view: CountryPageView,
  }
};

export const widgets = {
  ...defaultWidgets,
};

export const tiles = {
  ...defaultTiles,
  customTiles: [
    ...defaultTiles.customTiles,
    {
      title: 'imageandrichtext',
      icon: divideVertical
    },
    {
      title: 'container',
      icon: containerIcon
    }
  ],
  defaultTilesViewMap: {
    ...defaultTiles.defaultTilesViewMap,
    imageandrichtext: ImageAndRichTextTileView,
    container: ContainerTileEdit
  },
  defaultTilesEditMap: {
    ...defaultTiles.defaultTilesEditMap,
    imageandrichtext: ImageAndRichTextTileEdit,
    container: ContainerTileEdit
  },
  // messagesTiles: defaultTiles.messagesTiles,
  // requiredTiles: defaultTiles.requiredTiles,
  // sidebarComponents: {
  //   ...defaultTiles.sidebarComponents
  // }
};
