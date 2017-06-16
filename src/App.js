import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types'
import axios from 'axios'
import { BrowserRouter, Route, Link }  from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class CrazyButton extends Component{
  constructor(props){
    super(props)
  }
  onClick(){
    this.props.onClick()
  }
  render() {
    const style = {
      margin: 12,
    };
    return (
      <div>
        <RaisedButton label={this.props.title} primary={true} style={style} onClick={()=> this.onClick()}/>
        {/* <button onClick={()=> this.onClick()}>{this.props.title}</button> */}
        <p>{this.props.nClick}</p>
      </div>
    );
  }

}
CrazyButton.propTypes ={
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  nClick: PropTypes.number.isRequired
}
class CurrencyConverter extends Component{
  render(){
    const amount = this.props.amount
    const rate = this.props.rate
    if(rate === null){
      return(<div>
        <p>Loading</p>
      </div>)
    }
    else{
      return(
        <div>
          <TextField
            id="text-field-input"
            type='text'
            defaultValue={amount}
            onChange={(e) => this.props.onAmountChange(e.target.value)}
          />
          {/* <input
            type='text'
            value={amount}
            onChange={(e) => this.props.onAmountChange(e.target.value)}
          /> */}
          <p>THB: {amount*rate.THB}</p>
          <p>EURO: {amount*rate.EUR}</p>
        </div>
      )
    }

  }
}
CurrencyConverter.propTypes ={
  rate: PropTypes.object.isRequired,
  amount: PropTypes.number.isRequired,
  onAmountChange: PropTypes.func.isRequired
}
class SuperClick extends Component{
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
      <div>
      {
        [0,1,2].map((x) => (
          <CrazyButton key={'button'+x} nClick={this.state.clicks[x]} title={'button'+(x+1)} onClick={() => this.onChildClick(x)}/>
        ))
      }
      <p>total : {this.state.clicks.reduce((a, b) => a + b, 0)}</p>
      </div>
    )
  }

}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ratesData: null,
      amount: 0
    }
  }
  componentDidMount(){
    this.loadRates()
  }
  loadRates(){
    axios.get('http://api.fixer.io/latest?base=USD')
    .then((response) => {
      console.log(response);
      this.setState({ratesData: response.data.rates})
    })
    .catch((error) => {
      console.log(error);
    });
  }
  onAmountChange(amount){
    this.setState({amount:amount})
  }

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <div>
            <div style={{}}>
              <NavLink to="/converter">converter</NavLink>
              <NavLink to="/superclick">superclick</NavLink>
            </div>
            <Route path='/converter' render={() =>
              (
                <CurrencyConverter
                  rate={this.state.ratesData}
                  amount={this.state.amount}
                  onAmountChange = {(newAmount)=>this.onAmountChange(newAmount)}
                />
              )}/>


            <Route path='/superclick' render={() =>(
              <SuperClick/>
            )}/>
        </div>

      </div>
      </BrowserRouter>
    );
  }
}

export default App;
