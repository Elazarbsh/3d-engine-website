import React, { useState } from 'react';
import { Material, RGBA } from "ts-3d-engine";
import './MaterialSettings.css';

interface MaterialSettingsProps {
  material: Material
}

function hexToRgba(hexColor : string){
  const red = parseInt(hexColor.slice(1, 3), 16);
  const green = parseInt(hexColor.slice(3, 5), 16);
  const blue = parseInt(hexColor.slice(5, 7), 16);
  return new RGBA(red, green, blue);
}

const MaterialSettings: React.FC<MaterialSettingsProps> = ({ material }) => {
  const [meshColor, setMeshColor] = useState(material.color.toHex());
  const [wireframeColor, setWireframeColor] = useState(material.wireframeColor.toHex());
  const [showWireframe, setShowWireframe] = useState(material.wireframe);


  return (
    <div className='material-settings'>
      <div className='material-setting'>
        <label htmlFor="meshColorPicker">Mesh Color:</label>
        <input
          type="color"
          id="meshColorPicker"
          value={meshColor}
          onChange={(e) => {
            const color = e.target.value;
            setMeshColor(color);
            material.color = hexToRgba(color);
          }}
        />
      </div>

      <div className='material-setting'>
        <label htmlFor="wireframeColorPicker">Wireframe Color:</label>
        <input
          type="color"
          id="wireframeColorPicker"
          value={wireframeColor}
          onChange={(e) => {
            const color = e.target.value;
            setWireframeColor(color);
            material.wireframeColor = hexToRgba(color);
          }}
        />
      </div>

      <div className='material-setting'>
        <label htmlFor="showWireframe">Wireframe:</label>
        <input
          type="checkbox"
          id='showWireframe'
          checked={material.wireframe}
          onChange={() => {
            material.wireframe = !material.wireframe;
            setShowWireframe(material.wireframe)
          }}
        />
      </div>
    </div>
  );
};

export default MaterialSettings;