import React from "react";
import "./App.css";
import Router from './components/router';
import { Navigation } from "./components/navigation";
import { Footer } from './components/footer';

const App = () => {

  return (
    <div>
      <Router />
      <Navigation />
      <Footer />
    </div>
  );
};

export default App;
