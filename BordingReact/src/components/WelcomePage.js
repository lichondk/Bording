import React from 'react';

class WelcomePage extends React.Component {
    handleClick = () =>{ 
        this.props.history.push("FileUpload");
      }

  render() {
    return (
    <div style={{padding: "1%"}}>
        <div class="ui message" style={{width: "40pc"}}>
          <div class="header">
           Welcome to Bordiing task load json or csv data
          </div>
          <p>Press the button and get to the upload page</p>
        </div>
        <button class="ui primary button" onClick={this.handleClick} >To upload page</button>
    </div>);
  }
}

export default WelcomePage;
