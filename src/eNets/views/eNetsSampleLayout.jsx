import { Component } from "react";
import commonConfigs from "../../config";
import axios from "axios";
import Button from '@mui/material/Button';
import txnLoading from "../../assets/progressSpinner.gif"
import eNetsLogo from '../../assets/eNetsLogo.png';
import { generateHmac } from '../../hmacUtil'; // hmac challenge

class ENetsSampleLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            convertTime: {},
            secondsNetsTimeout: 0,
            firstTimeoutNetsQuery: 0, 
            secondTimeoutNetsQuery: 0, 
            amount: '3',
            txnId: "sandbox_nets|m|8ff8e5b6-d43e-4786-8ac5-7accf8c5bd9b",
            mobile: 0,
            eNetsPayment: txnLoading,
            eNetsPaymentMethod: "",
            eNetsRetrievalRef: "",
            eNetsGenerate: false,
            eNetsDisplayLogo: false,
            eNetsDisplayTimer: false,
            eNetsTxnReqPayload: null,
            openApiPaasTxnStatus: 0,
            networkCode: "",
            instruction: "",
            errorMsg: "", // Web Developer may input own error messages
            // netsSecretKey: // TODO HMAC Challenge 2: Fill in Secret Key provided by NETS Developer Portal
            // hmacChallengeGenerate: // TODO HMAC Challenge 3: Initialize state for displaying generated HMAC
        };
        this.netsTimer = 0;
        this.startNetsTimer = this.startNetsTimer.bind(this);
        this.decrementNetsTimer = this.decrementNetsTimer.bind(this);
        this.eNetsJavascriptPluginListener = this.eNetsJavascriptPluginListener.bind(this);
        this.setNetsTimeout = this.setNetsTimeout.bind(this)
    }

    startNetsTimer() {
        if (this.netsTimer == 0 && this.state.secondsNetsTimeout > 0) {
            this.netsTimer = setInterval(this.decrementNetsTimer, 1000);
        }
    }

    stopNetsTimer() {
        clearInterval(this.netsTimer);
        this.netsTimer = 0;
    }

    convertTimeFormat(secs) {
        let minutes = Math.floor(secs / 60);
        let seconds = secs % 60;
      
        return {
          m: minutes,
          s: seconds,
        };
      }
    
    eNetsJavascriptPluginListener() {
        // TODO 12: Fill in codes to listen for payment mode selection event
        const interval = setInterval(() => {
        const btnNext = document.getElementById("submitSelectedService");
        const paymentMethods = document.querySelectorAll(
        'input[name="paymentOption"]'
        );

        const setPaymentMethod = (event) => {
        this.setState({ eNetsPaymentMethod: event.target.value });
        };
        
        if (btnNext && paymentMethods.length) {
        clearInterval(interval);
        paymentMethods.forEach((input) =>
            input.addEventListener("change", setPaymentMethod)
        );
        btnNext.addEventListener("click", this.setNetsTimeout);
        }
    }, 100);
    }

    setNetsTimeout() {
        // TODO 13: Fill in codes to initialize different payment mode timeout duration
        const { eNetsPaymentMethod } = this.state;
        if (eNetsPaymentMethod) {
            const paymentMethodImgSrc = document.querySelector(
            `input[name="paymentOption"][value="${eNetsPaymentMethod}"] + img`
            ).src;

            this.setState({ eNetsDisplayTimer: true }, () => {
                this.startNetsTimer();
            });

            if (paymentMethodImgSrc.includes("QRNETS")) {
                this.setState({
                    secondsNetsTimeout: 125, // 2 minutes 2 seconds
                    firstTimeoutNetsQuery: 5, // 5 seconds 
                });

                //---------Verify if layoutColQRNETS and layoutRowQRNETS is required in production, else remove---------
                const interval = setInterval(() => {
                    const layoutColQRNETS = document.getElementsByClassName(
                        "col-xs-12 col-sm-7 col-md-8 col-lg-8"
                    );
                    const layoutRowQRNETS = document.querySelector('div.row[style*="margin-bottom: 0px;"]');

                    if(layoutColQRNETS.length > 0 && layoutRowQRNETS) {
                        clearInterval(interval);
                        layoutColQRNETS[0].remove();
                        layoutRowQRNETS.style.marginRight = "15px";
                        layoutRowQRNETS.style.marginLeft = "15px";
                    }
                }, 100)
                //---------------------------------------------END------------------------------------------------------
            } else {
                this.setState({
                    secondsNetsTimeout: 605, // 10 minutes 5 seconds
                    firstTimeoutNetsQuery: 305, // 5 minutes 5 seconds
                    secondTimeoutNetsQuery: 300, // 5 minutes
                });
            }
        }
    }

    async requestNets (amount, txnId, mobile) {
        // TODO 14: Fill in codes for eNETS transaction request payload
        var body = {
            txn_id: txnId,
            amt_in_dollars: amount,
            notify_mobile: mobile
        };
        axios
            .post(commonConfigs.apiUrls.requestNetsApi(), body, {
                headers: commonConfigs.apiHeader,
            })
            .then((res) => {
                var response = res.data.result.data;
                console.log(response);
                this.setState({ eNetsPayment: "" })
                if (response.txn_status == 1 && response.txn_request_hmac !== "") {
                    this.setState({ 
                        eNetsRetrievalRef: response.txn_retrieval_ref,
                        eNetsDisplayLogo: true,
                        openApiPaasTxnStatus: response.txn_status
                    });
                    localStorage.setItem(
                        "txnRetrievalRef",
                        response.txn_retrieval_ref
                    );
                    const txnReq = JSON.stringify(response.txn_request_payload);
                    const hmac = response.txn_request_hmac;
                    const keyId = response.txn_request_key_id;
                    console.log(txnReq, hmac);
                    window.sendPayLoad(txnReq, hmac, keyId);
                    this.setState({ eNetsTxnReqPayload: true });
                    this.eNetsJavascriptPluginListener();
                } else {
                    this.setState({
                        eNetsTxnReqPayload: false,
                        eNetsGenerate: false,
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
                console.log("API error: " + err);
                this.stopNetsTimer();
                window.location.href = "/enets/fail";
            });
    }

    handleNetsReq = () => {
        // TODO 15: Fill in handle request button codes
        document.getElementById("eNetsPaymentGatewayWebpage").style.display = "none";
        this.setState({ eNetsGenerate: true });
        this.requestNets(
            this.state.amount,
            this.state.txnId,
            this.state.mobile
        );
    }
    
    handleNetsCancel = () => {
        // TODO 16: Fill in handle cancel button codes
        localStorage.clear();
        this.setState({ eNetsRetrievalRef: "" }, () => window.location.reload(false));
    }

    async queryNets() {
        // TODO 17: Fill in codes for eNETS timeout handling NETS query
        var body = {
            txn_retrieval_ref: this.state.eNetsRetrievalRef,
        };
        console.log(body);
        await axios
            .post(commonConfigs.apiUrls.queryNetsApi(), body, {
                headers: commonConfigs.apiHeader,
            })
            .then((res) => {
                var response = res.data.result.data;
                console.log(response);

                if (response.stage_response_code.split('-')[1] == "03245" && response.txn_status == 0) {
                } else if (response.stage_response_code.split('-')[1] == "00000" && response.txn_status == 1) {
                    window.location.href = "/enets/success";
                } else {
                    console.log(
                    "Transaction Query stage response code: ",
                    response.stage_response_code
                    );
                    window.location.href = "/enets/fail";
                }
            })
            .catch((err) => {
                console.log("API error: " + err);
                window.location.href = "/enets/fail";
            });
    }

    async checkS2S() {
        // TODO 18: Fill in codes for eNETS timeout handling S2S checks
        await axios
    .get(
        commonConfigs.apiUrls.s2sTxnStatusNetsApi(
            localStorage.getItem("txnRetrievalRef")
        ),
        { headers: commonConfigs.apiHeader }
    )
    .then((res) => {
        var response = res.data.result.data;
        console.log(response);
        if (response.stage_response_code?.split('-')[1] == "00000" && response.txn_status == 1) {
          window.location.href = "/enets/success";
        } else {
          console.log(
            "Transaction S2S stage response code: ",
            response.stage_response_code
          );
          window.location.href = "/enets/fail";
        }
    })
    .catch((err) => {
        console.log("API error: " + err);
        localStorage.clear();
        window.location.href = "/enets/fail";
    });
    }

    async decrementNetsTimer() {
        // TODO 19: Fill in codes for eNETS timeout handling intervals
        let secondsNetsTimeout = this.state.secondsNetsTimeout - 1;
        console.log(secondsNetsTimeout);
        this.setState({
            convertTime: this.convertTimeFormat(secondsNetsTimeout),
            secondsNetsTimeout: secondsNetsTimeout,
        });
        if (this.state.secondTimeoutNetsQuery == 0) {
            if (secondsNetsTimeout == this.state.firstTimeoutNetsQuery) {
                this.queryNets();
            } else if (secondsNetsTimeout == 0) {
                this.stopNetsTimer();
                this.checkS2S();
            }
        } else {
            if (secondsNetsTimeout == 0) {
                this.stopNetsTimer();
                this.checkS2S();
            } else if (
                secondsNetsTimeout == this.state.firstTimeoutNetsQuery ||
                secondsNetsTimeout == this.state.secondTimeoutNetsQuery
            ) {
                this.queryNets();
            }
        }
    }

    handleHmacChallenge = () => {
        // TODO HMAC Challenge 4: Fill in code for handle HMAC Challenge function
    }

    componentDidMount() {
        if (localStorage.getItem("txnRetrievalRef")) {
            this.checkS2S();
        }
    }

    render() {
        return (
            <div style={{ position: "relative" }}>
                <div style={{ margin: "50px" }}>
                    <div style={{ margin: "50px" }}>
                        <div
                            className="eNetsPaymentGatewayWebpage"
                            style={{
                                textAlign: "center",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: 0,
                                backgroundColor: "#f0f4f7",
                                borderRadius: "10px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                padding: "20px",
                            }}
                        >
                            <div
                                id="eNetsPaymentGatewayWebpage"
                                style={{
                                textAlign: "center",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: 0,
                                height: "70vh",
                                padding: "20px",
                                }}
                            >
                                <div className="button" id="btnNets">
                                    {!this.state.eNetsDisplayLogo && (
                                        <img
                                        src={eNetsLogo}
                                        alt="eNETS Logo"
                                        style={{
                                            height: "67px",
                                            marginBottom: "20px",
                                        }}
                                        />
                                    )}
                                    <h2 className="text" style={{ fontSize: "18px" }}>
                                        Sample eNETS
                                    </h2>
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
                                        onClick={this.handleNetsReq} // TODO HMAC Challenge 5: Change onClick handler for HMAC Challenge
                                    >
                                        Generate eNETS {/* TODO HMAC Challenge 6: Change button name for HMAC Challenge */}
                                    </Button>
                                </div>
                            </div>
                            {this.state.eNetsGenerate ? (
                                <div className="eNetsPaymentGatewayWebpage">
                                    <div className="eNetsJavascriptPluginBackground" style={{ backgroundColor: "#FFFFFF" }}>
                                        {this.state.eNetsDisplayTimer && (
                                            <div>
                                                <h2 className="eNetsJavascriptPluginText" style={{ textAlign: "center" }}>
                                                    Checkout
                                                </h2>
                                                <p>
                                                    Time left: {this.state.convertTime.m} :{" "}
                                                    {this.state.convertTime.s}
                                                </p>
                                                <p>
                                                    <strong>DO NOT NAVIGATE BACK OR REFRESH THIS PAGE</strong>
                                                </p>
                                            </div>
                                        )}
                                        {this.state.eNetsPayment !== "" ? (
                                            <img src={this.state.eNetsPayment} />
                                        ) : (
                                            <>
                                                {/* start of nets required block for plugin  */}
                                                <div id="anotherSection">
                                                <fieldset>
                                                <div id="ajaxResponse"></div>
                                                </fieldset>
                                                </div>
                                                {/* end of nets required block for plugin  */}
                                            </>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="eNetsPaymentGatewayWebpage">
                                    {!this.state.eNetsTxnReqPayload && 
                                    this.state.eNetsTxnReqPayload !== null &&
                                    this.state.openApiPaasTxnStatus !== 1 && (
                                        <>
                                            <h2 className="text" style={{ fontSize: "42px", marginBottom: "10px" }}>
                                                Stage Response Code N.A.
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
                            {/* For HMAC Challenge */}
                            {this.state.hmacChallengeGenerate &&
                            this.state.hmacChallengeGenerate !== "" && (
                              <>
                              <div className="hmacChallenge">
                                <h2 className="text" style={{ fontSize: "42px", marginBottom: "10px" }}>
                                  Generated HMAC 
                                </h2>
                                <h2 className="text" style={{ fontSize: "22px", marginBottom: "10px" }}>
                                  (Compare with NETS Developer Portal HMAC)
                                </h2>
                                <p style={{ fontSize: "22px" }}>
                                  {this.state.hmacChallengeGenerate}
                                </p>
                              </div>
                              </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ENetsSampleLayout;