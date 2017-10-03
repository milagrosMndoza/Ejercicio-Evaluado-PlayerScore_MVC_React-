class Model {
  constructor (PLAYERS) {
    this.players=PLAYERS;
    this.inputValue = null;
    this.callback = null;
  }

  subscribe(render) {
     this.render = render;
  }

  notify() {
     this.callback();
  }  
 addPlayer(name){
   console.log(this.inputValue)
  if(this.inputValue.value!= null || this.inputValue.value !=''){
  this.players.push({
    name: this.inputValue.value,
    score: 0,
    id: Utils.uuid()
 });
 this.inputValue.value='';
 this.notify();
}
 }
 increment(index){
  if(this.PLAYERS[index].score>0){
    this.PLAYERS[index].score++;
    this.notify();
  }
 }
 decrement(index){
  if(this.PLAYERS[index].score>0){
    this.PLAYERS[index].score--;
    this.notify();
  }

 }
}

const PlayerApp = ({title, model}) => {
  
const Header = 
   (
 
  <div className='header'>
  <div className="col-sm-10">
      
        <table className='stats'>
          <tr><td>PLAYERS:</td><td>{model.players.length}</td></tr>
          <tr><td>TOTAL POINTS:</td><td>{model.players.map(x => x.score).reduce((x, y) => x + y)}</td></tr>
        </table>
  </div>
  <div className="col-sm-4.5">
        <div className='stopwatch'>
          <h2>STOPWATCH</h2>
          <h1 className='stopwatch-time'>0</h1>
          <button>start</button><button>reset</button>
        </div>
      </div>
  </div>
  );

const PlayerList =   (
    <div>
    {
      model.players.map((item,index)=>{
            return (
              <div className="player" key={index}>
              <div className="player-name">
              {item.name}
              </div>
              <div className="player-scored counter">
              <div className="counter-action decrement">-</div>
              <div className="counter-score">{item.score}</div>
              <div className="counter-action increment">+</div>
                      
              </div>
              </div>
             
            )       
        })
    }
    </div>);


const PlayerForm =
   (
    <div className="add-player-form">
    <form  onSubmit={e => {
               e.preventDefault();
               model.addPlayer(model.inputValue);
               
            }}>
      
      <input type="text" placeholder="Enter a Name"/>
      <input type="submit" value ="Add Player"/>
    </form>
    </div>
  );
  return (
     <div> 
        <div  className="scoreboard">
           {
            Header             
           }
           {
            PlayerList
           }
           {
            PlayerForm
           }
           
        </div>
     </div>
  );
}
let PLAYERS = [
  {
    name: "Jim Hoskins",
    score: 31,
    id: 1,
  },
   {
    name: "Andree Hoskins",
    score: 35,
    id: 2,
  },
   {
    name: "Alena Hoskins",
    score: 42,
    id: 3,
  },


];
let model = new Model(PLAYERS);
let counter = 1;

let render = () => {
   console.log('render times: ', counter++);
   ReactDOM.render(
      <PlayerApp title="ScoreBoard" model={model} />,
      document.getElementById('container')
   );
};

model.subscribe(render); 

render(); 
