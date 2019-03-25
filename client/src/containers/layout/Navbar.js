import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {
  // Container,
  // Icon,
  Menu,
  Responsive,
  Segment,
  // Sidebar,
  Visibility,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import { clearCurrentProfile } from '../../actions/profileActions';
import './NavBar.css';
import history from '../../history';


const getWidth = () => {
  const isSSR = typeof window === 'undefined'
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class NavBar extends Component {
  state = {
    activeItem: null,
    fixed: null
  }

  handleItemClick = (e, { name }) => {
    return this.setState({ activeItem: name })
  }

  hideFixedMenu = () => {
    return this.setState({ fixed: false })
  }
  showFixedMenu = () => {
    return this.setState({ fixed: true })
  }

  onLogoutHandle = () => {
    this.props.logoutUser();
    this.props.clearCurrentProfile();
    history.push('/')
  }

  render() {
    const { fixed } = this.state;
    // console.log('NAVBAR PROPS', this.props)
    const { isAuthenticated, user } = this.props.auth;

    return (
      <Responsive
        getWidth={getWidth}
        minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            vertical>
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
              className="navbar--menu">
              <Menu.Item
                as="div"
                onClick={this.handleItemClick}
                active={this.state.activeItem === !this.state.activeItem}
                className="navbar--logo"
                position='left'>
                <Link to="/">EMPLOYEE</Link>
              </Menu.Item>

              <div className="navbar">
                <Menu.Item
                  as="div"
                  name='dash'
                  onClick={this.handleItemClick}
                  active={this.state.activeItem === 'dash'}>
                  <Link to="/dashboard">
                    Dashboard
                  </Link>
                </Menu.Item>

                <Menu.Item
                  as="div"
                  name='menu'
                  onClick={this.handleItemClick}
                  active={this.state.activeItem === 'menu'}>
                  <Link to="/">
                    Menu Two
                  </Link>
                </Menu.Item>

                <Menu.Item
                  as="div"
                  name='grid'
                  onClick={this.handleItemClick}
                  active={this.state.activeItem === 'grid'}>
                  <Link to="/" >
                    Menu Three
                  </Link>
                </Menu.Item>
              </div>

              <Menu.Item
                className="navbar--button"
                position='right'>

                {!isAuthenticated ?
                  <React.Fragment>
                    <Link to='/cadastro'>
                      <Button inverted basic
                        color='violet'
                        content='Cadastro'
                      />
                    </Link>
                    <Link to='/login'>
                      <Button inverted basic
                        color='violet'
                        content='Entrar'
                      />
                    </Link>
                  </React.Fragment> :

                  <div className='navbar--button__logout'>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="avatar"
                      title="Conecte-se com a conta do Gravatar para ver sua carinha aqui =)" />
                    <Button inverted basic
                      onClick={this.onLogoutHandle}
                      color="violet"
                      content="Sair" />
                  </div>}


              </Menu.Item>


            </Menu>
          </Segment>
        </Visibility>
      </Responsive>
    )
  }
}


// class MobileContainer extends Component {
//   state = {
//     sidebarOpened: null
//   }

//   handleSidebarHide = () => {
//     return this.setState({ sidebarOpened: false })
//   }

//   handleToggle = () => {
//     return this.setState({ sidebarOpened: true })
//   }

//   render() {
//     const { sidebarOpened } = this.state
//     return (
//       <Responsive as={Sidebar.Pushable}
//         getWidth={getWidth}
//         maxWidth={Responsive.onlyMobile.maxWidth}>
//         <Sidebar as={Menu}
//           animation='push'
//           inverted
//           onHide={this.handleSidebarHide}
//           vertical
//           visible={sidebarOpened}>

//           <Menu.Item as='a' active>
//             Home
//           </Menu.Item>
//           <Menu.Item as='a' active>
//             <Link to="/streams/new">
//               New Stream
//             </Link>
//           </Menu.Item>
//           <Menu.Item as='a'>
//             <Link to="/streams/edit">
//               Edit
//             </Link>
//           </Menu.Item>
//           <Menu.Item as='a'>
//             <Link to="/streams/delete" >
//               Delete
//             </Link>
//           </Menu.Item>

//           <Menu.Item>
//             {/* <GoogleAuth /> */}
//           </Menu.Item>

//         </Sidebar>

//         <Sidebar.Pusher dimmed={sidebarOpened}>
//           <Segment inverted vertical
//             textAlign='center'
//             style={{ minHeight: '350px', padding: '1em 0em' }}>
//             <Container>
//               <Menu inverted pointing
//                 secondary size='massive'>
//                 <Menu.Item onClick={this.handleToggle}>
//                   <Icon name='sidebar' />
//                 </Menu.Item>
//               </Menu>
//             </Container>
//           </Segment>
//         </Sidebar.Pusher>
//       </Responsive>
//     )
//   }
// }

// const NavBar = ({ children }) => (
//   <div>
//     <DesktopContainer>{children}</DesktopContainer>
//     <MobileContainer>{children}</MobileContainer>
//   </div>
// )

const mapStateToProps = state => {
  // console.log('STATE NAVBAR', state)
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {
  logoutUser,
  clearCurrentProfile
})(NavBar);