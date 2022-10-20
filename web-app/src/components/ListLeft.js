import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import cities from '../../src/json/cities.json';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ListLeft(props) {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");
  const [city, setCity] = React.useState("");
  const [date, setDate] = React.useState("");
  const [why, setWhy] = React.useState("");
  const [byWho, setByWho] = React.useState("");
  const [protection, setProtection] = React.useState("");
  const [how, setHow] = React.useState("");
  const [killerStatus, setKillerStatus] = React.useState("");
  const [source, setSource] = React.useState("");
  const [name, setName] = React.useState("");
  const handleOpen = (data) => {
    setName(data.name)
    setAge(data.age)
    setCity(data.city)
    setDate(data.date)
    setWhy(data.why[0].why)
    setByWho(data.byWho[0].byWho)
    setProtection(data.protection)
    setHow(data.howKilled[0].howKilled)
    setKillerStatus(data.killerStatus[0].killerStatus)
    setSource(data.source)
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const [sideData, setSideData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCity, setSelectedCity] = React.useState(props.data);
  const [pageNumber, setPageNumber] = React.useState(1)
  const listRef = React.useRef(null);

  const onScroll = e => {
    if((e.target.scrollTop/(e.target.scrollHeight-e.target.clientHeight)*100) >= 95){
      setPageNumber(pageNumber+1)
    }
  };

  React.useEffect(()=>{
    setSideData([])
    setPageNumber(1)
    setSelectedCity(props.data)
  },[props.data])

  React.useEffect(()=>{
    setIsLoading(true)
    if(selectedCity === ""){
      axios
      .get("http://localhost:4000/murderall/"+pageNumber)
      .then(function (response) {
        if(response.data.error === undefined){
          setSideData(old => old.concat(response.data))
        }
      });
    }else{
      axios
      .get("http://localhost:4000/murderbycity/"+selectedCity+"/"+pageNumber)
      .then(function (response) {
        if(response.data.error === undefined){
          setSideData(old => old.concat(response.data))
        }
      });
    }
    //listRef.current.scrollTo(0,0);
    setIsLoading(false)
  },[selectedCity, pageNumber])

  return (
    <Paper ref={listRef} onScroll={onScroll} style={{height: '92vh', overflow: 'auto'}}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {sideData.map((data, index)=>{
          return(
            <ListItemButton onClick={()=>{handleOpen(data)}} key={index} alignItems="flex-start">
            <ListItemText
              primary={data.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {cities.find(city => city.plate === data.city).name}
                  </Typography>
                  {" - "+data.date}
                </React.Fragment>
              }
              />
            </ListItemButton>
          )
        })}
        <CircularProgress className={isLoading ? 'loading' : 'hideLoading'} />
      </List>
      <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
    <Fade in={open}>
      <Box sx={style}>
        <Typography color={"red"} id="spring-modal-title" variant="h6" component="h2">
          {name}
        </Typography>
        <Typography id="spring-modal-description" sx={{ mt: 2 }}>
          Yaşı: {age}
        </Typography>
        <Typography id="spring-modal-description" sx={{ mt: 2 }}>
          Şehir: {city ? cities.find(a => a.plate === city).name : ""}
        </Typography>
        <Typography id="spring-modal-description" sx={{ mt: 2 }}>
          Tarih: {date}
        </Typography>
        <Typography id="spring-modal-description" sx={{ mt: 2 }}>
          Neden Öldürüldü: {why}
        </Typography>
        <Typography id="spring-modal-description" sx={{ mt: 2 }}>
          Kim Tarafından Öldürüldü: {byWho}
        </Typography>
        <Typography id="spring-modal-description" sx={{ mt: 2 }}>
          Koruma Talebi: {protection}
        </Typography>
        <Typography id="spring-modal-description" sx={{ mt: 2 }}>
          Nasıl Öldülüldü: {how}
        </Typography>
        <Typography id="spring-modal-description" sx={{ mt: 2 }}>
          Katilin Durumu: {killerStatus}
        </Typography>
        <Typography id="spring-modal-description" sx={{ mt: 2 }}>
          Kaynak: {source}
        </Typography>
      </Box>
    </Fade>
  </Modal>
    </Paper>
    
  );
}