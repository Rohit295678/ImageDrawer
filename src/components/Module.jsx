import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Module() {
  const [modules, setModules] = useState([]);
  const dragItem = useRef();
const dragOverItem = useRef();

const dragStart = (e,position)=>{
  dragItem.current = position;
  console.log(e.targrt.innerHTML);
}

const dragEnter = (e,position)=>{
  dragOverItem.current = position;
  console.log(e.targrt.innerHTML)
}

const drop = () =>{
  const copyModule = [...modules];
  const dragItemContent = copyModule[dragItem.current]
  copyModule.splice(dragItem.current,1);
  copyModule.splice(dragOverItem.current,0,dragItemContent)
  dragItem.current=null
  dragOverItem.current=null;
  setModules(copyModule)
  localStorage.setItem('modules', JSON.stringify(copyModule));
}
  useEffect(() => {
    const savedModules = JSON.parse(localStorage.getItem('modules'));
    if (savedModules) {
      setModules(savedModules);
    }
  }, []);

  const handleDelete = (element) => {
    const updatedModules = modules.filter(module => module.id !== element.id);
    setModules(updatedModules);
    localStorage.setItem('modules', JSON.stringify(updatedModules));
    toast("Item removed from Module !")
  };


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
       {modules.length>0 ?<div className="module-container flex flex-wrap">
        {modules.map((element,index) => (
          <div key={element.id} className={`w-full sm:w-${calculateWidth(element.imageUrl)} p-2`} onDragStart={(e)=>dragStart(e,index)} onDragEnter={(e)=>dragEnter(e,index)} onDragEnd={drop} draggable>
           <button className='absolute m-1' onClick={()=>handleDelete(element)}>Delete</button><img src={element.imageUrl} alt="Module"  className='w-full' />
          </div>
        ))}
      </div>: <div>Add Module</div>}
    </div>
    <ToastContainer />
    </>
  );
}

export default Module;


