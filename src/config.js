let commonUrl = "https://sandbox.nets.openapipaas.com/api/v1"

const commonConfigs = {
  apiHeader: {
    "api-key": `${process.env.REACT_APP_SANDBOX_API_KEY}`,
    "project-id": `${process.env.REACT_APP_SANDBOX_PROJECT_ID}`
  },
  apiUrls: {
    // eNETS
    // TODO 5: Fill in API URL
    requestNetsApi: () => `${commonUrl}/common/payments/enets/request`, 
    queryNetsApi: () => `${commonUrl}/common/payments/enets/query`, 
    s2sTxnStatusNetsApi: (txnRetrievalRef) => `${commonUrl}/common/payments/enets/s2s?txn_retrieval_ref=${txnRetrievalRef}`,
  },
};

export default commonConfigs;
