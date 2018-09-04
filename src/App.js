/* global fetch */
import React, { Component } from 'react'
import CreateUser from './components/CreateUser'
import LoginUser from './components/LoginUser'
import CreateNewPoll from './components/CreateNewPoll'
const baseURL = 'http://localhost:3001'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentUser: '',
      loggedIn: false
    }
    this.logOut = this.logOut.bind(this)
    this.successfulLogin = this.successfulLogin.bind(this)
  }

  componentDidMount () {
    fetch(baseURL + '/sessions')
      .then(response => response.json())
      .then(response => {
        if (response.login) {
          console.log(response)
          this.successfulLogin(response)
        }
      }, error => console.log('failed promise', error))
      .catch(error => console.log('in the catch', error))
  }
  logOut () {
    fetch(baseURL + '/sessions', {
      method: 'DELETE'
    })
      .then(response => {
        this.setState({
          loggedIn: false
        })
      })
      .catch(error => console.log(error))
  }
  successfulLogin (response) {
    console.log(response)
    this.setState({
      loggedIn: true,
      currentUser: response.user
    })
  }
  render () {
    return (
      <div className='container'>
        {/* <CreateUser /> */ }
        <hr />
        {this.state.loggedIn
          ? <div>
            Welcome { this.state.currentUser} <br />
            <button className='button is-danger' onClick={this.logOut}> Log out </button>
          </div>
          : <LoginUser successfulLogin={this.successfulLogin} loggedIn={this.state.loggedIn} />
        }
        <CreateNewPoll />
      </div>
    )
  }
}

export default App
