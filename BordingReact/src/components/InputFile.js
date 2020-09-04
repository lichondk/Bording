import React, { Component } from 'react'
import axios from 'axios';

class InputFile extends Component {
    state = {data:null}

    convertToJson = (txt) => {
      var lines = txt.split("\n")
       var result = []
       var headers = lines[0].split(",")

      for(var i = 1; i<lines.length; i++){ 
        var obj = {};
        var currentlines = lines[i].split(",")

        for(var j = 0; j<headers.length; j++){
          obj[headers[j]] = currentlines[j]
        }
    
        result.push(obj)
      }

      this.setState({data:result})
    }
    
    postData = async() => {
      var data = this.state.data

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
      await fetch('https://localhost:44305/api/products', requestOptions)
    }
    
    showFile = async (event) => {
      event.preventDefault()
      const reader = new FileReader()
      var fileName = ""
      if(event.target.files.length > 0){
        fileName = event.target.files[0].name
      }
        
      reader.onload = async (e) => { 
        const text = (e.target.result)

        if(fileName.match(/^.*\.(csv)$/)){
          await this.convertToJson(text)
          this.postData()
        } else if (fileName.match(/^.*\.(json)$/g)){
          var obj = JSON.parse(text)
          this.setState({data: obj})
          this.postData()
        }
      };

      if(event.target.files.length > 0){
        reader.readAsText(event.target.files[0])
      }
    }

    render() {
      return (
        <input type="file" onChange={(event) => this.showFile(event)} />
      )
    }
}

export default InputFile;