import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

//Nets sample
// TODO 6: Import React Components
import ENetsSamplePage from "./eNets/views/eNetsSampleLayout";
import TxnNetsSuccessStatusPage from "./txnNetsStatus/views/txnNetsSuccessStatusLayout";
import TxnNetsFailStatusPage from "./txnNetsStatus/views/txnNetsFailStatusLayout";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/enets" element={<ENetsSamplePage />} />
          <Route path="/enets/success" element={<TxnNetsSuccessStatusPage />} />
          <Route path="/enets/fail" element={<TxnNetsFailStatusPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;