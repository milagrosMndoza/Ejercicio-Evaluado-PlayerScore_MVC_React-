"use strict"
class Model {
  constructor(PLAYERS) {
    this.players = [
      {
        name: "Jim Hoskins",
        score: 31,
        id: 1
      },
      {
        name: "Andree Hoskins",
        score: 35,
        id: 2
      },
      {
        name: "Alena Hoskins",
        score: 42,
        id: 3
      }
    ];
    this.input = null;
    this.callback = null;
  }
  subscribe(render) {
    this.callback=render;
  }

  notify() {
    this.callback();
  }
  addPlayer(name) {
    console.log(this.input.value);
    if(this.input!= null && this.input.value !=''){
    this.players.push({
      name: this.input.value,
      score: 0,
      id: Utils.uuid()
    });
    
    this.notify();
    this.input.value="";
  }
}
   increment(index){
    if(this.players[index].score>0){
      this.players[index].score++;
      this.notify();
    }
   }
   decrement(index){
    if(this.players[index].score>0){
      this.players[index].score--;
      this.notify();
    }}
    cambiar(e,index, x){
      this.players[index].score = this.players[index].score +x;
      this.notify();
    }
}
/*******************************************************/
class Timer extends React.Component {
    constructor (props) {
    super (props);
    this.state = {
      time: 0
    }
}
render () {
    const {title} = this.props;
    const start = (e) => {
      
      if(e.target.textContent == 'start'){
        e.target.textContent = 'stop';
        
        this.timeStart();
      }
      else{
        e.target.textContent = 'start';
        this.timeStop();
      }
    }
    const reset = (e) => {
      this.timeReset();
    }
    return (
            <div className="stopwatch-time">
              
              <span> {this.state.time}</span><br/>
              <button className= "stopwatch" onClick={start}>start</button>
              <button className= "stopwatch" onClick={reset}>reset</button>
            </div>
           
     );
  }
 
  timeStart () {
    this.timer = setInterval( () => {
    this.setState ({
      time : this.state.time+1
    });}, 1000);
  }

  timeStop () {
    clearInterval(this.timer);
  }
  timeReset(){
    clearInterval(this.timer);
    this.setState ({
      time :0
    });
  }
}
 
/*******************************************************/
const PlayerApp = ({ title, model }) => {
  const Header = (
    <div className="header">
      <div className="col-sm-10">
        <table className="stats">
          <tr>
            <td>PLAYERS:</td>
            <td>{model.players.length}</td>
          </tr>
          <tr>
            <td>TOTAL POINTS:</td>
            <td>{model.players.map(x => x.score).reduce((x, y) => x + y)}</td>
          </tr>
        </table>
      </div>
      <div className="col-sm-4.5">
      
        <div className="stopwatch">
          <h2>STOPWATCH</h2>
           <Timer/>
         </div>
      </div>
    </div>
  );

  const PlayerList = (
    <div>
      {model.players.map((item, index) => {
        return (
          <div className="player" key={index}>
            <div className="player-name">{item.name}</div>
            <div className="player-scored counter">
              <button className="counter-action decrement" onClick={e =>{model.cambiar(e, index, -1)}}>-</button>
              <div className="counter-score">{item.score}</div>
              <button className="counter-action increment" onClick={e=>{model.cambiar(e, index, 1)}}>+</button>
            </div>
          </div>
        );
      })}
    </div>
  );

  const PlayerForm = (
    <div className="add-player-form">
      <form
        onSubmit={e => {
          e.preventDefault();
          model.addPlayer(model.input);
        }}
      >
        <input onChange={e => (model.input = e.target)} type="text" placeholder="Enter a Name" />
        <input type="submit" value="Add Player" />
      </form>
    </div>
  );
  return (
    <div>
      <div className="scoreboard">
        {Header}
        {PlayerList}
        {PlayerForm}
        
      </div>
    </div>
  );
};
let PLAYERS = [];
let model = new Model(PLAYERS);
let counter = 1;

let render = () => {
  console.log("render times: ", counter++);
  ReactDOM.render(
    <PlayerApp title="ScoreBoard" model={model} />,
    document.getElementById("container")
  );
};

model.subscribe(render);

render();
