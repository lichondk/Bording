import React, { Component } from 'react';
import {
    HubConnectionBuilder,
    HubConnectionState,
    HubConnection,
  } from '@microsoft/signalr';

class Table extends Component {
    state = {products: [], flags:{"id": true, "name": true, "quantity": true, "startNumber": true, "endNumber": true, "rowNumber": true}}

    componentDidMount = async () => {
      const connection = new HubConnectionBuilder()
      .withUrl('https://localhost:44305/chatHub')
      .withAutomaticReconnect()
      .build();
        
      connection.on("ReceiveProduct", (product) => {
        var arry = []
        arry.push(product)
        
        this.setState({ 
          products: this.state.products.concat(arry)
        })
      });
  
      try {
        await connection.start();
      } catch (err) {
        console.log(err);
      }
    }

    componentWillReceiveProps(products) {
        console.log(products)
        var result = Object.entries(products);
        this.setState({products: result[0][1]})
      }

    renderProducts = () => {

        var products = this.state.products

        if(products.length > 0){
    
          return products.map((p, index) => {
            return (
              <tr key={index}>
                <td data-label="id">{p.id}</td>
                <td data-label="Name">{p.name}</td>
                <td data-label="quantity">{p.quantity}</td>
                <td data-label="startNumber">{p.startNumber}</td>
                <td data-label="endNumber">{p.endNumber}</td>
                <td data-label="rowNumber">{p.rowNumber}</td>
              </tr>
            )
          })
        }
    }
     
    sortBy(key) {
      var arrayCopy = [...this.state.products];
      var tempFlags = this.state.flags

      tempFlags[key] = !tempFlags[key]
      this.setState({flags: tempFlags})

      if(tempFlags[key]){
        arrayCopy.sort((a,b) => a[key] > b[key] ? -1 : 1)
      }else {
        arrayCopy.sort((a,b) => a[key] > b[key] ? 1 : -1)
      }

      this.setState({products: arrayCopy});
    }

    render() {
        return (
            <table className="ui sortable celled table">
            <thead>
                <tr>
                    <th onClick={() => this.sortBy("id")}>Id</th>
                    <th onClick={() => this.sortBy("name")}>Name</th>
                    <th onClick={() => this.sortBy("quantity")}>Quantity</th>
                    <th onClick={() => this.sortBy("startNumber")}>StartNumber</th>
                    <th onClick={() => this.sortBy("endNumber")}>EndNumber</th>
                    <th onClick={() => this.sortBy("rowNumber")}>RowNumber</th>
                </tr>
            </thead>
            <tbody>
                {this.renderProducts()}
            </tbody>
            </table>
        )
    }
}

export default Table;