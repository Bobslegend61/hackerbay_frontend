import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      width: 0,
      height: 0, 
      maze: [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,2],
        [0,1,0,0,0,0,0,0,0,1],
        [0,1,0,1,1,1,1,1,1,1],
        [0,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
      ],
      col: 3,
      row: 0
    }
  }

  componentWillMount = () => {
    let width = prompt(`width`, `should be 300 and above`);
    let height = prompt(`height`, `should be 300 and above`);

    if(width < 300 || height < 300) {
      return alert("size should be 300 and above");
    }

    this.setState({
      width: Math.round(width),
      height: Math.round(height)
    });
  }

  componentDidMount() {
    if(this.state.width > 0 && this.state.height > 0) {
      this.transverse(this.state.maze,3,0);
    }
  }

  transverse = (maze, col, row) => {
    if(maze[col][row] === 2) {
      this.setState({
        col: col, 
        row: row
      });
      return alert("Game over!!");
    }else if(maze[col][row] === 1) {
      maze[col][row] = 9;
      if(col < maze.length - 1) {
        setTimeout(() => {
          this.transverse(this.state.maze,col + 1, row);
        }, 1000);
      }
      if(row < maze[col].length - 1) {
        setTimeout(() => {
          this.transverse(this.state.maze,col, row + 1);
        }, 1000);
      }
      if(col > 0) {
        setTimeout(() => {
          this.transverse(this.state.maze,col - 1, row);
        }, 1000);
      }
      if(row > 0) {
        setTimeout(() => {
          this.transverse(this.state.maze,col, row - 1);
        }, 1000);
      }
      this.setState({
        col: col, 
        row: row
      });
    }
    
  }
  
  

  render() {
    let board = (this.state.height !== 0 && this.state.height !== 0) ? <div className="App-board" style={{
      width: this.state.width + "px", 
      height: this.state.height + "px",
      display: "grid",
      gridTemplateRows: "repeat(10, 1fr)"
    }}>
      {this.state.maze.map((rows, i) => {
        return (<div className="App-board-rows" key={i}>
          {rows.map((cols, j) => {
            return (<div className="App-board-cols" key={j}>
              {((this.state.maze[i][j] === 2) && (j !== this.state.row || i !== this.state.col)) ? <img src={require("./img/fruit.jpg")} alt="fruit"  /> : null}
              {(j === this.state.row && i === this.state.col) ? <img src={require("./img/mazeman.png")} alt="mazeman"/> : null}
            </div>)
          })}
        </div>);
      })}
    </div> : null;
    return (
      <div className="App">
        {board}
      </div>
    );
  }
}

export default App;
