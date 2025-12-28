import React from 'react';

const TopologicalPattern: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
            <svg
                className="absolute top-0 left-0 w-[120%] h-[120%] animate-drift"
                viewBox="0 0 800 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M100,50 Q200,150 100,250 T100,450" stroke="currentColor" className="text-black" strokeWidth="1" />
                <path d="M200,80 Q350,180 200,280 T200,480" stroke="currentColor" className="text-black" strokeWidth="0.5" />
                <path d="M300,30 Q500,130 300,230 T300,430" stroke="currentColor" className="text-black" strokeWidth="1" />
                <path d="M450,100 Q600,200 450,300 T450,500" stroke="currentColor" className="text-black" strokeWidth="0.8" />
                <path d="M600,50 Q750,150 600,250 T600,450" stroke="currentColor" className="text-black" strokeWidth="1.2" />
                <path d="M0,300 Q400,200 800,300" stroke="currentColor" className="text-black" strokeWidth="0.4" />
                <path d="M0,400 Q400,300 800,400" stroke="currentColor" className="text-black" strokeWidth="0.6" />
                <circle cx="400" cy="300" r="100" stroke="currentColor" className="text-black" strokeWidth="0.2" />
                <circle cx="400" cy="300" r="150" stroke="currentColor" className="text-black" strokeWidth="0.1" />
            </svg>
        </div>
    );
};

export default TopologicalPattern;
