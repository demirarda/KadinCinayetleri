import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import cities from '../json/cities.json'

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
    setWhy(data.why)
    setByWho(data.byWho)
    setProtection(data.protection)
    setHow(data.how)
    setKillerStatus(data.killerStatus)
    setSource(data.source)
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  return (
    <Paper style={{maxHeight: '92vh', overflow: 'auto'}}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {props.data.map((data, index)=>{
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
                    {data.city}
                  </Typography>
                  {" - "+data.date}
                </React.Fragment>
              }
              />
            </ListItemButton>
          )
        })}
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
          Şehir: {city}
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