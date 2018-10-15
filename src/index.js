import React from 'react';
import ReactDOM from 'react-dom';
import ReactJson from 'react-json-view';
import { asTransactionObject } from '@iota/transaction-converter';

import './index.css';

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trytes: '',
      txObject: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ trytes: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    try {
      const txObject = this._parseTransaction(this.state.trytes);
      this.setState({ txObject });
    } catch (err) {
      alert(err);
    }
  }

  _parseTransaction(trytes) {
    const txObject = asTransactionObject(trytes);

    txObject.timestamp = new Date(txObject.timestamp * 1000);

    txObject.attachmentTimestamp = new Date(txObject.attachmentTimestamp);
    txObject.attachmentTimestampLowerBound = new Date(
      txObject.attachmentTimestampLowerBound
    );
    txObject.attachmentTimestampUpperBound = new Date(
      txObject.attachmentTimestampUpperBound
    );

    return txObject;
  }

  render() {
    return (
      <div>
        <h2>Convert Transaction Trytes</h2>
        <h3>Transaction Trytes</h3>
        <form onSubmit={this.handleSubmit}>
          <textarea
            id="trytesinput"
            value={this.state.trytes}
            onChange={this.handleChange}
            cols={95}
            rows={28}
          />
          <button>Convert</button>
        </form>
        <div>
          <h3>Transaction Object</h3>
          <ReactJson
            src={this.state.txObject}
            name={false}
            theme="rjv-default"
            collapseStringsAfterLength={81}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<TransactionForm />, document.getElementById('root'));
