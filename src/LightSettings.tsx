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


const calculateDirectionVector = (lightCircle: Position, OuterCircleCenter: Position): Vec3 => {
    const deltaX = OuterCircleCenter.x - lightCircle.x;
    const deltaZ = OuterCircleCenter.y - lightCircle.y;
    const length = Math.sqrt(deltaX ** 2 + deltaZ ** 2);
    return new Vec3(deltaX / length, 0, -deltaZ / length);
};

const calculateLightCirclePositionFromDirection = (direction: Vec3): Position => {
    const OuterCircleCenter = { x: 80, y: 80 };
    const x = OuterCircleCenter.x - direction.x * (46);
    const y = OuterCircleCenter.y + direction.z * (46);
    return { x, y };
};

const LightSettings: React.FC<LightSettingsProps> = ({ lightSource }) => {
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState<Position>(calculateLightCirclePositionFromDirection(lightSource.direction));
    const [isLightEnabled, setIsLightEnabled] = useState(lightSource.isEnabled);

    const handleMouseDown = (e: MouseEvent<SVGCircleElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleToggleChange = () => {
        let newToggleState = !isLightEnabled;
        setIsLightEnabled(newToggleState);

        if (newToggleState) {
            lightSource.isEnabled = true;
        } else {
            lightSource.isEnabled = false;
        }
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
            <label className="toggle">
                <input type="checkbox" checked={lightSource.isEnabled} onChange={handleToggleChange} />
                <div className="slider"></div>
            </label>
            <svg
                width="160px"
                height="160px"
                onMouseMove={isLightEnabled ? handleMouseMove : undefined}
                onMouseUp={isLightEnabled ? handleMouseUp : undefined}
            >
                <circle className={`${isLightEnabled ? 'outer-circle-on' : 'outer-circle-off'}`}
                    cx="50%"
                    cy="50%"
                    r="30%"
                />
                <circle className='inner-circle'
                    cx="50%"
                    cy="50%"
                    r="10%"
                />
                <circle className={isLightEnabled ? 'light-circle-on' : 'light-circle-off'}
                    cx={position.x}
                    cy={position.y}
                    r="6%"
                    onMouseDown={isLightEnabled ? handleMouseDown : undefined}
                />
            </svg>
        </div>
    );
};

export default LightSettings;