
import logo from './logo.svg';
import './App.css';
import AccountMenu from './components/Navbar';
import TurkeyMap from 'turkey-map-react';
import { Tooltip, Grid } from '@mui/material';
import ListLeft from './components/ListLeft';

function App() {
  const renderCity = (cityComponent, cityData) => ( 
    <div className='circle'>{cityComponent}</div>
    
  );
  return (
    <div className="App">
      <header className="App-header">
        <AccountMenu></AccountMenu>
      </header>
      <Grid container>
        <Grid item xs={2}>
          <ListLeft/>
        </Grid>
        <Grid item xs={10}>
          <TurkeyMap showTooltip hoverable viewBox={{top: 0, left: 0, width: 1050, height: 585}}></TurkeyMap>
        </Grid>
      </Grid>      
    </div>
  );
}

export default App;
