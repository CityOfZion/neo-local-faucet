import React from 'react';
import { Alert, Col, Row } from 'antd';

const faucetStatus = props => (
  <Row>
    <Col xs={{ span: 20, push: 2 }} md={{ span: 16, push: 4 }} lg={{ span: 12, push: 6 }} xl={{ span: 8, push: 8 }} >
      <h2>Current block height: {props.blockHeight}</h2>
      { props.faucetStatus ? (
        <Alert
          message="Faucet status: healthy"
          type="success"
          showIcon
        />
      ) : (
        <Alert
          message="Faucet status: not healthy"
          type="error"
          showIcon
        />
      ) }
    </Col>
  </Row>
);

export default faucetStatus;
