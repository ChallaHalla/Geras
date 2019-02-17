import React, { Component } from 'react';
import './NameList.css';

class NameList extends Component {
  render() {
    const names = this.props.names || [];
    return (
      <div>
        {names.map((n) => {
          return (
            <button
              className='button is-large is-fullwidth nameButton'
              name='username'
              value={n}
              onClick={(e) => {
                this.props.progressStage();
                this.props.handleChange(e);
              }}
            >
              {n}
            </button>
          );
        })}
      </div>
    );
  }
}
export default NameList;
