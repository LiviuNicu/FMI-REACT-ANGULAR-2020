import React, { useState } from "react";
import { addPlayer, updatePlayers, players } from "./../../slices/gameSlice";
import { useSelector, useDispatch } from "react-redux";
import { Player } from "./../../pages";

export function Game() {
  const [name, setName] = useState("");
  const [winner, setWinner] = useState(false);
  const dispatch = useDispatch();
  const allPlayers = useSelector(players);

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

  return (
    <>
      <div className="container">
        {console.log(allPlayers)}

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
      </div>
    </>
  );
}
