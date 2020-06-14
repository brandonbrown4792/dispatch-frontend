import React from 'react';
import { FormControl, TextField, Button } from '@material-ui/core'

class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  login = e => {
    e.preventDefault();

    const userObj = {
      user: {
        email: this.state.email,
        password: this.state.password
      }
    }

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObj)
    }

    fetch('http://localhost:3000/api/v1/login', fetchObj)
      .then(res => res.json())
      .then(loginData => {
        if (loginData.token) {
          localStorage.setItem('auth_token', loginData.token);
        }
        else
          alert(loginData.message);
      })
    // .catch(() => alert('Something went wrong'))

    e.target.reset();
  }

  render() {
    return (
      <form onSubmit={(e) => this.login(e)}>
        <FormControl>
          <TextField name="email" label="Email" onChange={e => this.handleChange(e)} />
          <TextField name="password" type="password" label="Password" onChange={e => this.handleChange(e)} />
          <Button type="submit">Submit</Button>
        </FormControl>
      </form>
    )
  }
}

export default LoginForm;