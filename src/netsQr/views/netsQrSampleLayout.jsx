import React, { Component } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Button from "@mui/material/Button";
import netsQrInfo from "../../assets/netsQrInfo.png";
import txnLoading from "../../assets/progressSpinner.gif";
import netsQrLogo from "../../assets/netsQrLogo.png";
import commonConfigs from "../../config";
import axios from "axios";
import { EventSourcePolyfill } from "event-source-polyfill";


class NetsQrSampleLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      convertTime: {},
      secondsNetsTimeout: 300, 
      amount: '0',
      txnId: "sandbox_nets|m|8ff8e5b6-d43e-4786-8ac5-7accf8c5bd9b",
      mobile: 0,
      netsQrPayment: txnLoading,
      netsQrRetrievalRef: "",
      netsQrGenerate: false,
      netsQrDisplayLogo: false,
      netsQrResponseCode: "",
      openApiPaasTxnStatus: 0,
      networkCode: "",
      instruction: "",
      errorMsg: "", 
    };
    this.netsTimer = 0;

    this.queryNets = this.queryNets.bind(this);
    this.startNetsTimer = this.startNetsTimer.bind(this);
    this.decrementNetsTimer = this.decrementNetsTimer.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async requestNets(amount, txnId, mobile) {
    this.setState({ netsQrGenerate: true })
var body = { 
    txn_id: txnId, 
    amt_in_dollars: amount, 
    notify_mobile: mobile
}

console.log(body);

await axios.post(commonConfigs.apiUrls.requestNetsApi(), body, { headers: commonConfigs.apiHeader })
    .then((res) => {
        console.log(res);
        var response = res.data.result.data;

        if (
        response.response_code == "00" &&
        response.txn_status == 1 &&
        response.qr_code !== "" &&
        response.qr_code !== null
        ) {
        localStorage.setItem("txnRetrievalRef", response.txn_retrieval_ref);
        this.startNetsTimer();
        this.setState({
            netsQrResponseCode: response.response_code,
            netsQrPayment: "data:image/png;base64," + response.qr_code,
            netsQrRetrievalRef: response.txn_retrieval_ref,
            networkCode: response.network_status,
            openApiPaasTxnStatus: response.txn_status
        });
        this.webhookNets();
        } else {
        this.setState({
            netsQrResponseCode:
            response.response_code === ""
                ? "N.A."
                : response.response_code,
            netsQrPayment: "",
            instruction: 
                response.network_status == 0 
                ? response.instruction 
                : "",
            errorMsg: 
                response.network_status !== 0 
                ? "Frontend Error Message" 
                : "",
            networkCode: response.network_status,
            openApiPaasTxnStatus: response.txn_status
        });
        }
    })
    .catch((err) => {
        console.log(err);
        window.location.href = "/nets-qr/fail";
    });
  }

  webhookNets() {
    if (this.s2sNetsTxnStatus) {
      this.s2sNetsTxnStatus.close();
    }
    const url = commonConfigs.apiUrls.webhookNetsApi(
      localStorage.getItem("txnRetrievalRef")
    );
    this.s2sNetsTxnStatus = new EventSourcePolyfill(url, {
      headers: commonConfigs.apiHeader,
      heartbeatTimeout: 150000,
    });

    this.s2sNetsTxnStatus.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      console.log(data.message);
      console.log("Message detected");
      if (data.message === "QR code scanned" && data.response_code === "00") {
        if (this.s2sNetsTxnStatus) {
          this.s2sNetsTxnStatus.close();
        }
        console.log(data);
        window.location.href = "/nets-qr/success";
      } else if (data.message === "Timeout") {
        if (this.s2sNetsTxnStatus) {
          this.s2sNetsTxnStatus.close();
        }
        this.queryNets();
      }
    });
  }

  async queryNets() {
    var netsTimeoutStatus = 0;
if (this.state.secondsNetsTimeout == 0) {
    netsTimeoutStatus = 1;
}

if (this.state.netsQrRetrievalRef) {
    var body = {
        txn_retrieval_ref: this.state.netsQrRetrievalRef,
        frontend_timeout_status: netsTimeoutStatus,
    };
    console.log(body);
    await axios.post(commonConfigs.apiUrls.queryNetsApi(), body, { headers: commonConfigs.apiHeader })
        .then((res) => {
            var response = res.data.result.data;
            console.log(response);

            if (response.response_code == "00" && response.txn_status == 1) {
                window.location.href = "/nets-qr/success";
            } else {
                window.location.href = "/nets-qr/fail";
            }
        })
        .catch((err) => {
            console.log(err);
            window.location.href = "/nets-qr/fail";
        });
      }
  }

  startNetsTimer() {
    if (this.netsTimer == 0 && this.state.secondsNetsTimeout > 0) {
      this.netsTimer = setInterval(this.decrementNetsTimer, 1000);
    }
  }
  convertTimeFormat(secs) {
    let minutes = Math.floor(secs / 60);
    let seconds = secs % 60;
  
    return {
      m: minutes,
      s: seconds,
    };
  }

  decrementNetsTimer() {
    let secondsNetsTimeout = this.state.secondsNetsTimeout - 1;
    this.setState({
      convertTime: this.convertTimeFormat(secondsNetsTimeout),
      secondsNetsTimeout: secondsNetsTimeout,
    });

    if (secondsNetsTimeout == 0) {
      clearInterval(this.netsTimer);
    }
  }

  handleNetsReq() {
    this.requestNets(this.state.amount, this.state.txnId, this.state.mobile); 
    this.setState({ netsQrDisplayLogo: true });
    document.getElementById('btnNets').style.display = 'none';
  }

  handleNetsCancel() {
    this.setState({
    netsQrRetrievalRef: ""
    }, () => window.location.reload(false))
    this.setState({ netsQrDisplayLogo: false });
  }


  
  render() {
    return (
      <div style={{ position: "relative" }}>
        <Link to="/" style={{
          position: "absolute", 
          top: "20px", 
          left: "20px", 
          fontSize: "30px", 
          color: "#333", 
          textDecoration: "none",
        }}>
          <IoIosArrowBack />
        </Link>
        <div style={{ margin: "50px" }}>
          <div style={{ margin: "50px" }}>
            <div
              className="content"
              style={{
                marginTop: "10%",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: 0,
                height: "80vh",
                backgroundColor: "#f0f4f7",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                padding: "20px",
              }}
            >
              <div
                className="button"
                id="btnNets"
                style={{ marginTop: "20px" }}
              >
                {!this.state.netsQrDisplayLogo && (
                  <img
                    src={netsQrLogo}
                    alt="NETS QR Logo"
                    style={{ top: "100px", height: "150px" }}
                  />
                )}
                <h2 className="text" style={{ fontSize: "18px" }}>
                  My NETS QR
                </h2>
                    Amount in SGD<input
                      type="number"
                      name="amount"
                      value={this.state.amount}
                      onChange={this.handleInputChange}
                      style={{
                        fontSize: "16px",
                        padding: "8px",
                        width: "300px",
                        margin: "20px auto",
                        display: "block",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                      min="1"
                    />
                <Button
                  variant="contained"
                  sx={{ width: 300 }}
                  style={{
                    backgroundColor: "dodgerblue",
                    borderRadius: "10px",
                    fontSize: "14px",
                    textDecoration: "none",
                    height: "50px",
                  }}
                  onClick={() => this.handleNetsReq()} 
                >
                  Generate NETS QR {}
                </Button>
              </div>

              {this.state.instruction === "" &&
              this.state.errorMsg === "" &&
              this.state.netsQrGenerate === true ? (
                <div className="netsQrPaymentGatewayWebpage">
                  <h2
                    className="text"
                    style={{
                      fontSize: "20px",
                      marginBottom: "10px",
                      marginTop: "20px",
                    }}
                  >
                    SCAN TO PAY
                  </h2>
                  <p
                    className="text"
                    style={{ fontSize: "18px", fontWeight: "300" }}
                  >
                    Scan with your bank app to complete your payment
                  </p>
                  <span>
                    {this.state.netsQrPayment !== ""}
                    <div id="netsQrPayment" className="netsQrCode">
                      <img
                        id="imgNetsQr"
                        height="auto"
                        width="30%"
                        src={this.state.netsQrPayment}
                      />
                    </div>
                    <h2 className="netsTimer" style={{ fontSize: "16px" }}>
                      {this.state.convertTime.m} : {this.state.convertTime.s}
                    </h2>
                  </span>
                  <img
                    id="netsQrInfo"
                    height="auto"
                    width="40%"
                    src={netsQrInfo}
                  />
                  <div
                    className="button"
                    id="btnCancel"
                    style={{ marginTop: "20px" }}
                  >
                    <Button
                      variant="contained"
                      sx={{ width: 300 }}
                      style={{
                        backgroundColor: "#E02020",
                        borderRadius: "10px",
                        fontSize: "14px",
                        textDecoration: "none",
                        height: "50px",
                      }}
                      onClick={() => this.handleNetsCancel()}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="netsQrPaymentGatewayWebpage">
                  {this.state.netsQrResponseCode !== "00" && 
                  this.state.netsQrResponseCode !== "" && 
                  this.state.openApiPaasTxnStatus !== 1 && (
                    <>
                      <h2 className="text" style={{ fontSize: "42px", marginBottom: "10px" }}>
                        NETS Response Code: {this.state.netsQrResponseCode}
                      </h2>
                      {this.state.instruction !== "" || this.state.errorMsg !== "" ? (
                        <>
                          <h2 className="text" style={{ fontSize: "42px"}}>
                            {this.state.instruction}
                          </h2>
                          <h2 className="text" style={{ fontSize: "42px"}}>
                            {this.state.errorMsg}
                          </h2>
                        </>
                      ) : (
                          <h2 className="text" style={{ fontSize: "42px", marginBottom: "10px" }}>
                            Default Error Message
                          </h2>
                      )}
                      <Button
                        variant="contained"
                        sx={{ width: 300 }}
                        style={{
                          backgroundColor: "#E02020",
                          borderRadius: "10px",
                          fontSize: "14px",
                          textDecoration: "none",
                          height: "50px",
                          marginTop: "30px"
                        }}
                        onClick={() => this.handleNetsCancel()}
                      >
                        Cancel
                      </Button>
                    </>
                  )} 
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NetsQrSampleLayout;