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
        {/*  <CreateUser /> */}
        <hr />
        {this.state.loggedIn
          ? <div>
            Welcome { this.state.currentUser} <br />
            <button className='button is-danger' onClick={this.logOut}> Log out </button>
          </div>
          : <LoginUser successfulLogin={this.successfulLogin} loggedIn={this.state.loggedIn} />
        }
      </div>
    )
  }
}

export default App
