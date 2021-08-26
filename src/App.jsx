import './App.css';
import {useState} from "react";
import logo from '../src/mark.png'


const App = () => {

  const [inputValue, setInputValue] = useState('');
  const [isEnterIpTextShow, setIsEnterIpTextShow] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [loadData, setLoadData] = useState(false);
  const [dataIP, setDataIp] = useState(undefined);
  const [TextShow, setTextShow] = useState(true);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const getDataFromIp = (event) => {
    event.preventDefault();
    setIsEnterIpTextShow(true);
    setLoadData(true);
    setInputValue('');
    setErrorText('');
    setTextShow(false)
    const dataResultUri = `https://ipapi.co/${inputValue}/json/`;
    fetch(dataResultUri)
      .then(res => res.json())
      .then((result) => {
          const responseErrorText = result.error && result.reason;
          if (responseErrorText) {
              setErrorText(responseErrorText);
              setLoadData(false);
              setDataIp(undefined);
          } else {
              setDataIp(result);
              setLoadData(false);
          }
      },
          (error) => {
              setLoadData(false);
              setDataIp(undefined);
              setErrorText(error.message);
          }
      )
  };

  return (
    <div className="App" style={{ padding: 25, textAlign: "left" }}>
        
        {isEnterIpTextShow &&
              <div className="container__notify" >
                  <img className='logo' src={logo} alt='logo'/>
                  <h1>Find My IP</h1>
              </div>
          }

      <form onSubmit={getDataFromIp} className='form_style'>
        <label>
          
          <input type="text" value={inputValue} onChange={handleInputChange} name="name" placeholder='8.8.8.8' />
        </label>
        <button type="submit">Search</button>
      </form>
      {TextShow &&
      <div className='text__show'>Enter IP and press “Search” to get geolocation data</div>
    }
      <div className="container" >
          {loadData &&
              <div className="container__loader" style={{ paddingTop: 30 }}>
                  Loading...
              </div>
          }

          {dataIP &&
              <div className="container__list" style={{ paddingTop: 30 }}>
                  {dataIP && Object.keys(dataIP).map((key) => {
                      return (
                          <div className="container__item" key={Math.random()}>
                              <span className="ico">#</span>
                              <div>{key}: <span>{dataIP[key]}</span></div>
                          </div>
                      )
                  })}
              </div>
          }

          {errorText.length > 0 &&
              <div className="container__error" style={{ paddingTop: 30, color: 'red' }}>
                  {errorText}
              </div>
          }
      </div>
    </div>
  );
}

export default App;
