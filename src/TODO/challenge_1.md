# HMAC Challenge
// To delete HMAC Challenge file in actual implementation. Required only in coursework for hmac challenge.

##  TODO HMAC Challenge 1: Fill in code for calculating HMAC

<u>File: hmacUtil.js</u>

```javascript
import { sha256 } from 'js-sha256';
import { Buffer } from 'buffer';

export function generateHmac(jsonString, secretKey) {
    const concatenatedString = jsonString + secretKey;
    const hash = sha256.create();
    hash.update(concatenatedString);
    const hmac = Buffer.from(hash.array()).toString('base64');
    return hmac;
}
```

## TODO HMAC Challenge 2: Fill in Secret Key provided by NETS Developer Portal

<u>File: eNetsSampleLayout.jsx</u>

```javascript
netsSecretKey: "38a4b473-0295-439d-92e1-ad26a8c60279", 
```

## TODO HMAC Challenge 3: Initialize state for displaying generated HMAC

<u>File: eNetsSampleLayout.jsx</u>

```javascript
hmacChallengeGenerate: "",  
```

## TODO HMAC Challenge 4: Fill in code for handle HMAC Challenge function

<u>File: eNetsSampleLayout.jsx</u>

```javascript
document.getElementById("eNetsPaymentGatewayWebpage").style.display = "none";
const reqBody = {"ss":"1","msg":{"netsMid":"UMID_877772003","tid":"","submissionMode":"B","txnAmount":"1000","merchantTxnRef":"20240905 12:10:58","merchantTxnDtm":"20240905 12:10:58.205","paymentType":"SALE","currencyCode":"SGD","paymentMode":"","merchantTimeZone":"+8:00","b2sTxnEndURL":"https://httpbin.org/post","b2sTxnEndURLParam":"","s2sTxnEndURL":"http://s2s-parser.requestcatcher.com/test","s2sTxnEndURLParam":"","clientType":"W","supMsg":"","netsMidIndicator":"U","ipAddress":"127.0.0.1","language":"en"}}
const txnReq = JSON.stringify(reqBody)
const { netsSecretKey } = this.state;
const hmac = generateHmac(txnReq, netsSecretKey);
this.setState({ hmacChallengeGenerate: hmac })
console.log('Generated HMAC:', hmac);
```

## TODO HMAC Challenge 5: Change onClick handler for HMAC Challenge

<u>File: eNetsSampleLayout.jsx</u>

```javascript
onClick={() => this.handleHmacChallenge()}
```

## TODO HMAC Challenge 6: Change button name for HMAC Challenge

<u>File: eNetsSampleLayout.jsx</u>

```
Generate HMAC
```

<br><br>
RUN THE APPLICATION, COMPLETED !!!!