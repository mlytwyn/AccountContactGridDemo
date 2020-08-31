import React from 'react';
import { DatePicker } from '@progress/kendo-react-dateinputs';

export default class RangeFilterCell extends React.Component {
  minTextBox;
  maxTextBox;

  inRange = (current, { min, max }) => {
    return (
      (min === null || Date.parse(current) >= Date.parse(min)) &&
      (max === null || Date.parse(current) <= Date.parse(max))
    );
  };

  onChange = (event) => {
    this.props.onChange({
      value: { min: this.minTextBox.value, max: this.maxTextBox.value },
      operator: this.inRange,
      syntheticEvent: event.syntheticEvent,
    });
  };

  onClearButtonClick = (event) => {
    event.preventDefault();
    this.props.onChange({
      value: null,
      operator: '',
      syntheticEvent: event,
    });
  };

  render() {
    const value = this.props.value || null;
    return (
      <div style={{ width: '140px' }}>
        From:
        <span style={{ margin: '0 6px 0 0px' }}>
          <DatePicker
            formatPlaceholder={{ year: 'y', month: 'M', day: 'd' }}
            width='110px'
            value={value && value.min}
            ref={(date) => {
              this.minTextBox = date;
            }}
            onChange={this.onChange}
          />
        </span>
        To:
        <span style={{ margin: '0 2px 0 2px' }}>
          <DatePicker
            formatPlaceholder={{ year: 'y', month: 'M', day: 'd' }}
            width='110px'
            value={value && value.max}
            ref={(date) => {
              this.maxTextBox = date;
            }}
            onChange={this.onChange}
          />
        </span>
        <button
          className='k-button k-button-icon k-clear-button-visible'
          title='Clear'
          disabled={!value}
          onClick={this.onClearButtonClick}
        >
          <span className='k-icon k-i-filter-clear' />
        </button>
      </div>
    );
  }
}
