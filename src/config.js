let commonUrl = "https://sandbox.nets.openapipaas.com/api/v1";

const commonConfigs = {
    apiHeader: {
        "api-key": `${process.env.REACT_APP_SANDBOX_API_KEY}`,
        "project-id": `${process.env.REACT_APP_SANDBOX_PROJECT_ID}`
    },
    apiUrls: {
        requestNetsApi: () => `${commonUrl}/common/payments/nets-qr/request`,
        queryNetsApi: () => `${commonUrl}/common/payments/nets-qr/query`,
        webhookNetsApi: (txnRetrieval_ref) => `${commonUrl}/common/payments/nets/webhook?txn_retrieval_ref=${txnRetrieval_ref}`,
    },
};

export default commonConfigs;