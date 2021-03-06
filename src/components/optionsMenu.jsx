import React from "react";
import { connect } from "react-redux";
import "../styles/options.css";
import {
  TOGGLE_MENU,
  UPDATE_GRID,
  RESET_GRID,
  CHANGE_VIEW,
  FLIP_ALL_UNCLICKED,
  RESET_ROUND_SCORE,
  UPDATE_TOTAL_SCORE,
  UPDATE_LEVEL,
} from "../actions/actionTypes";

const Views = {
  DEFAULT: 0,
  ABOUT: 1,
  RULES: 2,
  OPTIONS: 3,
  CONTROLS: 4,
  RESET: 5,
};

const OptionsMenu = (props) => {
  // const [view, setView] = useState(Views.DEFAULT);
  let view = props.view;
  let setView = props.setView;

  return (
    <>
      <i
        className={"fa fa-cog"}
        id="settingsIcon"
        onClick={() => {
          if (view !== Views.DEFAULT) setView(Views.DEFAULT);
          props.toggleMenu();
        }}
      ></i>
      <div className={props.menuOpened ? "modal show-modal" : "modal"}>
        <div className="modal-content">
          <span
            className="close-button"
            onClick={() => {
              props.toggleMenu();
              setTimeout(() => setView(Views.DEFAULT), 250);
            }}
          >
            X
          </span>
          {view !== Views.DEFAULT ? (
            <span
              className="back-button"
              onClick={() => {
                props.setView(Views.DEFAULT);
              }}
            >
              &larr;
            </span>
          ) : null}

          {view === Views.DEFAULT ? (
            <ul id={"main"}>
              <li
                onClick={() => {
                  setView(Views.ABOUT);
                }}
              >
                <span>About</span>
              </li>
              <li
                onClick={() => {
                  setView(Views.RULES);
                }}
              >
                <span>Rules</span>
              </li>
              <li
                onClick={() => {
                  setView(Views.OPTIONS);
                }}
              >
                <span>Options</span>
              </li>
              <li>
                <span
                  onClick={() => {
                    setView(Views.CONTROLS);
                  }}
                >
                  Controls
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    props.flipToUnclicked();
                    setTimeout(props.resetGrid, 250);
                    props.resetRoundScore();
                    props.updateTotalScore(0);
                    props.updateLevel(1);
                  }}
                >
                  Reset
                </span>
              </li>
            </ul>
          ) : null}

          {view === Views.OPTIONS ? (
            <>
              <div className="options">
                <ul>
                  <li>
                    Board Size
                    <div className={"options-buttons"}>
                      <button
                        onClick={() => {
                          if (props.dimension - 1 > 3) {
                            props.updateGrid(props.dimension - 1);
                            props.resetRoundScore();
                            props.updateTotalScore(0);
                            props.updateLevel(1);
                          }
                        }}
                      >
                        <b>-</b>
                      </button>
                      {props.dimension - 1}
                      <button
                        onClick={() => {
                          if (props.dimension + 1 < 10) {
                            props.updateGrid(props.dimension + 1);
                            props.resetRoundScore();
                            props.updateTotalScore(0);
                            props.updateLevel(1);
                          }
                        }}
                      >
                        <b>+</b>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </>
          ) : null}

          {view === Views.ABOUT ? (
            <div className={"text-content"}>
              ABOUT
              <p>
                This is a recreation of the minigame called 'Voltorb Flip' from
                Pokemon Heartgold and SoulSilver- with some additional
                difficulty alterations added on. I made this using ReactJS,
                along with the Redux addon. For those interested, source code
                can be found{" "}
                <a
                  href="https://github.com/landaverdend/supervoltorbflip"
                  target="blank"
                >
                  here.
                </a>
              </p>
            </div>
          ) : null}

          {view === Views.CONTROLS ? (
            <div className={"text-content"}>
              CONTROLS
              <ul id="control-list">
                <li>
                  <img
                    id="arrows"
                    src={require("../assets/menuIcons/arrows.png")}
                    alt={""}
                  ></img>
                  <div>use the arrow keys or cursor to select a tile. </div>
                </li>
                <li>
                  <img
                    id="enter"
                    src={require("../assets/menuIcons/enter.png")}
                    alt={""}
                  ></img>
                  <div>the spacebar, mouse, and enter will flip tiles </div>
                </li>
                <li>
                  <img
                    id="keys"
                    src={require("../assets/menuIcons/keys.png")}
                    alt={""}
                  ></img>
                  <div>the 1, 2, 3 keys can be used to mark tiles.</div>
                </li>
                <li>
                  <img
                    id="tilde"
                    src={require("../assets/menuIcons/tilde.png")}
                    alt={""}
                  ></img>
                  <div>the tilde key can be used to mark tiles as a bomb.</div>
                </li>
              </ul>
            </div>
          ) : null}

          {view === Views.RULES ? (
            <div className={"rules-content"}>
              {" "}
              RULES
              <p>
                The objective of the game is to uncover all non-1 tiles on a
                given board and move up to higher levels, which give you more
                coins. This repeats up to level 8, where the game ends.
              </p>
              <p>
                The numbers on the side and bottom of the game board denote the
                sum of points in the row, and also how many bombs/Voltorbs are
                in that row. Each flipped tile multiplies your round score by
                that tile's value. If the tile has a Voltorb on it, then you
                lose all collected coins and go down a level.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    toggleMenu: () => dispatch({ type: TOGGLE_MENU }),
    updateGrid: (val) => dispatch({ type: UPDATE_GRID, value: val }),
    resetGrid: (val) => dispatch({ type: RESET_GRID }),
    setView: (val) => dispatch({ type: CHANGE_VIEW, value: val }),
    flipToUnclicked: () => dispatch({ type: FLIP_ALL_UNCLICKED }),
    resetRoundScore: () => dispatch({ type: RESET_ROUND_SCORE }),
    updateTotalScore: (val) =>
      dispatch({ type: UPDATE_TOTAL_SCORE, value: val }),
    updateLevel: (val) => dispatch({ type: UPDATE_LEVEL, value: val }),
  };
}

function mapStateToProps(state) {
  return {
    roundScore: state.gameReducer.roundScore,
    totalScore: state.gameReducer.totalScore,
    menuOpened: state.menuReducer.menuOpened,
    dimension: state.boardReducer.dimension,
    view: state.menuReducer.view,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsMenu);
