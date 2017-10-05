var NavBar = React.createClass({
    render: function () {
        var LinkContainer = ReactRouterBootstrap.LinkContainer;

        var Navbar = ReactBootstrap.Navbar,
            NavItem = ReactBootstrap.NavItem,
            NavDropdown = ReactBootstrap.NavDropdown,
            MenuItem = ReactBootstrap.MenuItem,
            Nav = ReactBootstrap.Nav;

        return (
                <Navbar className="navbar" inverse>
                    <Navbar.Header>
                      <Navbar.Brand>
                        <ReactRouter.Link to="/">Realm Status</ReactRouter.Link>
                      </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                      <LinkContainer to="/characters">
                        <NavItem eventKey={1}>Character</NavItem>
                      </LinkContainer>
                      <LinkContainer to="/mounts">
                        <NavItem eventKey={2}>Mounts</NavItem>
                      </LinkContainer>
                    </Nav>
                </Navbar>
                );
    }
});
