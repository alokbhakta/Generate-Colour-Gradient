import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';

function App() {

  const [num, setNum] = useState(12);
  const [type, setType] = useState('linear');
  const [data, setData] = useState([]);


  const getHexColorCode = ()=>{
    const rgb = 255*255*255;
    const color = Math.floor(Math.random()*rgb);
    const hexCode = color.toString(16);
    const colorHex = hexCode.padEnd(6, "0");
    // console.log(colorHex);
    return `#${colorHex}`;
  }

  const generateColor = ()=>{
    const ColorData = [];
    for(let i=0; i<num; i++){
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();
      const degree = Math.floor(Math.random()*360);

      if(type === "linear"){
        ColorData.push({
        gradient: `linear-gradient(${degree}deg, ${color1}, ${color2})`,
        css: `background: linear-gradient(${degree}deg, ${color1}, ${color2})`
      })
      }
      else{
        ColorData.push({
        gradient: `radial-gradient(circle, ${color1}, ${color2})`,
        css: `background: radial-gradient(circle, ${color1}, ${color2})`
      })
      }

      
    }

    setData(ColorData);
  }


  const handleCopy = (css)=>{
    navigator.clipboard.writeText(css);
    toast.success("Code Copyed!", {position: 'top-center'})

  }

  useEffect(()=>{
    generateColor();
  },[num, type])



// console.log(num);
// console.log(type);
  return (
    <div className="min-h-screen w-screen bg-gray-100 overflow-x-hidden pb-4">
  {/* Header */}
  <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
    <h1 className="font-extrabold text-2xl sm:text-3xl bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
      🎨 Gradient Generator
    </h1>

    {/* Controls */}
    <div className="flex flex-wrap gap-3 items-center">
      <input
        value={num}
        onChange={(e) => setNum(e.target.value)}
        className="w-[90px] sm:w-[100px] px-2 py-1 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-rose-500 outline-none"
        type="number"
        placeholder="12"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-[100px] px-2 py-1 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-rose-500 outline-none"
      >
        <option value="linear">Linear</option>
        <option value="radial">Radial</option>
      </select>
      <button
        onClick={generateColor}
        className="px-4 py-2 bg-rose-600 text-white rounded-2xl shadow-md hover:bg-rose-700 active:scale-95 transition"
      >
        Generate
      </button>
    </div>
  </div>

  {/* Gradients Grid */}
  <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {data.map((item, index) => (
      <div
        key={index}
        style={{ background: item.gradient }}
        className="w-full aspect-square rounded-2xl shadow-md hover:scale-105 transition relative"
      >
        <button
          onClick={() => handleCopy(item.css)}
          className="px-2 py-1 bg-black/60 hover:bg-black text-white text-sm rounded-lg absolute right-3 bottom-3 shadow"
        >
          Copy
        </button>
      </div>
    ))}
  </div>

  <ToastContainer />
</div>
  )
}

export default App
