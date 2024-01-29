import React, { useState } from 'react';
import { Material, RGBA } from "ts-3d-engine";
import './MaterialSettings.css';

interface MaterialSettingsProps {
  material: Material
}

const MaterialSettings: React.FC<MaterialSettingsProps> = ({ material }) => {
  const [meshColor, setMeshColor] = useState(material.color.toHex());
  const [wireframeColor, setWireframeColor] = useState(material.wireframeColor.toHex());
  const [showWireframe, setShowWireframe] = useState(material.wireframe);


  return (
    <div className='material-settings'>
      
      <div className='setting'>
        <label htmlFor="meshColorPicker">Mesh Color:</label>
        <input
          type="color"
          id="meshColorPicker"
          value={meshColor}
          onChange={(e) => {
            setMeshColor(e.target.value);
            let color = e.target.value;
            const red = parseInt(color.slice(1, 3), 16);
            const green = parseInt(color.slice(3, 5), 16);
            const blue = parseInt(color.slice(5, 7), 16);
            material.color = new RGBA(red, green, blue);
            console.log(material.color.toHex());
          }}
        />
      </div>

      <div className='setting'>
        <label htmlFor="wireframeColorPicker">Wireframe Color:</label>
        <input
          type="color"
          id="wireframeColorPicker"
          value={wireframeColor}
          onChange={(e) => {
            setWireframeColor(e.target.value);
            let color = e.target.value;
            const red = parseInt(color.slice(1, 3), 16);
            const green = parseInt(color.slice(3, 5), 16);
            const blue = parseInt(color.slice(5, 7), 16);
            material.wireframeColor = new RGBA(red, green, blue);
          }}
        />
      </div>

      <div className='setting'>
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