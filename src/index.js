import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Web3 from 'web3';
import TodoListContract from './build/contracts/TodoList.json';
import SproutContract from './build/contracts/Sprout.json';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      contract2: null
    }
    this.handleClick = this.handleClick.bind(this);
  }//end constructor
  componentDidMount = async() =>  {
    try {
      const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      const deployNetwork = TodoListContract.networks[networkId];
      const instance = new web3.eth.Contract(
        TodoListContract.abi,
        deployNetwork.address
      )

      const deployNetwork2 = SproutContract.networks[networkId];
      const instance2 = new web3.eth.Contract(
        SproutContract.abi,
        deployNetwork2.address
      )
      this.setState({
        web3: web3,
        accounts: accounts,
        contract: instance,
        contract2: instance2
      });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };//end componetdidmount
  async handleClick(){
    //var res = await this.state.contract.methods.SayHello().call({from: this.state.accounts[0]});
    //console.log(res)
    var res2 = await this.state.contract2.methods.Register(this.state.accounts[0]).send({from: this.state.accounts[0]});
    console.log(res2)
  }
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return(
      <div>
        <div>Hi</div>
        <button onClick={this.handleClick}>Click here</button>
      </div>
    )
  }
} 

ReactDOM.render(<App/>, document.getElementById('root'));
