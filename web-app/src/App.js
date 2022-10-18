
import logo from './logo.svg';
import './App.css';
import AccountMenu from './components/Navbar';
import TurkeyMap from 'turkey-map-react';
import { Tooltip, Grid } from '@mui/material';
import ListLeft from './components/ListLeft';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [cityCount, setCityCount] = useState([]);
  const [sideData, setSideData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  useEffect(()=>{
    axios
    .get("http://localhost:4000/getcitycount")
    .then(function (response) {
      setCityCount(response.data)
    });
  },[])

  useEffect(()=>{
    if(selectedCity === ""){
      axios
      .get("http://localhost:4000/murderall")
      .then(function (response) {
        setSideData(response.data)
      });
    }else{
      axios
      .get("http://localhost:4000/murderbycity/"+selectedCity)
      .then(function (response) {
        setSideData(response.data)
      });
    }
  },[selectedCity])

  const handleClick = ({plateNumber}) => {
    setSelectedCity(plateNumber)
  };

  const renderCity = (cityComponent, city) => {
    for(var i in cityCount){
      if(cityCount[i]._id == city.plateNumber){
        if(cityCount[i].count <25){
          cityComponent.props['data-count-class'] = "1";
        }else if(25<=cityCount[i].count && cityCount[i].count<50){
          cityComponent.props['data-count-class'] = "2";
        }else if(50<=cityCount[i].count && cityCount[i].count<75){
          cityComponent.props['data-count-class'] = "3";
        }else if(75<=cityCount[i].count && cityCount[i].count<100){
          cityComponent.props['data-count-class'] = "4";
        }else if(100<=cityCount[i].count && cityCount[i].count<150){
          cityComponent.props['data-count-class'] = "5";
        }else if(150<=cityCount[i].count && cityCount[i].count<200){
          cityComponent.props['data-count-class'] = "6";
        }else if(200<=cityCount[i].count){
          cityComponent.props['data-count-class'] = "7";
        }
        cityComponent.props['data-count'] = cityCount[i].count;
      }
    }
    
    cityComponent.props.key = city.id;
    return (cityComponent);
  };

  return (
    <div className="App">
      <header className="App-header">
        <AccountMenu></AccountMenu>
      </header>
      <Grid container>
        <Grid item xs={2}>
          <ListLeft data={sideData}/>
        </Grid>
        <Grid item xs={10}>
          <TurkeyMap showTooltip hoverable onClick={handleClick} cityWrapper={renderCity} viewBox={{top: 0, left: 0, width: 1050, height: 585}}></TurkeyMap>
        </Grid>
      </Grid>      
    </div>
  );
}

export default App;
