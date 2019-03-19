import React, { Component } from 'react';
// import axios from 'axios';
import { Button, Form, Container, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { registerUser } from '../actions';
import './Register.css';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmitHandler = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    this.props.registerUser(newUser)
    // axios
    //   .post('/api/users/cadastro', newUser)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({
    //     errors: err.response.data
    //   }))
  }

  render() {
    const { errors } = this.state;
    // const { user } = this.props.auth;

    return (
      <Container style={{ padding: '2rem 0' }}>
        <Header as='h2' icon textAlign='center'>
          <Icon name='pencil alternate' circular />
          <Header.Content>Cadastro</Header.Content>
        </Header>

        <Form onSubmit={this.onSubmitHandler}>
          <Form.Field>
            <div className={`${errors.name ? 'redAlert' : ''}`}>
              <label>Nome Completo</label>
              <input
                placeholder='Nome Sem Abreviações'
                name='name'
                value={this.state.name}
                onChange={this.onInputChange}
              />
              {errors.name ? errors.name : ''}
            </div>
          </Form.Field>

          <Form.Field>
            <div className={`${errors.email ? 'redAlert' : ''}`}>
              <label>Endereço Eletrônico</label>
              <input
                // type='email'
                placeholder='E-Mail'
                name='email'
                value={this.state.email}
                onChange={this.onInputChange}
              />
              {errors.email ? errors.email : ''}
            </div>
            <small>Registre-se com o mesmo Email do Gravatar e associe os avatares !!!</small>
          </Form.Field>

          <Form.Field>
            <div className={`${errors.password ? 'redAlert' : ''}`}>
              <label>Senha</label>
              <input
                type='password'
                placeholder='Mais de 6 Caracteres'
                name='password'
                value={this.state.password}
                onChange={this.onInputChange}
              />
              {errors.password ? errors.password : ''}
            </div>
          </Form.Field>

          <Form.Field>
            <div className={`${errors.password2 ? 'redAlert' : ''}`}>
              <label>Confirmação</label>
              <input
                type='password'
                placeholder='Confirme a Senha Acima'
                name='password2'
                value={this.state.password2}
                onChange={this.onInputChange}
              />
              {errors.password2 ? errors.password2 : ''}
            </div>
          </Form.Field>

          <Button inverted fluid
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
    auth: state.auth
  }
}

export default connect(mapStateToProps, { registerUser })(Register);