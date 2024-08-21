import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [bgColor, setBgColor] = useState('#36BA98'); // 초기 배경색 설정
  const [shadow, setShadow] = useState('0px 0px 30px rgba(0, 0, 0, 0.7)'); // 초기 그림자 설정

  useEffect(() => {
    const colors = ['#36BA98', '#E9C46A', '#F4A261', '#E76F51']; // 변경할 색상 배열
    let index = 0;

    const interval = setInterval(() => {
      setBgColor(colors[index]);
      index = (index + 1) % colors.length; // 색상을 반복적으로 변경
    }, 2000); // 2초마다 색상 변경

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // 마우스 위치에 따라 그림자 방향 및 강도 조절
    const xOffset = (clientX / innerWidth - 0.5) * 40; // X축 오프셋 증가
    const yOffset = (clientY / innerHeight - 0.5) * 40; // Y축 오프셋 증가

    setShadow(`${xOffset}px ${yOffset}px 50px rgba(0, 0, 0, 0.7)`);
  };

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <h1>오늘의 명언</h1>
      <div
        style={{
          backgroundColor: bgColor,
          boxShadow: shadow,
          transition: 'background-color 2s, box-shadow 0.05s ease', // 더 빠른 반응 속도
        }}
        id="main"
      >
      </div>
    </div>
  );
}

export default App;
