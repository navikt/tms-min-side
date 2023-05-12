import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Arbeidssoker from "./mikrofrontend/Arbeidssoker";
import MinSide from "./mikrofrontend/MinSide";
import Varsler from "./mikrofrontend/Varsler";
import TidligereVarsler from "./mikrofrontend/TidligereVarsler";
import Utkast from "./mikrofrontend/Utkast";
import { useLanguage } from "./hooks/useLanguage";

const App = () => {
  const BASEPATH = "/minside";
  const basePathWithLocales = [`${BASEPATH}`, `${BASEPATH}/en`, `${BASEPATH}/nn`];
  useLanguage();

  return (
    <Router>
      <Routes>
        {basePathWithLocales.map((basePath) => {
          return (
            <>
              <Route path={basePath} element={<MinSide />} />
              <Route path={`${basePath}/varsler`} element={<Varsler />} />
              <Route path={`${basePath}/tidligere-varsler`} element={<TidligereVarsler />} />
              <Route path={`${basePath}/arbeidssoker`} element={<Arbeidssoker />} />
              <Route path={`${basePath}/utkast`} element={<Utkast />} />
            </>
          );
        })}
      </Routes>
    </Router>
  );
};

export default App;
