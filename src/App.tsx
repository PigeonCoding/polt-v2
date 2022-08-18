import React from 'react';
import './App.css';
import ButtonList from './component/ButtonList';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <div className='mainButton'>
          <button onClick={(e) => {
            window.location.reload()
            }}>
            polt
          </button>
        </div> 
        <ButtonList/>
      </div>
    );
  };
  
}

export default App;