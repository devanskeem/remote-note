import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
 
class MyDatePicker extends Component {
  state = {
    date: new Date(),
  }
 
  onDateChange = date => {
      this.setState({ date })
      this.props.updateDate(this.state.date)
  }
 
  render() {
    return (
      <div>
        <DatePicker
          id='date-picker'
          onChange={this.onDateChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default MyDatePicker