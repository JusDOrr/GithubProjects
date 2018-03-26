var App = React.createClass({
    render: function () {
        return (
                <div>
                    <HeaderNavBar />
                    {this.props.children}
                    <Footer />
                </div>
                );
    }
});

var Footer = React.createClass({
    render: function () {
        var Well = ReactBootstrap.Well;

        return React.createElement(Well, { className: "footer" },
                        React.createElement("div", { className: "footer-copyright" },
                            "Website: Copyright (c) 2017 Justin Orr -||- Artwork: All property of Blizzard")
                     );
    }
});

ReactDOM.render(
  <ReactRouter.Router history={ReactRouter.hashHistory}>
    <ReactRouter.Route path="/" component={App}>
      <ReactRouter.IndexRoute component={RealmStatusControl} />
      <ReactRouter.Route path="armory" component={ArmoryControl} />
      <ReactRouter.Route path="mounts" component={MountControl} />
    </ReactRouter.Route>
  </ReactRouter.Router>,
  document.getElementById('app')
);
