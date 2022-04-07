import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useQuery } from "react-query";
import { createNanoEvents } from "nanoevents";
import useStore, { selectIsError } from "./store/store";
import { fetcher } from "./api/api";
import { minSideProxyUrl } from "./urls";
import Layout from "./components/layout/Layout";
import MinSide from "./microfrontend/MinSide";

const App = () => {
  const { data: status, isSuccess } = useQuery(`${minSideProxyUrl}/login/status`, fetcher);
  const isError = useStore(selectIsError);
  const emitter = createNanoEvents();

  if (isSuccess) {
    emitter.on("loaded", () => {
      emitter.emit("level", status.level);
    });
  }

  return (
    <Router>
      <Layout isError={isError}>
        <Routes>
          <Route path="/minside" exact element={<MinSide emitter={emitter} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
