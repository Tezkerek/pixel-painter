import React from "react";

import "./App.css";
import { PixelEditor } from "./editor/PixelEditor";

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <PixelEditor />
      </div>
    );
  }
}

export default App;
