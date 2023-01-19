import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import MinSide from "./mikrofrontend/MinSide";
import Varslinger from "./mikrofrontend/Varslinger";
import Arbeidssoker from "./mikrofrontend/Arbeidssoker";
import Utkast from "./mikrofrontend/Utkast";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/minside" exact element={<MinSide />} />
        <Route path="/minside/varslinger" element={<Varslinger />} />
        <Route path="/minside/arbeidssoker" element={<Arbeidssoker />} />
        <Route path="/minside/utkast" element={<Utkast />} />
      </Routes>
    </Router>
  );
};

export default App;
