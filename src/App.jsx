import React from 'react'
import {Grid, Slider, Typography, Paper, makeStyles, IconButton, Snackbar} from '@material-ui/core'
import CopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '20px',
    marginBottom: '20px'
  },
  result: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px'
  }
}))

const App = () => {
  const [rgba, setRgba] = React.useState({
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0
  })
  const [copied, setCopied] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()

  const handleChange = (event, newValue) => {
    setRgba({...rgba, [event.target.id]: newValue})
    document.body.style.background = `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, 0.${rgba.alpha})`
  }

  const getRgba = () => {
    return `background: rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, 0.${rgba.alpha})`
  }

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const copyClipboard = (event) => {
    const el = document.createElement("input");
    el.value = getRgba()
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true)
    handleClick()
  }


  return(
    <div className="app">
      <Snackbar open={open} onClose={handleClose} message="Copied!" />
      <Paper className={classes.paper}>
      <Grid container spacing="2">
          <Grid item>
            <Typography>Red</Typography>
          </Grid>
          <Grid item xs>
            <Slider max="257" value={rgba.red} id="red" onChange={handleChange} aria-labelledby="continuous-slider"/>
          </Grid>
        </Grid>
        <Grid container spacing="2">
          <Grid item>
            <Typography>Green</Typography>
          </Grid>
          <Grid item xs>
            <Slider max="260" value={rgba.green} id="green" onChange={handleChange} aria-labelledby="continuous-slider"/>
          </Grid>
        </Grid>
        <Grid container spacing="2">
          <Grid item>
            <Typography>Blue</Typography>
          </Grid>
          <Grid item xs>
            <Slider max="260" value={rgba.blue} id="blue" onChange={handleChange} aria-labelledby="continuous-slider"/>
          </Grid>
        </Grid>
        <Grid container spacing="2">
          <Grid item>
            <Typography>Alpha</Typography>
          </Grid>
          <Grid item xs>
            <Slider max="100" value={rgba.alpha} id="alpha" onChange={handleChange} aria-labelledby="continuous-slider"/>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.result}>
        <Typography>{getRgba()}</Typography>
        <IconButton onClick={copyClipboard}>
          <CopyIcon />
        </IconButton>
      </Paper>
    </div>
  )
}

export default App