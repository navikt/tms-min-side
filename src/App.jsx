import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import useStore, { selectIsError } from "./store/store";
import Layout from "./components/layout/Layout";
import MinSide from "./micro-frontend/MinSide";
import MinSideVarslinger from "./micro-frontend/MinSideVarslinger";

const App = () => {
  const isError = useStore(selectIsError);

  return (
    <Router>
      <Layout isError={isError}>
        <Routes>
          <Route path="/minside" exact element={<MinSide />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
