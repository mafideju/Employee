import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Button,
} from 'semantic-ui-react';
// import GoogleAuth from '../../Auth/GoogleAuth';
import './NavBar.css';


const getWidth = () => {
  const isSSR = typeof window === 'undefined'
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class DesktopContainer extends Component {
  state = {
    activeItem: null,
    fixed: null
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { fixed } = this.state
    return (
      <Responsive
        getWidth={getWidth}
        minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}>
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
                  name='new'
                  onClick={this.handleItemClick}
                  active={this.state.activeItem === 'new'}>
                  <Link to="/">
                    Menu One
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
              </Menu.Item>

            </Menu>
          </Segment>
        </Visibility>
      </Responsive>
    )
  }
}


class MobileContainer extends Component {
  state = {
    sidebarOpened: null
  }

  handleSidebarHide = () => {
    return this.setState({ sidebarOpened: false })
  }

  handleToggle = () => {
    return this.setState({ sidebarOpened: true })
  }

  render() {
    const { sidebarOpened } = this.state
    return (
      <Responsive as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}>

          <Menu.Item as='a' active>
            Home
          </Menu.Item>
          <Menu.Item as='a' active>
            <Link to="/streams/new">
              New Stream
            </Link>
          </Menu.Item>
          <Menu.Item as='a'>
            <Link to="/streams/edit">
              Edit
            </Link>
          </Menu.Item>
          <Menu.Item as='a'>
            <Link to="/streams/delete" >
              Delete
            </Link>
          </Menu.Item>

          <Menu.Item>
            {/* <GoogleAuth /> */}
          </Menu.Item>

        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment inverted vertical
            textAlign='center'
            style={{ minHeight: '350px', padding: '1em 0em' }}>
            <Container>
              <Menu inverted pointing
                secondary size='massive'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

const NavBar = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)
export default NavBar;