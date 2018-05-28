
import React from 'react';
import styled from 'styled-components';
import { Alert, Col, Layout, Row } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const App = props => (
  <Layout>
    <Header style={{ textAlign: "center", backgroundColor: "#f0f2f5" }}>
      <h1>⛽ NEO Privatenet Faucet</h1>
    </Header>
    <Content style={{ padding: "0 50px" }}>
      <Layout>
        <Content style={{ backgroundColor: "#ffffff", padding: 32, minHeight: "calc(100vh - 133px)" }}>
          <Row>
            <Col xs={{ span: 20, push: 2 }} md={{ span: 16, push: 4 }} lg={{ span: 12, push: 6 }} xl={{ span: 8, push: 8 }} >
              <Alert
                message="Ready for refill"
                description="Your address hasn't used the faucet recently, you're good to go."
                type="success"
                showIcon
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: "center" }}>
      Made by City Of Zion
    </Footer>
  </Layout>
);

export default App;
