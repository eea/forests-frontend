import React, { useState } from 'react';
import DataConnectedValue from 'volto-datablocks/DataConnectedValue';
import { SourceView } from 'volto-datablocks/Sources';

import DefaultView from '../DefaultView';

const schema = require('./schema.json');
const View = props => {
  const [state, setState] = useState({
    onChange: newState => {
      setState({ ...state, ...newState });
    },
  });
  const view = (
    <div className="forest-block-wrapper">
      <div className="forest-specific-block forest-comparation">
        {props.data?.block_title ? <h5>{props.data.block_title}</h5> : ''}

        <div className="land-data-wrapper">
          <div className="land-data">
            <span>
              <DataConnectedValue
                filterIndex={state.ids?.[0] || 0}
                url={
                  props.data?.providers?.['data_provider']?.path ||
                  props.data?.provider_url
                }
                column={props.data?.columns?.total?.value}
                format={props.data?.columns?.total?.format}
                placeholder="_"
              />
            </span>
          </div>
          <div className="land-data-content">
            <span>{props.data?.columns?.totalUnit?.value}</span>
            {' ' + (props.data?.columns?.totalText?.value || '')}
          </div>
        </div>

        <div className="ui bulleted list">
          <div className="item">
            {props.data?.columns?.data_1_text?.value ||
              props.data?.europe_data_1_name}
            <span>
              {props.data?.columns?.data_1_quantity?.value ||
                props.data?.europe_data_1_value}
            </span>
          </div>
          <div className="item">
            {props.data?.columns?.data_2_text?.value ||
              props.data?.europe_data_2_name}
            <span>
              {props.data?.columns?.data_2_quantity?.value ||
                props.data?.europe_data_2_value}
            </span>
          </div>
        </div>

        <div>
          {props.data?.chart_source &&
            props.data?.chart_source_link &&
            props.data?.chartSources && (
              <SourceView
                initialSource={props.data.chart_source}
                initialSourceLink={props.data.chart_source_link}
                multipleSources={props.data.chartSources}
                providerUrl={
                  props?.data?.providers?.['data_provider']?.path ||
                  props?.data?.provider_url
                }
              />
            )}
        </div>
      </div>
    </div>
  );
  return (
    <DefaultView
      {...props}
      schema={schema}
      view={view}
      onChange={state.onChange}
    />
  );
};

export default View;
