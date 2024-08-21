import React, { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './supabase';

function App() {
  const [bgColor, setBgColor] = useState('#36BA98');
  const [shadow, setShadow] = useState('0px 0px 30px rgba(0, 0, 0, 0.7)');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const colors = ['#36BA98', '#E9C46A', '#F4A261', '#E76F51']; // 변경할 색상 배열
    let index = 0;

    const interval = setInterval(() => {
      setBgColor(colors[index]);
      index = (index + 1) % colors.length;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchQuote = async () => {
      const { data, error } = await supabase
        .from('Famous-saying')
        .select('*')

      if (error) {
        console.error('Error fetching quote:', error);
      } else {
        setQuote(data.text);
      }
    };

    fetchQuote();

  }, []);



  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xOffset = (clientX / innerWidth - 0.5) * 40; // X축 오프셋 증가
    const yOffset = (clientY / innerHeight - 0.5) * 40; // Y축 오프셋 증가

    setShadow(`${xOffset}px ${yOffset}px 50px rgba(0, 0, 0, 0.7)`);
  };

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <h1>오늘의 명언</h1>

      <div>
        <h2>{quote}</h2> {/* Supabase에서 가져온 명언 표시 */}
        <div
          style={{
            backgroundColor: bgColor,
            boxShadow: shadow,
            transition: 'background-color 2s, box-shadow 0.05s ease',
          }}
          id="main"
        >
        </div>
      </div>
    </div>
  );
}

export default App;
