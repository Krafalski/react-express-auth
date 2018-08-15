/* global fetch */
import React, { Component } from 'react'
import CreateUser from './components/CreateUser'
import LoginUser from './components/LoginUser'
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
  successfulLogin () {
    this.setState({
      loggedIn: true
    })
  }
  render () {
    return (
      <div className='container'>
        <h2> Create a User </h2>
        <CreateUser />
        <hr />
        <h2> Log in a User </h2>
        {this.state.loggedIn
          ? <div>
            <button className='button is-danger' onClick={this.logOut}> Log out </button>
          </div>
          : <LoginUser successfulLogin={this.successfulLogin} />
        }
      </div>
    )
  }
}

export default App
