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
                      <LinkContainer to="/armory">
                        <NavItem eventKey={1}>Armory</NavItem>
                      </LinkContainer>
                    </Nav>
                </Navbar>
                );
    }
});

// Currently, this page feels unnecessary...
// Might reapproach when armory is complete...

//<LinkContainer to="/mounts">
//  <NavItem eventKey={2}>Mounts</NavItem>
//</LinkContainer>
