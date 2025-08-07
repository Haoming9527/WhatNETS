## Prerequisite 1: Installation of libraries
## Prerequisite 2: Import boilerplates codes into folder(Boilerplates Codes)
## Prerequisite 3: Import boilerplates graphics into folder(Boilerplates Graphics Images)
## Prerequisite 4: Import eNETS jquery javascript libraries (jquery-3.1.1.min.js)
## Prerequisite 5: Import eNETS .jsp and .js files

## TODO 1 and 2: Storing of keys
// Assign constant with API Key and Project ID created from OPENAPIPASS Portal

<u>File: .env</u>

## TODO 3 and 4: Storing of API headers
// Store API Key and Project ID. This is to prevent exposure of sensitive information to public.

<u>File: config.js</u>

```javascript
"api-key": `${process.env.REACT_APP_SANDBOX_API_KEY}`,
"project-id": `${process.env.REACT_APP_SANDBOX_PROJECT_ID}`
```

## TODO 5: Storing of API URLs
// Store eNETS API URLs

<u>File: config.js</u>

```javascript
requestNetsApi: () => `${commonUrl}/common/payments/enets/request`, 
queryNetsApi: () => `${commonUrl}/common/payments/enets/query`, 
s2sTxnStatusNetsApi: (txnRetrievalRef) => `${commonUrl}/common/payments/enets/s2s?txn_retrieval_ref=${txnRetrievalRef}`,
```

## Prerequisite 6: Skeleton for the eNETS REACT components
// Organize REACT application by breaking it down into smaller, reusable components. Make sure code is in Boilerplates codes.

## TODO 6: Import React Components
// eNETS Payment Gateway UI Layout

<u>File: App.js</u>

```javascript
import ENetsSamplePage from "./eNets/views/eNetsSampleLayout";
import TxnNetsSuccessStatusPage from "./txnNetsStatus/views/txnNetsSuccessStatusLayout";
import TxnNetsFailStatusPage from "./txnNetsStatus/views/txnNetsFailStatusLayout";
```

## TODO 7: Define web browser run-time routes
// Route path to each webpage

<u>File: App.js</u>

```javascript
<Route path="/enets" element={<ENetsSamplePage />} />
<Route path="/enets/success" element={<TxnNetsSuccessStatusPage />} />
<Route path="/enets/fail" element={<TxnNetsFailStatusPage />} />
```

## Prerequisite 7: Import REACT libraries and eNETS assets
// Make sure libraries and assets are imported to ensure smooth execution of project. Make sure code is in Boilerplates codes

## TODO 8: eNETS Payment Gateway Webpage UI
// Frontend user interface seen by user. Make sure code is in Boilerplates codes. Fill in codes for eNets Plugin id class. 

<u>File: eNetsSampleLayout.jsx</u>

```javascript
{/* start of nets required block for plugin  */}
<div id="anotherSection">
<fieldset>
    <div id="ajaxResponse"></div>
</fieldset>
</div>
{/* end of nets required block for plugin  */}
```

## TODO 9-11: Initialize eNETS Payment Flow States
// To replace with actual parameters in production environment

<u>File: eNetsSampleLayout.jsx</u>

```javascript
amount: '3',
txnId: "sandbox_nets|m|8ff8e5b6-d43e-4786-8ac5-7accf8c5bd9b",
mobile: 0,
```

<br><br>
RUN THE APPLICATION !!!
CHECKPOINT 1 COMPLETED !!!!