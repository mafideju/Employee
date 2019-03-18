import React, { Component } from 'react';
import { Button, Form, Container, Header, Icon } from 'semantic-ui-react';


class Register extends Component {
  state = {
    email: '',
    password: ''
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
    console.log(user)
  }

  render() {
    return (
      <Container style={{ padding: '2rem 0' }}>
        <Header as='h2' icon textAlign='center'>
          <Icon name='pencil alternate' circular />
          <Header.Content>Entrar</Header.Content>
        </Header>
        <Form onSubmit={this.onSubmitHandler}>

          <Form.Field>
            <label>E-Mail</label>
            <input
              placeholder='Insira o Email de Cadastro'
              name='email'
              value={this.state.email}
              onChange={this.onInputChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Senha</label>
            <input
              placeholder='Mais de 6 Caracteres'
              name='password'
              value={this.state.password}
              onChange={this.onInputChange}
            />
          </Form.Field>

          <Button fluid
            color='violet'
            type='submit'>Mandar Dados
          </Button>
        </Form>
      </Container>
    )
  }
}

export default Register;