import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types'

class CrazyButton extends Component{
  constructor(props){
    super(props)
  }
  onClick(){
    this.props.onClick()
  }
  render() {
    return (
      <div>
        <button onClick={()=> this.onClick()}>{this.props.title}</button>
        <p>{this.props.nClick}</p>
      </div>
    );
  }

}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicks: [0,0,0]
    }
  }

  onChildClick(nChild){
    this.setState((st)=> {
      const newClick = [... st.clicks]
      newClick[nChild]+=1
      return{clicks:newClick}
    })
  }

  render() {
    return (
      <div className="App">
        {
          [0,1,2].map((x) => (
            <CrazyButton key={'button'+x} nClick={this.state.clicks[x]} title={'button'+(x+1)} onClick={() => this.onChildClick(x)}/>
          ))
        }
        <p>total : {this.state.clicks.reduce((a, b) => a + b, 0)}</p>
      </div>
    );
  }
}
CrazyButton.propTypes ={
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  nClick: PropTypes.number.isRequired
}
export default App;
