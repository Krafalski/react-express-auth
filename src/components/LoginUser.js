/* global fetch */

import React, { Component } from 'react'
const baseURL = 'http://localhost:3001'

class LoginUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  handleFormSubmit (event) {
    event.preventDefault()
    this.setState({
      username: this.refs.username.value,
      password: this.refs.password.value
    }, () => {
      const input = Object.assign({}, this.state)
      fetch(baseURL + '/sessions', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(response => {
          if (response.login) {
            this.props.successfulLogin()
          }
        }, error => console.log(error))
        .catch(error => console.log(error))
    })
  }
  render () {
    return (
      <div className='container'>
        <form onSubmit={this.handleFormSubmit}>
          <div className='field'>
            <label className='label'>Name</label>
            <div className='control'>
              <input
                className='input'
                type='text'
                ref='username'
                placeholder='Your Name'
              />
              <span className='icon is-small is-right'><i className='fas fa-user' /></span>
            </div>
          </div>
          <div className='field'>
            <label className='label'>Password</label>
            <div className='control'>
              <input
                className='input'
                type='password'
                ref='password'
                placeholder='Password'
              />
              <span className='icon is-small is-right'><i className='fas fa-user' /></span>
            </div>
          </div>
          <div className='control'>
            <button className='button is-link'>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}
export default LoginUser
