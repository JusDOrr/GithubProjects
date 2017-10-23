var CharacterControl = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadCharacterFromServer();
    },
    loadCharacterFromServer: function () {
        var apiPath = getAPIPath(APIType.Characters);

        var xhr = new XMLHttpRequest();
        xhr.open('get', apiPath, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    },
    render: function () {
        var Well = ReactBootstrap.Well,
            PageHeader = ReactBootstrap.PageHeader;

        var HeaderElement = React.createElement(PageHeader, { className: "pageHeader" }, "Characters");
        var DescElement = React.createElement("p", { className: "pageDescription" },
                                "This page consumes Blizzard's WOW Character API. " +
                                "It displays general information about each character."
                            );

        return (
          <div>
            <Well className="pageWell">
                {HeaderElement}
                {DescElement}
                <CharacterLayout data={this.state.data} />
            </Well>
          </div>
      );
    }
});

var CharacterLayout = React.createClass({
    render: function () {
        var char = this.props.data;
        
        // Unused Variables
        var calcClass = char.calcClass;
        var achievePoints = char.achievementPoints;
        var lastModified = char.lastModified;
        var totalHKills = char.totalHonorableKills;

        var avatar = getAvatar(char.race, char.gender, char.thumbnail);

        return (
                <div>
                    <div style={{backgroundImage: "url(" + avatar + ")", backgroundSize:"contains", backgroundRepeat:"no-repeat", height:"550px", width:"740px", margin:"auto"}}> 
                        <div style={{display: "inline-block"}}>
                            <NamePlate data={char} />
                            <Gear data={char.items} />
                        </div>
                    </div>
                    <Stats data={char.stats} />
                    <Talents data={char.talents} />
                </div>
                );
    }
});

var NamePlate = React.createClass({
    render: function () {
        var char = this.props.data;

        // Unused Variable
        var bgroup = char.battlegroup;

        var raceInfo = getRaceInfo(char.race);
        var classInfo = getClassInfo(char.class);
        var factionColor = getFactionColor(raceInfo.faction);

        var logo = getLogo(raceInfo.faction);

        return (
                <div style={{ marginLeft: "5px" }}>
                    <div style={{ backgroundImage: "url(" + logo + ")", float: "left", width: "77.5px", height: "100px", backgroundSize: "100%"}} />
                    <div style={{ float: "left", marginLeft: "10px", marginTop: "5px" }}>
                        <div style={{ fontSize: "48px", color: "white", height: "50px" }}>{char.name}</div>
                        <div style={{ color: classInfo.color }}>
                            <div style={{ float: "left", marginLeft: "5px"}}>{char.level}</div>
                            <div style={{ float: "left", marginLeft: "5px" } }>{raceInfo.race}</div>
                            <div style={{ float: "left", marginLeft: "5px" } }>{classInfo.name}</div>
                            <div style={{ float: "left", marginLeft: "5px", color: factionColor } }>{char.realm}</div>
                        </div>
                    </div>
                </div>
                );
    }
});
