import React, { useState, MouseEvent, useRef } from 'react';
import { Light, Vec3 } from "ts-3d-engine";
import './LightSettings.css'

interface Position {
    x: number;
    y: number;
}

interface LightSettingsProps {
    lightSource: Light; // Assuming LightSource is the class you want to pass
}

const LightSettings: React.FC<LightSettingsProps> = ({ lightSource }) => {

    const calculatePositionFromDirection = (direction: Vec3): Position => {
        // Assuming the length of the direction vector is used to scale
        const bigCircleCenter = {x: 100, y:100};

        console.log("dir: " + direction.x + " " + direction.y + " " + direction.z + " " +"length: "+ length);
    
        const x = bigCircleCenter.x - direction.x * (115 / 2); // 200 is the SVG width
        const y = bigCircleCenter.y + direction.z * (115 / 2); // 200 is the SVG height
        return { x, y };
        };
    
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState<Position>(calculatePositionFromDirection(lightSource.direction));
    const [toggleState, setToggleState] = useState(lightSource.isEnabled);

    const handleMouseDown = (e: MouseEvent<SVGCircleElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleToggleChange = () => {
        let newToggleState = !toggleState;
        setToggleState(newToggleState);
    
        // Perform actions based on the toggle state
        if (newToggleState) {
          // Do something when the toggle is turned ON
          console.log('Toggle is ON');
          lightSource.isEnabled = true;
        } else {
          // Do something when the toggle is turned OFF
          console.log('Toggle is OFF');
          lightSource.isEnabled = false;
        }
      };

    const calculateDirectionVector = (smallCircle: Position, bigCircleCenter: Position): Vec3 => {
        const deltaX = bigCircleCenter.x - smallCircle.x;
        const deltaZ = bigCircleCenter.y - smallCircle.y;
        const length = Math.sqrt(deltaX ** 2 + deltaZ ** 2);
        return new Vec3(deltaX / length, 0, -deltaZ / length);
    };



    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        if (dragging) {
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Calculate the angle and update the position
            const angle = Math.atan2(mouseY - rect.height / 2, mouseX - rect.width / 2);
            const x = Math.cos(angle) * (rect.width / 3.5) + rect.width / 2;
            const y = Math.sin(angle) * (rect.height / 3.5) + rect.height / 2;

            const bigCircleCenter = { x: rect.width / 2, y: rect.height / 2 };
            const directionVector = calculateDirectionVector({ x, y }, bigCircleCenter);
            lightSource.direction = directionVector;
            setPosition({ x, y });
        }
    };

    return (
        <div className="light-settings">
            <label className= "toggle">
                <input type="checkbox" checked={lightSource.isEnabled} onChange={handleToggleChange}/>
                <div className="slider"></div>
            </label>
            <svg
                width="200px"
                height="200px"
                onMouseMove={toggleState ? handleMouseMove : undefined}
                onMouseUp={toggleState ? handleMouseUp : undefined}
            >
                <circle
                    cx="50%"
                    cy="50%"
                    r="30%"
                    fill="#181818" // Change the color as needed
                    stroke={toggleState ? '#5291f7' : 'grey'}
                    strokeWidth={2}
                />
                <circle
                    cx="50%"
                    cy="50%"
                    r="10%"
                    fill="grey" // Change the color as needed
                    stroke='grey'
                    strokeWidth={2}
                />
                <circle className={toggleState ? 'light-circle-on' : 'light-circle-off'}
                    cx={position.x}
                    cy={position.y}
                    r={10}
                    fill={toggleState ? 'white' : 'grey'} // Change the color as needed
                    stroke={toggleState ? 'white' : 'grey'}
                    onMouseDown={toggleState ? handleMouseDown : undefined}
                />
            </svg>
        </div>
    );
};

export default LightSettings;