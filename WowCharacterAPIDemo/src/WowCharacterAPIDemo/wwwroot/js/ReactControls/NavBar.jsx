var HeaderNavBar = React.createClass({
    render: function () {
        var LinkContainer = ReactRouterBootstrap.LinkContainer;

        var Navbar = ReactBootstrap.Navbar,
            NavItem = ReactBootstrap.NavItem,
            Nav = ReactBootstrap.Nav;

        return (
                <Navbar className="navbarHeader" inverse>
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

var ArmoryNavBar = React.createClass({
    getInitialState: function () {
        return { selectedKey: 1 };
    },
    getNavClass: function (faction) {
        var className = "alli-navArmory";

        if (faction === "Horde")
            className = "horde-navArmory";

        return className;
    },
    getNavItemClass: function (faction) {
        var className = "alli-nav-item";

        if (faction === "Horde")
            className = "horde-nav-item";

        return className;
    },
    onSelect: function (e) {
        this.setState({ selectedKey: e });
        this.props.selectCallback(e);
    },
    render: function () {
        var NavItem = ReactBootstrap.NavItem,
            Nav = ReactBootstrap.Nav;

        var navClass = this.getNavClass(this.props.faction);
        var navItem = this.getNavItemClass(this.props.faction);
        
        return (
                <Nav className={navClass} bsStyle="pills" activeKey={this.state.selectedKey} onSelect={this.onSelect}>
                    <NavItem className={navItem} style={{marginLeft: "55px"}} eventKey={1}>CHARACTER</NavItem>
                    <NavItem className={navItem} eventKey={2}>ACHIEVEMENTS</NavItem>
                    <NavItem className={navItem} eventKey={3}>COLLECTIONS</NavItem>
                    <NavItem className={navItem} eventKey={4}>RAID PROGRESSION</NavItem>
                    <NavItem className={navItem} eventKey={5}>PVP</NavItem>
                    <NavItem className={navItem} eventKey={6}>REPUTATION</NavItem>
                </Nav>
                );
    }
});
