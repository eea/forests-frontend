import React from 'react';
import EditBlock from 'volto-datablocks/DataConnectedBlock/EditBlock';
import View from './View';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getBasePath } from 'volto-datablocks/helpers';
import { setConnectedDataParameters } from 'volto-datablocks/actions';
let SCHEMA = {
  eu28_data_provider: {
    title: 'EU28 data provider',
    defaultformat: 'compactnumber',
    type: 'data-provider',
  },
  eu28_total: {
    title: 'EU28 volume column',
    defaultformat: 'compactnumber',
    type: 'data-provider-entity',
    provider: 'eu28_data_provider'
  },
  eu28_total_text: {
    title: 'EU28 volume text',
    defaultformat: 'compactnumber',
    static: true,
  },
  eu28_total_unit: {
    title: 'EU28 volume unit',
    defaultformat: 'compactnumber',
    static: true,
  },
  eea39_data_provider: {
    title: 'EEA39 data provider',
    defaultformat: 'compactnumber',
    type: 'data-provider',
  },
  eea39_total: {
    title: 'EEA39 volume column',
    defaultformat: 'compactnumber',
    type: 'data-provider-entity',
    provider: 'eea39_data_provider'
  },
  eea39_total_text: {
    title: 'EEA39 volume text',
    defaultformat: 'compactnumber',
    static: true,
  },
  eea39_total_unit: {
    title: 'EEA39 volume unit',
    defaultformat: 'compactnumber',
    static: true,
  },
};
const Edit = props => {
  if (
    Object.keys(props.connected_data_parameters.byContextPath).length == 0 &&
    Object.keys(props.connected_data_parameters.byProviderPath).length == 0
  ) {
    SCHEMA = {
      ...SCHEMA,
      i: {
        title: 'Key',
        defaultformat: 'compactnumber',
        static: true,
      },
      v: {
        title: 'For',
        defaultformat: 'compactnumber',
        static: true,
      },
    };
  }
  return (
    <div>
      <EditBlock
        onChange={data => {
          if (data?.columns?.i?.value && data?.columns?.v?.value) {
            const path = getBasePath(props.pathname);
            const byPath = props?.connected_data_parameters?.byPath;
            const connected_data_parameters =
              byPath && byPath[path]?.override.length > 0
                ? byPath[path]?.override[0]
                : null;
            if (
              connected_data_parameters === null ||
              (connected_data_parameters?.i !== data.columns.i.value ||
                connected_data_parameters?.v.join(',') !== data.columns.v.value)
            ) {
              const parameters = [
                {
                  i: data.columns.i.value || '',
                  o: 'plone.app.querystring.operation.selection.any',
                  v: data.columns.v.value.split(',') || '',
                },
              ];
              props.dispatch(
                setConnectedDataParameters(
                  path.replace('/edit', ''),
                  parameters,
                ),
              );
            }
          }
          props.onChangeBlock(props.block, {
            ...props.data,
            ...data,
          });
        }}
        schema={SCHEMA}
        block="data-entity"
        data={props.data}
        title="Volume block"
        selected={props.selected}
      />
      <View {...props} />
    </div>
  );
};
export default compose(
  connect((state, props) => ({
    connected_data_parameters: state.connected_data_parameters,
    pathname: state.router.location.pathname,
  })),
)(Edit);
