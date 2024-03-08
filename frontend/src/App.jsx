import React from "react";
import "./App.css";
import Router from './components/router';
import { Navigation } from "./components/navigation";
import { Footer } from './components/footer';
import { RecoilRoot } from 'recoil';

const App = () => {

  return (
    <div>
      <RecoilRoot>
        <Router />
        <Navigation />
        {/* <Footer /> */}
      </RecoilRoot>
    </div>
  );
};

export default App;