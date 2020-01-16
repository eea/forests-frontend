import React from 'react';
import EditBlock from 'volto-datablocks/DataConnectedBlock/EditBlock';
import View from './View';

const SCHEMA = {
  perc: {
    title: 'Percentage column',
    defaultformat: 'percentage',
  },
  totalArea: {
    title: 'Total Area column',
    defaultformat: 'compactnumber',
  },
};

const Edit = props => {
  // data is like {provider_url: '', columns: {key: {value, format}}}
  return (
    <div className="block-container">
      <EditBlock
        onChange={data => {
          props.onChangeBlock(props.block, {
            ...props.data,
            ...data,
          });
        }}
        schema={SCHEMA}
        block="data-entity"
        data={props.data}
        title="Forest Coverage block"
        selected={props.selected}
      />
      <View {...props} />
    </div>
  );
};

export default Edit;