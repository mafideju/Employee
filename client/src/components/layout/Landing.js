import React from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'

const Landing = () => (
  <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
        <Form>
          <Form.Input icon='user' iconPosition='left' label='Usuário' placeholder='Usuário' />
          <Form.Input icon='lock' iconPosition='left' label='Senha' placeholder="Senha" type='password' />

          <Button content='Entrar' inverted color='violet' />
        </Form>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
        <Button inverted color='violet' content='Cadastro' icon='signup' size='big' />
      </Grid.Column>
    </Grid>

    <Divider vertical>Ou</Divider>
  </Segment>
)

export default Landing;