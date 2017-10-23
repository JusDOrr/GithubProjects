var App = React.createClass({
    getFooter: function () {
        var Well = ReactBootstrap.Well;
        var footer = React.createElement(Well, { style: { margin: 0, backgroundColor: "#222", borderColor: "#080808" } },
                        React.createElement("div", { style: { color: "#9d9d9d" } }, "Website: Copyright (c) 2017 Justin Orr -||- Artwork: All property of Blizzard")
                     );

        return footer;
    },
    render: function () {
        var footer = this.getFooter();

        return (
                <div>
                    <NavBar></NavBar>
                    {this.props.children}
                    {footer}
                </div>
                );
    }
});

ReactDOM.render(
  <ReactRouter.Router history={ReactRouter.hashHistory}>
    <ReactRouter.Route path="/" component={App}>
      <ReactRouter.IndexRoute component={RealmStatusControl} />
      <ReactRouter.Route path="mounts" component={MountControl} />
      <ReactRouter.Route path="characters" component={CharacterControl} />
    </ReactRouter.Route>
  </ReactRouter.Router>,
  document.getElementById('app')
);
