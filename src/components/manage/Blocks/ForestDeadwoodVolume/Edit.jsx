import React, { Component } from 'react';
// import { Form as UiForm } from 'semantic-ui-react';
// import { Field } from '@plone/volto/components'; // EditBlock
import DataConnectedValue from 'volto-datablocks/DataConnectedValue';
import EditBlock from 'volto-datablocks/DataConnectedBlock/EditBlock';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: props.data.url || null,
      columns: {
        column1: props.data.columns?.column1 || null,
      },
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  updateData(obj) {
    this.setState({ ...this.state, ...obj }, this.onSubmit);
  }

  onSubmit() {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      ...this.state,
    });
  }

  render() {
    return (
      <div className="block-container">
        <EditBlock
          updateData={this.updateData}
          block="data-entity"
          data={this.state}
          title="Data block parameters"
        />
        <div className="forest-specific-block forest-area-block">
          <h5>Forest deadwood volume</h5>
          <div className="land-data-wrapper eu28-data purple">
            <div className="land-data">
              <span>
                {this.props.data.url && this.props.data.columns?.column1 && (
                  <DataConnectedValue
                    url={this.props.data.url}
                    column={this.props.data.columns.column1.value}
                    format={this.props.data.columns.column1.format}
                  />
                )}
              </span>
            </div>
            <div className="land-data-content">
              <span>m3/ha</span>
              standing deadwood volume
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
