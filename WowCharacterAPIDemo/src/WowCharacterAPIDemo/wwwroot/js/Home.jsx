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
            return (<div key={realm.slug} ><Realm data={realm}/><br/></div>);
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
                    <div>{realm.queue.toString()}</div>
                    <div>{realm.status.toString()}</div>
                    <div>{realm.timezone}</div>
                    <div>{realm.type}</div>
                </div>);
    }
});

ReactDOM.render(
  <RealmControl />,
  document.getElementById('content')
);

//http://media.blizzard.com/wow/icons/{size}/{icon_name}.jpg Icon hosting location