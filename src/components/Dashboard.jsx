// Dashboard.js
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
//import Module from './Module';
//import './Dashboard.css';

function Dashboard() {
  
  const [modules, setModules] = useState([
    { id: 1, imageUrl: './001.png' },
    { id: 2, imageUrl: './002.png' },
    { id: 3, imageUrl: './003.png' },
    { id: 4, imageUrl: './004.png' },
    { id: 5, imageUrl: './005.png' },
    { id: 6, imageUrl: './006.png' },
    { id: 7, imageUrl: './007.png' },
    { id: 8, imageUrl: './008.png' },
  ]);


  const handleClick=(module)=>{
    const getModule = JSON.parse(localStorage.getItem('modules'))
    const updatedModules = getModule ? [...getModule, module] : [module];
    localStorage.setItem('modules', JSON.stringify(updatedModules));
    toast("Item added to Module !")
  }

  function calculateWidth(imageUrl) {
    const threshold = 1.5; 

    const img = new Image();
    img.src = imageUrl;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
  
    if (aspectRatio > threshold) {
      return '1'; 
    } else {
      return '1/2';
    }
  }

  return (
    <>
    <div className="dashboard p-2">
      <div className="module-container flex flex-wrap">
        {modules.map((module) => (
          <div key={module.id} className={`w-full sm:w-${calculateWidth(module.imageUrl)} p-2`}>
           <button className='absolute m-1' onClick={() => handleClick(module)}>Add</button><img src={module.imageUrl} alt="Module"  className='w-full' />
          </div>
        ))}
      </div>
    </div>
    <ToastContainer />
    </>
  );
}

export default Dashboard;
