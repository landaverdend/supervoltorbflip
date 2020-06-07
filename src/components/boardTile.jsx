import { connect } from 'react-redux';
import React, { useState } from 'react';
import MemoIcon from './memoIcon';
import '../styles/board.css';

const BoardTile = (props) => {
  //local states for this stuff.
  const [clicked, setClicked] = useState(false); //count is initialized to zero.
  const [memos, setMemos] = useState({
    BOMB: false,
    ONE: false,
    TWO: false,
    THREE: false,
  });
  const [flip, setFlip] = useState(false);
  const [hovered, setHovered] = useState(false);

  //flip the sign of whether or not hovered over.
  const handleMouseOver = (bool) => {
    setHovered(bool);
  };

  const handleLeftClick = (event) => {
    if (props.clickable) setClicked(true);
    setFlip(true);
    resetMemos();
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    if (props.clickable && !clicked) setMemos({ ...memos, BOMB: !memos.BOMB });
  };

  const resetMemos = () => {
    setMemos({ BOMB: false, ONE: false, TWO: false, THREE: false });
  };

  return (
    <div
      className={'grid-item'}
      onContextMenu={(event) => {
        handleRightClick(event);
      }}
      //mouse hover
      onMouseEnter={(event) => {
        handleMouseOver(true);
      }}
      onMouseLeave={(event) => {
        handleMouseOver(false);
      }}
    >
      <div className='container'>
        {props.clickable ? (
          //clickable tile
          <div
            className={flip ? 'card flipped' : 'card'}
            onClick={() => {
              handleLeftClick();
            }}
          >
            <div className={'front'}>
              <MemoIcon memoState={memos} />
              <img
                src={
                  hovered
                    ? require('../assets/tileHover.png')
                    : require('../assets/tile.png')
                }
                draggable={'false'}
              ></img>
            </div>
            <div className='back'>
              <img
                src={
                  hovered
                    ? require('../assets/clickedTileHover.png')
                    : require('../assets/clicked.png')
                }
                draggable={'false'}
              ></img>
              <div className={'valueIcon'}>
                <img src={require('../assets/voltorb.png')}></img>
              </div>
            </div>
          </div>
        ) : (
          //outside tile
          <img
            src={require('../assets/outsideTile' +
              ((props.row + props.col) % 5) +
              '.png')}
            alt={''}
            draggable='false'
          ></img>
        )}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    dimension: state.boardReducer.dimension,
    grid: state.boardReducer.grid,
  };
}

export default connect(mapStateToProps)(BoardTile);
