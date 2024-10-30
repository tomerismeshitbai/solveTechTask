import React from 'react';

const StarryBackground: React.FC = () => {
    const stars = Array.from({ length: 100 }).map((_, index) => {
        const top = Math.random() * 100; 
        const left = Math.random() * 100; 
        const size = Math.random() * 3 + 1; 

        return (
            <div
                key={index}
                className="star"
                style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            />
        );
    });

    return <div className="star-background">{stars}</div>;
};

export default StarryBackground;