import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';




// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
 
//   <React.StrictMode>
//     <div className='p-container'>
//     <App />
//     </div>
//   </React.StrictMode>

// );
ReactDOM.render(
  <React.StrictMode>
     <div className='p-container'>  
        <App />
     </div>
   </React.StrictMode>,
   document.getElementById("root")

)
