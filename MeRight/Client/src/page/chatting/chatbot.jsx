import React, { Component } from 'react';
import axios from 'axios';

class ChatBot_axios extends Component {    

    constructor(props) {
    super(props);
    const { steps } = this.props;
    const { question } = steps;

    this.state =  { question }; 
  }


  componentDidMount() {
    const userQuestion = {
        question : this.state.question.value,
    };

    axios.get('/chat', {params : { 'user_Q' : userQuestion}})
    .then(res => {
        var answer = res.data.user_A
        alert(answer)

    })
  }

  render() {
    return (
        <div> {this.answer} </div>
        );
    }
  };


  export default ChatBot_axios;