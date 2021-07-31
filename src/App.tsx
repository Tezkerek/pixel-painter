import React from 'react';
import * as Konva from 'react-konva';

import logo from './logo.svg';
import './App.css';

class PixelGrid extends React.Component {
  render() {
    const pixels: JSX.Element[] = [];
    for (let row = 0; row < 16; row++) {
      for (let col = 0; col < 16; col++) {
        pixels.push(
          <Konva.Rect
            x={col * 50}
            y={row * 50}
            width={50}
            height={50}
            stroke="black"
          />
        );
      }
    }
    return pixels;
  }
}

class App extends React.Component {
  render() {
    return (
      <Konva.Stage width={window.innerWidth} height={window.innerHeight}>
        <Konva.Layer>
          <PixelGrid />
        </Konva.Layer>
      </Konva.Stage>

    );
  }
}

export default App;
