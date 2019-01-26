import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username : '',
      password : '',
      message : ''
    }
  }

  _handleChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }

  _handleSubmit = (e) => {
    const { username, password } = this.state
    axios.post('http://localhost:5000/users/login', { username, password })
    .then(res => {
      // console.log(res.data.data.token)
      const token = res.data.data.token
      localStorage.setItem('token', token)
      this.props.history.push('/')
    })
    .catch(err => {
      this.setState({ message : 'Pastikan Username dan Password Anda Benar !!!'})
      // console.log(err)
    })

    e.preventDefault();
  } 

  render() {
    return (
      <div>
        <h1>Login</h1>
        {
          this.state.message !== '' && (
            <div className="alert alert-danger" role="alert">
              { this.state.message }
            </div>
          )
        }
        <form onSubmit = { this._handleSubmit }>
          <div className = "form-group">
            <label>Username</label>
            <input
              className = "form-control"
              name = "username"
              value = { this.state.username }
              onChange = { this._handleChange }
            />
          </div>
          <div className = "form-group">
            <label>Password</label>
            <input
              type = "password"
              className = "form-control"
              name = "password"
              value = { this.state.password }
              onChange = { this._handleChange }
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary">SUBMIT
          </button>
        </form>
      </div>
    )
  }
}

export default Login;