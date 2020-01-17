import React, { useState } from 'react';
import { BodyClass } from '@plone/volto/helpers';
import {
  Checkbox,
  Dropdown,
  Segment,
  Container,
  Label,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Slider } from 'react-semantic-ui-range';
import backgroundGraph from './assets/search-date-graph.png';

const countriesOptions = [
  {
    text: 'Romania',
    value: 'Romania',
  },
  {
    text: 'Bulgaria',
    value: 'Bulgaria',
  },
];

const SearchFilters = ({ data, activeTab }) => {
  const [multipleValues, setMultipleValues] = useState([1950, 2018]);

  const settings = {
    start: [1950, 2019],
    min: 1920,
    max: 2100,
    step: 1,
    onChange: value => {
      setMultipleValues(value);
    },
  };

  return (
    <div className="filters-container">
      <BodyClass />
      <div className="filters-head">
        <h3 className="header">FILTERS</h3>
        <h5 className="clear-filters">CLEAR</h5>
      </div>
      <div className="filters-area">
        <h3>Topics</h3>
        <div className="checkbox-area">
          <div className="checkbox-column">
            <Checkbox className="checkbox" label="All" />
            <Checkbox className="checkbox" label="Damage" />
            <Checkbox className="checkbox" label="Area" />
            <Checkbox className="checkbox" label="Growing Stock" />
          </div>
          <div className="checkbox-column">
            <Checkbox className="checkbox" label="Biomass" />
            <Checkbox className="checkbox" label="Carbon Stock" />
            <Checkbox className="checkbox" label="Protection" />
            <Checkbox className="checkbox" label="Felling" />
          </div>
          <div className="checkbox-column">
            <Checkbox className="checkbox" label="Deadwood" />
            <Checkbox className="checkbox" label="Land-Cover" />
          </div>
        </div>
      </div>
      {activeTab === 0 && (
        <div className="filters-area">
          <h3>Countries and regions</h3>
          <Dropdown
            compact={true}
            className="multiple-select"
            placeholder="Choose one or more"
            fluid
            multiple
            search
            selection
            options={countriesOptions}
          />
        </div>
      )}
      <div className="filters-area">
        <h3>NUTS Level</h3>
        <div className="checkbox-area">
          <div className="checkbox-column">
            <Checkbox className="checkbox" label="Level 0" />
            <Checkbox className="checkbox" label="Level 3" />
          </div>
          <div className="checkbox-column">
            <Checkbox className="checkbox" label="Level 1" />
            <Checkbox className="checkbox" label="Level 4" />
          </div>
          <div className="checkbox-column">
            <Checkbox className="checkbox" label="Level 2" />
            <Checkbox className="checkbox" label="Level 5" />
          </div>
        </div>
      </div>
      {activeTab === 0 && (
        <div className="filters-area">
          <h3>Collection method</h3>
          <div className="checkbox-area collection">
            <div className="checkbox-column">
              <Checkbox
                className="checkbox"
                label="State of Europe's Forests"
              />
              <Checkbox
                className="checkbox"
                label="Forest Resource Assessment"
              />
            </div>
          </div>
          <div className="checkbox-area collection">
            <div className="checkbox-column">
              <Checkbox className="checkbox" label="Corine Land Cover" />
              <Checkbox className="checkbox" label="Forest Map / HRL Forest" />
              <Checkbox className="checkbox" label="Global Forest Watch" />
              <Checkbox
                className="checkbox"
                label="Maltese Planning Authority"
              />
            </div>
          </div>
        </div>
      )}
      <div className="filters-area">
        <h3>Published year</h3>
        <Container>
          <div
            style={{
              backgroundImage: `url(${backgroundGraph})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              paddingTop: '70px',
            }}
          >
            <Slider
              style={{
                paddingTop: '10px',
                marginBottom: '10px',
                inner: { margin: '0' },
              }}
              discrete
              multiple
              color="red"
              settings={settings}
            />
          </div>
          <div className="slider-labels">
            {multipleValues.map((value, i) => (
              <Label color="transparent" key={i}>
                {value}
              </Label>
            ))}
          </div>
        </Container>
      </div>
      <div className="filters-area">
        <h3>Results Format</h3>
        <div className="checkbox-area">
          <div className="checkbox-column">
            <Checkbox className="checkbox" label="Tablular Data" />
            <Checkbox className="checkbox" label="PDF Document" />
          </div>
          <div className="checkbox-column">
            <Checkbox className="checkbox" label="Documentation" />
            <Checkbox className="checkbox" label="Article" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
