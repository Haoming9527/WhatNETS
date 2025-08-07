## Prerequisite 8: eNETS Timer Function
// Implement a countdown timer with states updates. Make sure code is in Boilerplates codes

# TODO 12 and 13: Initialize different payment mode timeout duration
// Listen for payment mode selection event to initialize different payment mode timeout duration

## TODO 12: Fill in codes to listen for payment mode selection event

<u>File: eNetsSampleLayout.jsx</u>

```javascript
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
```

## TODO 13: Fill in codes to initialize different payment mode timeout duration

<u>File: eNetsSampleLayout.jsx</u>

```javascript
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
```

## TODO 14: eNETS Request Function
// Fill in codes for eNETS transaction request payload. To request a eNETS plugin from the NETS payment system, which can then be used by a customer to make a payment. The function sends the necessary transaction details to the NETS API and handles the response to display the plugin or any error messages.

<u>File: eNetsSampleLayout.jsx</u>

```javascript
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
```

## TODO 15: Handle eNETS Request
// Fill in handle request button codes. A method in the React component that triggers the process of generating a eNETS payload for payment

<u>File: eNetsSampleLayout.jsx</u>

```javascript
document.getElementById("eNetsPaymentGatewayWebpage").style.display = "none";
this.setState({ eNetsGenerate: true });
this.requestNets(
    this.state.amount,
    this.state.txnId,
    this.state.mobile
);
```
## TODO 16: Handle eNETS Retry
// Fill in handle retry button codes
A method in the React component that triggers the process of retrying a eNETS transaction 

```javascript
localStorage.clear();
this.setState({ eNetsRetrievalRef: "" }, () => window.location.reload(false));
```
<br><br>
RUN THE APPLICATION !!!
CHECKPOINT 2 COMPLETED !!!!