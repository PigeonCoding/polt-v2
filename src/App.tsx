import { useRef } from 'react';
import './App.css';
import ButtonList from './component/ButtonList';

const App = () => {
  const buttRef = useRef(null)


    return (
      <div className="App">
        <div className='butContain'>
          <button className='mainButton'  onClick={() => {
            // window.location.reload()
            buttRef.current.alll()
            }}>
            polt
          </button>
        </div>
        <ButtonList ref={buttRef}/>
      </div>
    );
}

export default App;
