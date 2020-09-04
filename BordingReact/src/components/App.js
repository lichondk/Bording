import React from 'react';
import axios from 'axios';
import Table from './Table';
import InputFile from './InputFile';

class App extends React.Component {
  state = {products: []}

  onSubmit = async() => {
    const response = await axios.get("https://localhost:44305/api/products")
    this.setState({products: response.data})
  }

  deleteProducts = async() => {
    const response = await axios.delete("https://localhost:44305/api/products")
    this.setState({products: []})
  }

  render() {
    return (
      <div style={{padding: "2%"}}>
        <button className="ui primary button" onClick={this.onSubmit}>Get all products</button>
        <button className="ui red button" onClick={this.deleteProducts}>Delete all products</button>
        <InputFile/>
        <Table products={this.state.products}/>
      </div>
    );
  }
}

export default App;
