import React from 'react';
import { Row, Col, Alert, Input, Button } from 'antd';
import { get } from 'axios';

const faucetStatuses = [
  'unchecked',
  'eligible',
  'requesting',
  'funded',
  'rejected'
]

export default class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: faucetStatuses[0],
    };
  }

  checkAddress = async address => {
    const { status } = await get(`${this.props.config.faucetSite}/check/${address}`);
    if (status === 200) {
      this.setState({ address, status: faucetStatuses[1] });
    } else {
      this.setState({ status: faucetStatuses[4] });
    }
  }

  request = async () => {
    this.setState({ status: faucetStatuses[3] })
    const { status } = await get(`${this.props.config.faucetSite}/request/${this.state.address}`);
    if (status === 200) {
      this.setState({ status: faucetStatuses[3] });
    } else {
      this.setState({ status: faucetStatuses[4] });
    }
  }

  render() {
    return(
      <Row>
        <Col xs={{ span: 20, push: 2 }} md={{ span: 16, push: 4 }} lg={{ span: 12, push: 6 }} xl={{ span: 8, push: 8 }} >
          <Input.Search
            autoFocus
            placeholder="Enter your NEO address here"
            enterButton="Check"
            onSearch={this.checkAddress}
          />
          {this.state.status === faucetStatuses[0] && (
            <Alert
              message="Check your NEO address"
              description="Enter your address in the form above and click Check."
              type="warning"
              showIcon
              style={{ margin: '16px 0' }}
            />
          )}
          {(this.state.status === faucetStatuses[1] || this.state.status === faucetStatuses[2]) && (
            <React.Fragment>
              <Alert
                message="Ready for refill"
                description="Your address hasn't used the faucet recently, click Request and you're good to go."
                type="success"
                showIcon
                style={{ margin: '16px 0' }}
              />
              <div style={{ textAlign: 'right' }}>
                {
                  this.state.status == faucetStatuses[1]
                  ? <Button type="primary" onClick={this.request}>Request</Button>
                  : <Button type="primary" loading disabled>Requesting</Button>
                }
              </div>
            </React.Fragment>
          )}
          {this.state.status === faucetStatuses[3] && (
            <Alert
              message="Funded! 🎉"
              description="Congratulations! Happy developing!"
              type="success"
              showIcon
              style={{ margin: '16px 0' }}
            />
          )}
          {this.state.status === faucetStatuses[4] && (
            <Alert
              message="Not eligible for refill!"
              description="You've used this faucet recently!"
              type="error"
              showIcon
              style={{ margin: '16px 0' }}
            />
          )}
        </Col>
      </Row>
    );
  }
}
