var App = React.createClass({
    render: function () {
        return (
                <div>
                    <NavBar></NavBar>
                    {this.props.children}
                </div>
                );
    }
});

ReactDOM.render(
  <ReactRouter.Router history={ReactRouter.hashHistory}>
    <ReactRouter.Route path="/" component={App}>
      <ReactRouter.IndexRoute component={RealmControl} />
      <ReactRouter.Route path="mounts" component={MountControl} />
    </ReactRouter.Route>
  </ReactRouter.Router>,
  document.getElementById('app')
);
