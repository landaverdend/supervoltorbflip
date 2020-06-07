import React from 'react';

const MemoIcon = (props) => {
  let memos = props.memoState;
  return (
    <>
      {memos.BOMB ? (
        <img
          id='bombIcon'
          src={require('../assets/memoIcons/memoBomb.png')}
        ></img>
      ) : (
        ''
      )}
    </>
  );
};

export default MemoIcon;
