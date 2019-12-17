import { defineMessages } from 'react-intl';
import React from 'react';

import TokenWidget from '@plone/volto/components/manage/Widgets/TokenWidget';

import CountryView from '~/components/theme/CountryView/CountryView';
import CountryPageView from '~/components/theme/CountryPageView/CountryPageView';
import HomepageView from '~/components/theme/HomepageView/HomepageView';

import createInlineStyleButton from 'draft-js-buttons/lib/utils/createInlineStyleButton';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import underlineSVG from '@plone/volto/icons/underline.svg';
import chartIcon from '@plone/volto/icons/world.svg';

import EuropeCompareBlockEdit from './components/manage/Blocks/EuropeCompareBlock/Edit';
import EuropeCompareBlockView from './components/manage/Blocks/EuropeCompareBlock/View';
import EuropeForestBlockEdit from './components/manage/Blocks/EuropeForestBlock/Edit';
import EuropeForestBlockView from './components/manage/Blocks/EuropeForestBlock/View';

import ForestMetadata from '~/components/theme/Viewlets/ForestMetadata';

defineMessages({
  custom_addons: {
    id: 'custom_addons',
    defaultMessage: 'Custom Addons',
  },
  plotly_chart: {
    id: 'plotly_chart',
    defaultMessage: 'Plotly Chart',
  },
  demo_chart: {
    id: 'demo_chart',
    defaultMessage: 'Demo Chart',
  },
  tableau: {
    id: 'tableau',
    defaultMessage: 'Tableau',
  },
  forests_specific: {
    id: 'forests_specific',
    defaultMessage: 'Forests Specific Blocks',
  },
});

export function applyConfig(config) {
  const Underline = createInlineStyleButton({
    style: 'UNDERLINE',
    children: <Icon name={underlineSVG} size="24px" />,
  });
  config.settings = {
    ...config.settings,
    richTextEditorInlineToolbarButtons: [
      Underline,
      ...config.settings.richTextEditorInlineToolbarButtons,
    ],
    nonContentRoutes: [
      // handled differently in getBaseUrl
      ...config.settings.nonContentRoutes,
      '/manage-slider',
    ],
  };

  config.views = {
    ...config.views,
    layoutViews: {
      ...config.views.layoutViews,
      full_view: CountryView,
      country_tab_view: CountryPageView,
      homepage_view: HomepageView,
      // ...layoutViews,
    },
  };

  // read @plone/volto/components/manage/Form/Field.jsx to understand this
  config.widgets = {
    ...config.widgets,
    vocabulary: {
      ...config.widgets.vocabulary,
      'fise.topics': TokenWidget,
      'fise.keywords': TokenWidget,
      'fise.publishers': TokenWidget,
    },
  };

  config.blocks = {
    ...config.blocks,

    groupBlocksOrder: [
      ...config.blocks.groupBlocksOrder,
      { id: 'custom_addons', title: 'Custom addons' }, // TODO: needs to be fixed
      { id: 'forests_specific', title: 'Forests Specific Blocks' },
    ],

    blocksConfig: {
      ...config.blocks.blocksConfig,
      europe_compare_block: {
        id: 'europe_compare_block',
        title: 'Europe Compare Block',
        view: EuropeCompareBlockView,
        edit: EuropeCompareBlockEdit,
        icon: chartIcon,
        group: 'forests_specific',
      },
      europe_forest_block: {
        id: 'europe_forest_block',
        title: 'Europe Forest Area Block',
        view: EuropeForestBlockView,
        edit: EuropeForestBlockEdit,
        icon: chartIcon,
        group: 'forests_specific',
      },
    },
  };

  config.viewlets = [
    { path: '/', component: ForestMetadata },
    ...(config.viewlets || []),
  ];

  return config;
}