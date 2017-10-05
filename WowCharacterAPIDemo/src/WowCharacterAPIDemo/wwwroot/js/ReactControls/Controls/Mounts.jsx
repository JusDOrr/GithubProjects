var MountControl = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
    },
    loadCommentsFromServer: function () {
        var apiPath = getAPIPath(APIType.Mounts);

        var xhr = new XMLHttpRequest();
        xhr.open('get', apiPath, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data.mounts });
        }.bind(this);
        xhr.send();
    },
    render: function () {
        var Well = ReactBootstrap.Well,
            PageHeader = ReactBootstrap.PageHeader;

        var HeaderElement = React.createElement(PageHeader, { className: "pageHeader" }, "Mounts");
        var DescElement = React.createElement("p", { className: "pageDescription" },
                                "This page consumes Blizzard's WOW Mount API. " +
                                "It displays general information about each mount."
                            );

        return (
          <div>
            <Well className="pageWell">
                {HeaderElement}
                {DescElement}
                <TempMountControl data={this.state.data} />
            </Well>
          </div>
      );
    }
});

var TempMountControl = React.createClass({
    getHeader: function () {
        var header = React.createElement("tr", { style: { background: "#d6d6d6" } },
                        React.createElement("th", { style: { width: "55px" } }, ""),
                        React.createElement("th", null, "Name"),
                        React.createElement("th", null, "Creature Id"),
                        React.createElement("th", null, "Aquatic?"),
                        React.createElement("th", null, "Flying?"),
                        React.createElement("th", null, "Ground?"),
                        React.createElement("th", null, "Jumping?"),
                        React.createElement("th", null, "Item Id"),
                        React.createElement("th", null, "Spell")
                     );

        return header;
    },
    getQuality: function (quality) {
        var element = "grey";

        if (quality == 1)
            element = "white";
        else if (quality == 2)
            element = "green";
        else if (quality == 3)
            element = "blue";
        else if (quality == 4)
            element = "purple";
        else if (quality == 5)
            element = "orange";
        else if (quality == 6)
            element = "yellow";
        else if (quality == 7)
            element = "cyan";

        return element;
    },
    render: function () {
        var Table = ReactBootstrap.Table;

        var Header = this.getHeader();
        var Mounts = this.props.data.map(function (mount) {
            var icon = "http://media.blizzard.com/wow/icons/36/" + mount.icon + ".jpg"

            var element = "grey";
            if (mount.qualityId == 1)
                element = "white";
            else if (mount.qualityId == 2)
                element = "green";
            else if (mount.qualityId == 3)
                element = "blue";
            else if (mount.qualityId == 4)
                element = "purple";
            else if (mount.qualityId == 5)
                element = "orange";
            else if (mount.qualityId == 6)
                element = "yellow";
            else if (mount.qualityId == 7)
                element = "cyan";

            return (<tr key={mount.creatureId}>
                        <td style={{ display: "inline-block", width: "55px", padding: "0", border: "solid", borderColor: element }}>
                            <img src={icon} style={{ width: "100%"}}/>
                        </td>
                        <td>{mount.name}</td>
                        <td>{mount.creatureId}</td>
                        <td>{mount.isAquatic.toString()}</td>
                        <td>{mount.isFlying.toString()}</td>
                        <td>{mount.isGround.toString()}</td>
                        <td>{mount.isJumping.toString()}</td>
                        <td>{mount.itemId}</td>
                        <td>{mount.spellId}</td>
                    </tr>);
            });

            return (
            <Table className="centerTable" striped>
                <thead>{Header}</thead>
                <tbody className="mountRowCell">{Mounts}</tbody>
            </Table>
                    );
    }
});
