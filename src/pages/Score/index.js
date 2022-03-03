import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { makeStyles, Table, TableHead, TableHeader, TableCell, TableRow, TableBody, Paper, TableContainer } from '@material-ui/core';
import background from "../../img/background.jpg";
import { CardContent, Card, Box } from '@material-ui/core';
import { Title, Nav } from "../../components";
import { loadExercise, isResit } from "../../actions";
import { Results } from '../index';

const Score = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState([]);
  const userId = useSelector(state => state.userId);

  useEffect(() => {
    async function getCompleted() {
      const response = await fetch (`https://kode-server.herokuapp.com/students/${userId}/completedexercises`,{
        method: 'GET',
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('token') }});
      let data = await response.json();
      setCompleted(data)
    }
    getCompleted();
  },[])

  const handleHomeworkSelect = async (topic, difficulty) => {
    dispatch(loadExercise(topic, difficulty));
    dispatch(isResit(true));
    await new Promise(res => setTimeout(res, 1000));
    navigate('/questions')
  };

  

    // Adding Material UI
    const useStyles = makeStyles({

      background: {
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "cover",
        height: "100vh",    
      },
      
      box: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "90vh",
        // boxShadow: "10px 10px 20px black;",
        paddingTop: "20px"

      },
      writing: {
        color: "black",
        fontSize: "20px"
      },
      cardStyle: {
        backgroundColor: "white",
        width: "500px",
        height: "500px",
        borderRadius: "10px"
      },
      button: {
        backgroundColor: "lightblue",
        borderColor: "lightblue",
        borderRadius: "5px"
      },
      nav: {
        fontWeight: "bold"
      }
     
    });
  
    const classes = useStyles();
  
    return (
      <div className={classes.background}>
        <Nav />
        <Title />
        <Box className={classes.box}>
      <Card className={ classes.cardStyle }>

        {/* <Paper>{completed.map(work =>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.nav} align="center">Topic</TableCell>
            <TableCell className={classes.nav} align="center">Difficulty</TableCell>
            <TableCell className={classes.nav} align="center">Score</TableCell>
            <TableCell className={classes.nav} align="center">Try Again</TableCell>
          </TableRow>
        </TableHead>


        <TableCell align="center">{work.topic}</TableCell>
        <TableCell align="center">{work.difficulty}</TableCell>
        <TableCell align="center">{work.score}</TableCell>
        <TableCell align="center"><button className={classes.button} id={work.topic} onClick={() => handleHomeworkSelect(work.topic, work.difficulty)}>Start!</button></TableCell>
        </ Table>)}
        
        </Paper> */}
        <TableContainer component={Paper}>
          <Table sx={{ midWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.nav} align="center" >Topic</TableCell>
                <TableCell className={classes.nav} align="center">Difficulty</TableCell>
                <TableCell className={classes.nav} align="center">Score</TableCell>
                <TableCell className={classes.nav} align="center">Try Again</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {completed.map((work) => (
                <TableRow
                key={work.name}
                sx={{'&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {/* <TableCell component="th" scope="row">
                    {work.name}
                  </TableCell> */}
                  <TableCell align="center">{work.topic}</TableCell>
                  <TableCell align="center">{work.difficulty}</TableCell>
                  <TableCell align="center">{work.score}</TableCell>
                  <TableCell align="center"><button className={classes.button} id={work.topic} onClick={() => handleHomeworkSelect(work.topic, work.difficulty)}>Start!</button></TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        </Card>
        </Box>
      </div>
    );
};
  
export default Score;
  