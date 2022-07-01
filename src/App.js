import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#282c34',
  color: 'rgb(210, 210, 210)',
  border: '1px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  paddingRight: 7.5,
  paddingLeft: 7.5,
  paddingTop: 5,
  paddingBottom: 2.5,
};


function App() {
  const [ longUrl, setLong ] = useState('http://')
  const [ shortUrl, setShort ] = useState(false)
  const [ code, setCode ] = useState()
  const [open, setOpen] = useState(false);
  const [ isSubmitting, setSubmitting ] = useState(false)


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  useEffect(()=>{

  })

  const createUrl = (e) => {
    e.preventDefault()
    setSubmitting(true)
    axios.post("https://gotiny.cc/api", {
      input: longUrl
    })
      .then((res)=>{
        setSubmitting(false)
        console.log(res.data[0].code)
        setShort(`https://gotiny.cc/${res.data[0].code}`)
        handleOpen()
      })
      .catch((err)=>{
        setSubmitting(false)
        console.log(err)
        toast.error("An error occured. Please check your URL.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
  }

  return (
    <div className='app-wrapper'>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="App">
        <Paper elevation={4} className='paper'>
          <h2>SpaceSaver URL Shortener</h2>
          <b>Long URL: </b>
          {longUrl.length < 20
            ? ' ' + longUrl
            : ' ' + longUrl.slice(0,21) + '.....'
          }
          <form className="column form-padding" onSubmit={createUrl}>
            <input type='text' className='form-input form-padding' onChange={(e)=>setLong('http://' + e.target.value)}></input>
            {isSubmitting === false 
            ? (<Button className=' form-button form-padding' variant='contained' type='submit'>
              Shorten URL
              </Button>)
             : (<Button disabled className=' form-button form-padding' variant='contained' type='submit'>
             <CircularProgress size={24} />
             </Button>)
             }
          </form>
        </Paper>

        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="modal"
      >
        <Fade in={open}>
          <Box sx={style}>
            <h2>You Shortened URL is Ready!</h2>
            <p>You can now visit <a href={longUrl}>{longUrl}</a> at the link below!</p>
            <a href={shortUrl}>{shortUrl}</a>
            <br></br>
            <Button onClick={handleClose} variant='contained' className='modal-button'>Close</Button>
          </Box>
        </Fade>

      </Modal>

      </div>
      <div className='signiature'>
        Developed by Wil Smith
      </div>
    </div>

  );
}

export default App;
