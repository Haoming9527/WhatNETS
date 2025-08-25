import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css"; // Default global stylesheet


// Import React components
import HomePage from "./netsQr/views/HomePage";
import NetsQrSamplePage from "./netsQr/views/netsQrSamplePage";
import TxnNetsSuccessStatusPage from "./txnNetsStatus/views/txnNetsSuccessStatusPage";
import TxnNetsFailStatusPage from "./txnNetsStatus/views/txnNetsFailStatusPage";

const App = () => {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
};

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nets-qr" element={<NetsQrSamplePage />} />
        <Route path="/nets-qr/success" element={<TxnNetsSuccessStatusPage />} />
        <Route path="/nets-qr/fail" element={<TxnNetsFailStatusPage />} />
      </Routes>
    </div>
  );
};

export default App;
