import React, { useRef } from 'react';
import './App.css';
import ButtonList from './component/ButtonList';

// class App extends React.Component {

  

//   render() {

    
  
// }

const App = () => {
  const buttRef = useRef(null)


    return (
      <div className="App">
        <div className='mainButton'>
          <button   onClick={(e) => {
            // window.location.reload()
            buttRef.current.alll()
            }}>
            polt
          </button>
        </div> 
        {/* <button onClick={(e) => {buttRef.current.alll()}} >hello</button> */}
        <ButtonList ref={buttRef}/>
      </div>
    );
}

export default App;