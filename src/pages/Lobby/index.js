import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LobbyStatus, PlayerBubble } from "../../components";
import { useSelector } from "react-redux";
import { useSocket } from "../../contexts/SocketProvider";
import { makeStyles } from '@material-ui/core';
import { CardContent, Card, Box } from '@material-ui/core';

const Lobby = () => {
    const socket = useSocket();
    const navigate = useNavigate();
    const room = useSelector((state) => state.socketId);
    const category = useSelector((state) => state.category);
    const difficulty = useSelector((state) => state.difficulty);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
      socket.emit('create', room);
    }, []);

    useEffect(() => {
      socket.on('user_joined', (firstname, lastname) => {
        setPlayers(players => [...players, {firstname: firstname, lastname: lastname}])
      });
    }, [socket]);

    const handleStart = (() => {
      socket.emit('start_game', category, difficulty);
      navigate("/leaderboard")
    })
    
    const useStyles = makeStyles({
        mainStyle: {
          backgroundSize: "cover"
        },
        cardStyle: {
          backgroundColor: "#140100"
        },
        box: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh"
        },
        writing: {
          color: "white",
          fontSize: "20px",
          padding: "10px"
        },
        button: {
          backgroundColor: "#140100",
          color: "#61DBFB",
          marginTop: "10px",
          fontSize: "20px"
        }
      });
    
      const classes = useStyles();
    return (
        <div id="Lobby" className={classes.mainStyle}>
          <Box className={classes.box}>
          <Card className={ classes.cardStyle }>
          <CardContent>
          <h2 className={classes.writing}>Lobby</h2>
    
          {/* <LobbyStatus/> */}
    
          
          <div id="players">
            {players &&
              players.map((player) => (
                <PlayerBubble key={players.indexOf(player)} player={player} />
              ))}
          </div>
          </CardContent>
          </Card>
          </Box>
        </div>
      );
    };
    
export default Lobby;
    