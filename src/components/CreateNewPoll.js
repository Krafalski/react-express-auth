/* global fetch */

import React, { Component } from 'react'
const baseURL = 'http://localhost:3001'

class CreateNewPoll extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pollName: this.refs.pollName,
      questions: this.refs.questions
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  handleFormSubmit (event) {
    event.preventDefault()
    this.setState({
      pollName: this.refs.pollName.value,
      questions: this.refs.questions.value
    }, () => {
      const input = Object.assign({}, this.state)
      fetch(baseURL + '/polls', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(response => { console.log('success!!!', response) }, error => console.log(error))
        .catch(error => console.log(error))
    })
  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type='text' name='pollName' ref='pollName' placeholder='Poll Name' />
          <input type='text' name='questions' ref='questions' placeholder='option' />
          <input type='submit' />
        </form>
        <div>
          <h3> Values </h3>
          {this.state.pollName}
          {this.state.questions}
        </div>
      </div>
    )
  }
}

export default CreateNewPoll
