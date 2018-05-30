import '@babel/polyfill';

import React from 'react';
import { Alert, Col, Layout, Row } from 'antd';
import FaucetStatus from './faucetStatus';
import AddressForm from './addressForm';

const { Header, Content, Footer, Sider } = Layout;

const App = props => (
  <Layout>
    <Header style={{ textAlign: 'center', backgroundColor: '#f0f2f5' }}>
      <h1>⛽ NEO Privatenet Faucet</h1>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Layout>
        <Content style={{ backgroundColor: '#ffffff', padding: 32, minHeight: 'calc(100vh - 133px)' }}>
          <FaucetStatus {...props} />
          <Row style={{ margin: '32px 0' }}>
            <Col xs={{ span: 20, push: 2 }} md={{ span: 16, push: 4 }} lg={{ span: 12, push: 6 }} xl={{ span: 8, push: 8 }} >
              <h2>Guidelines</h2>
              <ul>
                <li>Enter your NEO address in the form below and click on the <code>Check</code> button</li>
                <li>If your address hasn't requested NEO and GAS recently, you will be able to submit your request</li>
                <li>Each request will be given {props.config.gasReward} GAS and {props.config.neoReward} NEO</li>
                <li>After requesting NEO and GAS, your address will not be able to request NEO and Gas for {props.config.minBlocks} blocks</li>
              </ul>
            </Col>
          </Row>
          <AddressForm {...props} />
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Made by City Of Zion
    </Footer>
  </Layout>
);

export default App;
