import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileActions'
import Spinner from '../../common/Spinner'
import { Button, Container } from 'semantic-ui-react';

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getCurrentProfile()
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashContent;

    if (profile === null || loading) {
      dashContent = <Spinner />
    } else {
      if (Object.keys(profile).length > 0) {
        dashContent = <h1>Profile Profile Profile</h1>
      } else {
        dashContent = (
          <div>
            <h4>Bem Vindo {user.name}</h4>
            <p>Você precisa criar um Perfil para prosseguir !!!</p>
            <Link to="/create-profile">
              <Button
                color="violet"
                content="Criar Novo Perfil" />
            </Link>
          </div>
        )
      }
    }

    return (
      <Container>
        <h1>DashBoard</h1>
        {dashContent}
      </Container>

    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);