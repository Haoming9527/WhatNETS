# TODO 17-19: eNETS transaction timeout handling
// Set the timeout duration and time intervals to query NETS server or to check backend S2S NETS transaction status

## TODO 17: Fill in codes for eNETS timeout handling NETS query
// To send a query to the NETS API to get the current status of a transaction using the eNetsRetrievalRef (retrieval reference) that was previously obtained from eNETS request response. It then updates the application state and UI based on the transaction status.

<u>File: eNetsSampleLayout.jsx</u>

```javascript
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
```

## Prerequisite 9: eNETS Success Payment Gateway Webpage
// Redirect to success page when payment is completed. Make sure code is in Boilerplates codes.

## Prerequisite 10: eNETS Fail Payment Gateway Webpage
// Redirect to fail page when payment failed. Make sure code is in Boilerplates codes.

## TODO 18: Fill in codes for eNETS timeout handling S2S checks
// To get the status of current eNETS transaction using the eNetsRetrievalRef (retrieval reference) that was previously obtained from eNETS request response. It then updates the application state and UI based on the transaction status.

<u>File: eNetsSampleLayout.jsx</u>

```javascript
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
```

## TODO 19: Fill in codes for eNETS timeout handling intervals 


<u>File: eNetsSampleLayout.jsx</u>

```typescript
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
```

## Prerequisite 11: eNETS componentDidMount Function
// Perform actions when the component is mounted. Use componentDidMount to start the timer and check the transaction status if necessary. Make sure code is in Boilerplates codes

<br><br>
RUN THE APPLICATION !!!
CHECKPOINT 3 COMPLETED !!!!