var RealmControl = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
    },
    loadCommentsFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', "https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=83pjrytmmwp4zv96jbe4ht8j6xtbdfw2", true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data.realms });
        }.bind(this);
        xhr.send();
    },
    render: function () {
        return (
          <div>
              <RealmStatusControl data={this.state.data} />
          </div>
      );
    }
});

var RealmStatusControl = React.createClass({
    render: function () {
        var realms = this.props.data.map(function (realm) {
            return (<Realm key={realm.slug} data={realm}/>);
        });

        return (<div>{realms}</div>);
    }
});

var Realm = React.createClass({
    render: function () {
        var realm = this.props.data;
        return (<div>
                    <div>{realm.battlegroup}</div>
                    <div>{realm.name}</div>
                    <div>{realm.population}</div>
                    <div>{realm.queue}</div>
                    <div>{realm.status}</div>
                    <div>{realm.timezone}</div>
                    <div>{realm.type}</div>
                </div>);
    }
});

ReactDOM.render(
  <RealmControl />,
  document.getElementById('content')
);