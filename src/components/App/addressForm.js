import React from 'react';
import { Row, Col, Alert, Input, Button } from 'antd';
import { get } from 'axios';

const faucetStatuses = [
  'unchecked',
  'requesting',
  'generating',
  'funded',
  'rejected',
  'error',
]

export default class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: faucetStatuses[0],
      address: '',
      generatedAddress: '',
      wif: '',
      tx: '',
    };
  }

  handleAddress = e => {
    const address = e.target.value
    console.log(address);
    this.setState({ address });
  }

  request = async () => {
    this.setState({ status: faucetStatuses[1] })
    try {
      const { status, data } = await get(`${this.props.config.faucetSite}/request/${this.state.address}`);
      if (status === 200) {
        this.setState({ status: faucetStatuses[3], tx: data });
      } else {
        this.setState({ status: faucetStatuses[4] });
      }
    } catch(e) {
      this.setState({ status: faucetStatuses[5] });
    }
  }

  generate = async () => {
    this.setState({ status: faucetStatuses[2] })
    const { status, data } = await get(`${this.props.config.faucetSite}/generate`);
    if (status === 200) {
      this.setState({ status: faucetStatuses[3], ...data });
    } else {
      this.setState({ status: faucetStatuses[5] });
    }
  }

  render() {
    let successMessage;
    if (this.state.status === faucetStatuses[3]) {
      successMessage = this.state.wif !== ''
        ? `Congratulations! Your address is ${this.state.generatedAddress} and your WIF is ${this.state.wif}, look for the following tx: ${this.state.tx}. Happy developing!`
        : `Congratulations, look for the following tx: ${this.state.tx}. Happy developing!`;
    }
    return(
      <Row>
        <Col xs={{ span: 20, push: 2 }} md={{ span: 16, push: 4 }} lg={{ span: 12, push: 6 }} xl={{ span: 8, push: 8 }} >
          <Input
            autoFocus
            placeholder="Enter your NEO address here"
            onChange={this.handleAddress}
            value={this.state.address}
          />
          {(this.state.status === faucetStatuses[0]) && (
            <Alert
              message="Request your NEO and GAS"
              description="Enter your address and click request. Or generate a new address filled with NEO and GAS by clicking Generate"
              type="info"
              showIcon
              style={{ margin: '16px 0' }}
            />
          )}
          {(this.state.status === faucetStatuses[1]) && (
            <Alert
              message="Requesting your NEO and GAS"
              description="Hold on a few moments!"
              type="warning"
              showIcon
              style={{ margin: '16px 0' }}
            />
          )}
          {(this.state.status === faucetStatuses[2]) && (
            <React.Fragment>
              <Alert
                message="Generating a new address"
                description="Your new WIF will appear soon!"
                type="warning"
                showIcon
                style={{ margin: '16px 0' }}
              />
            </React.Fragment>
          )}
          {this.state.status === faucetStatuses[3] && (
            <Alert
              message="Funded! 🎉"
              description={successMessage}
              type="success"
              showIcon
              style={{ margin: '16px 0' }}
            />
          )}
          {this.state.status === faucetStatuses[4] && (
            <Alert
              message="Not eligible for refill!"
              description="You've used this faucet recently! Try again with a different address or generate a new one."
              type="error"
              showIcon
              style={{ margin: '16px 0' }}
            />
          )}
          {this.state.status === faucetStatuses[5] && (
            <Alert
              message="Something went wrong!"
              description="Refresh this page or try again later."
              type="error"
              showIcon
              style={{ margin: '16px 0' }}
            />
          )}
          <div style={{ textAlign: 'right' }}>
            {
              this.state.status === faucetStatuses[0] || this.state.status === faucetStatuses[4]
              ? <Button type="primary" onClick={this.generate} style={{ marginRight: '8px' }}>Generate</Button>
              : this.state.status === faucetStatuses[2]
                ? <Button type="primary" loading disabled style={{ marginRight: '8px' }}>Generating</Button>
                : <Button type="primary" disabled style={{ marginRight: '8px' }}>Generate</Button>
            }
            {
              this.state.status === faucetStatuses[0] || this.state.status === faucetStatuses[4]
              ? <Button type="primary" onClick={this.request}>Request</Button>
              : this.state.status === faucetStatuses[1]
                ? <Button type="primary" loading disabled>Requesting</Button>
                : <Button type="primary" disabled>Request</Button>
            }
          </div>
        </Col>
      </Row>
    );
  }
}
