import "@babel/polyfill";

import React from "react";
import { Alert, Col, Layout, Row } from "antd";
import { get } from "axios";

import FaucetStatus from "./faucetStatus";
import AddressForm from "./addressForm";

const { Header, Content, Footer, Sider } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const { blockHeight, faucetStatus } = props.config;
    this.state = { blockHeight, faucetStatus };
  }

  componentWillMount() {
    if (!process || !process.env || !process.env.isServer)
      this.scheduleFaucetCheck();
  }

  scheduleFaucetCheck = () => {
    setTimeout(this.checkFaucetStatus, 8500);
  };

  checkFaucetStatus = async () => {
    const { data } = await get(`${this.props.config.faucetSite}/update`);
    this.setState(data);
    this.scheduleFaucetCheck();
  };

  render() {
    const { config } = this.props;
    return (
      <Layout>
        <Header style={{ textAlign: "center", backgroundColor: "#f0f2f5" }}>
          <h1>⛽ neo-local Faucet</h1>
        </Header>
        <Content style={{ padding: "0" }}>
          <Layout>
            <Content
              style={{
                backgroundColor: "#ffffff",
                padding: 32,
                minHeight: "calc(100vh - 133px)"
              }}
            >
              <FaucetStatus config={this.state} />
              <Row style={{ margin: "32px 0" }}>
                <Col
                  xs={{ span: 20, push: 2 }}
                  md={{ span: 16, push: 4 }}
                  lg={{ span: 12, push: 6 }}
                  xl={{ span: 8, push: 8 }}
                >
                  <h2>Guidelines</h2>
                  <ul>
                    <li>
                      Enter your NEO address in the form below and click on the{" "}
                      <code>Request</code> button
                    </li>
                    <li>
                      If your address hasn't requested NEO and GAS recently, you
                      will be able to submit your request
                    </li>
                    <li>
                      You can also use the <code>Generate</code> button to
                      create a new NEO address pre-filled with NEO/GAS
                    </li>
                    <li>
                      Each request will be given {config.gasReward} GAS and{" "}
                      {config.neoReward} NEO
                    </li>
                    <li>
                      After requesting NEO and GAS, your address will not be
                      able to request NEO and GAS for {config.minBlocks} blocks
                    </li>
                  </ul>
                </Col>
              </Row>
              <AddressForm config={config} />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>Made by City Of Zion</Footer>
      </Layout>
    );
  }
}
