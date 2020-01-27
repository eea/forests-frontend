import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import ConnectedChart from 'volto-plotlycharts/ConnectedChart';
// import ViewText from '@plone/volto/components/manage/Blocks/Text/View';
import ViewConnectedValue from './ViewConnectedValue';
import SourceView from '~/components/theme/Blocks/SourceView'

const EmbedChartView = props => {
  // console.log('props in chart view', props);
  return (
    <div className="chartWrapperView">
      {props.data.block_title ? <h5>{props.data.block_title}</h5> : ''}
      <div className="block-inner-wrapper">
        <Grid>
          <Grid.Column width={4}>
            <ViewConnectedValue {...props} />
          </Grid.Column>
          <Grid.Column width={8}>
            {props.data.chartData ? (
              <ConnectedChart
                data={props.data.chartData}
                className="embedded-block-chart"
              />
            ) : (
              <div>No valid data.</div>
            )}
          </Grid.Column>
          <Grid.Column width={12}>
            <div>
              <SourceView
                initialSource={props.data.chart_source}
                initialSourceLink={props.data.chart_source_link}
                multipleSources={props.data.chartSources}
              />
            </div>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

EmbedChartView.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EmbedChartView;
