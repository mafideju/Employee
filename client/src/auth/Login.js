import React, { Component } from 'react';
import {
  Button,
  Form,
  Container,
  Header,
  Icon
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import history from '../history';
import './auth.css';
import InputField from '../common/InputField';


class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      history.push('/dashboard')
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      history.push('/dashboard')
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmitHandler = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(user)
    // console.log(user)
  }

  render() {
    const { errors } = this.state;

    return (
      <Container style={{ padding: '2rem 0' }}>

        <Header as='h2' icon textAlign='center'>
          <Icon name='pencil alternate' circular />
          <Header.Content>Entrar</Header.Content>
        </Header>

        <Form onSubmit={this.onSubmitHandler}>

          <InputField
            className={`${errors.email ? 'redAlert' : ''}`}
            placeholder="E-Mail"
            name="email"
            type='email'
            value={this.state.email}
            onChange={this.onInputChange}
            error={errors.email}
          />

          <InputField
            className={`${errors.email ? 'redAlert' : ''}`}
            placeholder="Senha"
            name="password"
            type='password'
            value={this.state.password}
            onChange={this.onInputChange}
            error={errors.password}
          />

          <Button fluid inverted
            color='violet'
            type='submit'>Mandar Dados
          </Button>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  }
}

export default connect(mapStateToProps, { loginUser })(Login);