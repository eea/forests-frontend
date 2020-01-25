import React from 'react';
import DataConnectedValue from 'volto-datablocks/DataConnectedValue';
// import { Link } from 'react-router-dom';

const View = props => {
  // console.log('block props', props);
  return (
    <div className="forest-block-wrapper">
      <div className="forest-specific-block forest-area-block">
        {props.data?.block_title ? <h5>{props.data.block_title}</h5> : ''}
        <div className="land-data-wrapper eu28-data">
          <div className="land-data">
            <span>
              <DataConnectedValue
                url={props.data.provider_url}
                column={props.data?.columns?.perc?.value}
                format={props.data?.columns?.perc?.format}
                placeholder="_"
              />
            </span>
          </div>
          <div className="land-data-content">
            {props.data?.columns?.percText?.value}
            <span>
              <DataConnectedValue
                url={props.data.provider_url}
                column={props.data?.columns?.totalArea?.value}
                format={props.data?.columns?.totalArea?.format}
                placeholder="_"
              />{' '}
              {props.data?.columns?.totalAreaUnit?.value}
            </span>
          </div>
        </div>
        <div>
          <a
            className="discreet block_source"
            href={props.data.chart_source_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.data.chart_source}
          </a>
        </div>
      </div>
    </div>
  );
};

export default View;
