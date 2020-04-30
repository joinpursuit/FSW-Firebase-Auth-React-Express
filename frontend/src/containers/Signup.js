import React from 'react';
import firebase from '../firebase';

export default class Signup extends React.Component {

  state = {
    email: '',
    password: '',
    error: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('Returns: ', response);
      })
      .catch(err => {
        const { message } = err;
        this.setState({ error: message });
      })
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // if user object exists, user is logged in
      if (user) {
        // redirect to homepage once logged in
        this.props.history.push('/')
      }
      else {
        // user is not logged in yet, do nothing
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { email, password, error } = this.state;
    const displayError = error === '' ? '' : <div className="alert alert-danger" role="alert">{error}</div>

    return (
      <>
        <h1>Sign Up</h1>
        {displayError}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" value={password} name="password" onChange={this.handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </>
    )
  }
}

