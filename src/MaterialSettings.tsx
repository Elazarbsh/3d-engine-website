import React, { useState } from 'react';
import { Material, RGBA, Renderer } from "ts-3d-engine";
import './MaterialSettings.css';

interface MaterialSettingsProps {
  material: Material,
  renderer: Renderer
}

function hexToRgba(hexColor: string) {
  const red = parseInt(hexColor.slice(1, 3), 16);
  const green = parseInt(hexColor.slice(3, 5), 16);
  const blue = parseInt(hexColor.slice(5, 7), 16);
  return new RGBA(red, green, blue);
}

// function imageDataToDataURL(imageData: ImageData): string {
//   const canvas = document.createElement('canvas');
//   canvas.width = imageData.width;
//   canvas.height = imageData.height;
//   const ctx = canvas.getContext('2d');
//   ctx.putImageData(imageData, 0, 0);
//   return canvas.toDataURL();
// }

const MaterialSettings: React.FC<MaterialSettingsProps> = ({ material, renderer }) => {
  const [meshColor, setMeshColor] = useState(material.color.toHex());
  const [wireframeColor, setWireframeColor] = useState(material.wireframeColor.toHex());
  const [showWireframe, setShowWireframe] = useState(material.wireframe);
  const [showMesh, setShowMesh] = useState(material.mesh);
  const [showTexture, setShowTexture] = useState(renderer.enableTextureMapping);

  // const initialTextureImage = material.texture ? imageDataToDataURL(material.texture.textureData) : null;
  // const [textureImage, setTextureImage] = useState(initialTextureImage);

  // const handleTextureFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     try {
  //       const reader = new FileReader();
  //       reader.onload = async (e: ProgressEvent<FileReader>) => {
  //         const result = e.target?.result;
  //         if (typeof result === 'string') {
  //           let texture = await TextureLoader.loadTextureFromImageFile(file);
  //           material.texture = texture;
  //           setTextureImage(result);
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     } catch (error) {
  //       console.error("Error parsing the file:", error);
  //     }
  //   }
  // };
  // const handleImageClick = () => {
  //   document.getElementById('textureFileInput').click();
  // };

  return (
    <div className='material-settings'>

      <div className='material-setting'>
        <label htmlFor="showMesh">Mesh:</label>
        <input
          type="checkbox"
          id='showMesh'
          checked={showMesh}
          onChange={() => {
            material.mesh = !material.mesh;
            setShowMesh(material.mesh)
          }}
        />
      </div>

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
        <label htmlFor="showWireframe">Wireframe:</label>
        <input
          type="checkbox"
          id='showWireframe'
          checked={showWireframe}
          onChange={() => {
            material.wireframe = !material.wireframe;
            setShowWireframe(material.wireframe)
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
        <label htmlFor="showTexture">Texture:</label>
        <input
          type="checkbox"
          id='showTexture'
          checked={showTexture}
          onChange={() => {
            renderer.enableTextureMapping = !renderer.enableTextureMapping;
            setShowTexture(renderer.enableTextureMapping)
          }}
        />
      </div>

      {/* <div className='material-setting'>
        <label htmlFor="textureFile">Texture Image:</label>
        <input
          type="file"
          id="textureFileInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleTextureFileChange}
        />
        {textureImage ? (
          <img src={textureImage}
            alt="Texture Preview"
            className="texture-preview"
            onClick={handleImageClick} />
        ) : (
          <div className="texture-placeholder"
            onClick={handleImageClick}>NA</div>
        )}
      </div> */}

    </div>
  );
};

export default MaterialSettings;