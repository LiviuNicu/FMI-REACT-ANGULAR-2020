import React, { useState, useEffect } from "react";
import {
  addPlayer,
  updatePlayers,
  players,
  games,
  doGetHistory,
  doSaveScore,
} from "./../../slices/gameSlice";
import { useSelector, useDispatch } from "react-redux";
import { Player } from "./../../pages";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export function Game() {
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [winner, setWinner] = useState(false);
  const dispatch = useDispatch();
  const allPlayers = useSelector(players);
  const allGames = useSelector(games);
  useEffect(() => {
    if (!allGames.length) {
      dispatch(doGetHistory());
    }
  }, [allGames]);
  const handleClose = () => {
    setShow(false);
  };
  const add = () => {
    const data = {
      _id: allPlayers.length,
      name: name,
      score: 0,
      isServing: allPlayers.length ? true : false,
      winner: false,
    };
    dispatch(addPlayer(data));
    setName("");
  };
  const getSum = (players) => {
    return players.reduce((accumulator, currentItem) => {
      return (accumulator += currentItem.score);
    }, 0);
  };

  const updateScore = (id) => {
    console.log(id);
    let tempPlayers = JSON.parse(JSON.stringify(allPlayers));
    tempPlayers = tempPlayers.map((item) => {
      if (item._id === id) {
        item.score++;
      }
      return item;
    });

    let sum = getSum(tempPlayers);

    tempPlayers = tempPlayers.map((item) => {
      if (sum % 5 === 0) {
        item.isServing = !item.isServing;
      }

      if (item.score === 21) {
        item.winner = true;
        setWinner(true);
        setShow(true);
      }

      return item;
    });
    dispatch(updatePlayers(tempPlayers));
  };

  const resetScore = () => {
    let tempPlayers = JSON.parse(JSON.stringify(allPlayers));
    tempPlayers = tempPlayers.map((item) => {
      item.score = 0;
      item.winner = false;
      return item;
    });
    setWinner(false);
    dispatch(updatePlayers(tempPlayers));
  };

  const newPlayer = () => {
    setWinner(false);
    dispatch(updatePlayers([]));
  };

  const save = () => {
    dispatch(doSaveScore(allPlayers));
    setShow(false);
  };

  return (
    <>
      <div className="container">
        <Tabs defaultActiveKey="game" id="uncontrolled-tab-example">
          <Tab eventKey="game" title="Game">
            {allPlayers.length !== 2 ? (
              <>
                <div className="form-group">
                  <label>Add Player</label>
                  <input
                    className="form-control"
                    placeholder="Add player ..."
                    onChange={(event) => setName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.keyCode === 13) {
                        add();
                      }
                    }}
                    value={name}
                  />
                  <button className="btn btn-success" onClick={add}>
                    Add
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="row">
                  {allPlayers.map((item) => {
                    return (
                      <Player
                        key={item._id}
                        details={item}
                        name={item.name}
                        onUpdateScore={updateScore}
                        winner={winner}
                      />
                    );
                  })}
                </div>
                {winner && (
                  <>
                    <button className="btn btn-primary" onClick={resetScore}>
                      Reset Score
                    </button>
                    <button className="btn btn-primary" onClick={newPlayer}>
                      New Players
                    </button>
                  </>
                )}
              </>
            )}
          </Tab>
          <Tab eventKey="history" title="History">
            <table className="table">
              <tr>
                <td>Added by</td>
                <td>Player 1</td>
                <td>Player 2</td>
              </tr>
              {allGames.length &&
                allGames.map((game) => {
                  return (
                    <tr>
                      <td>{game.addedBy.name}</td>
                      {game.players.map((player) => {
                        return (
                          <td>
                            {player.name} {player.score}
                            {(player.winner || player.score === 21) && (
                              <b>WINNER!</b>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </table>
          </Tab>
        </Tabs>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>WE HAVE AN WINNER!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you want to save the score?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={save}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
