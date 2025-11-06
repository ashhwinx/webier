import React from 'react';

const AuroraBackground: React.FC = () => {
  return (
    <>
      <div className="aurora-container">
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
        <div className="aurora aurora-3"></div>
      </div>
      <style>{`
        .aurora-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 0;
          overflow: hidden;
          opacity: 0.2;
        }
        .aurora {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%);
          will-change: transform, filter;
        }
        .aurora-1 {
          width: 800px;
          height: 800px;
          top: -20%;
          left: -20%;
          animation: moveAurora1 25s infinite alternate ease-in-out;
        }
        .aurora-2 {
          width: 700px;
          height: 700px;
          top: 20%;
          right: -30%;
          animation: moveAurora2 22s infinite alternate ease-in-out;
        }
        .aurora-3 {
          width: 600px;
          height: 600px;
          bottom: -30%;
          left: 30%;
          animation: moveAurora3 28s infinite alternate ease-in-out;
        }
        @keyframes moveAurora1 {
          from { transform: translate(-20%, -20%) rotate(0deg); }
          to { transform: translate(20%, 20%) rotate(45deg); }
        }
        @keyframes moveAurora2 {
          from { transform: translate(10%, -10%) rotate(0deg); }
          to { transform: translate(-10%, 10%) rotate(-45deg); }
        }
        @keyframes moveAurora3 {
          from { transform: translate(-15%, 15%) rotate(0deg); }
          to { transform: translate(15%, -15%) rotate(60deg); }
        }
      `}</style>
    </>
  );
};

export default AuroraBackground;