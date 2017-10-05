var CharacterControl = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
    },
    loadCommentsFromServer: function () {
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
                <CharacterGearControl data={this.state.data} />
            </Well>
          </div>
      );
    }
});

var CharacterGearControl = React.createClass({
    render: function () {
        var char = this.props.data;

        // Unused Variables
        var calcClass = char.calcClass;
        var achievePoints = char.achievementPoints;
        var lastModified = char.lastModified;
        var totalHKills = char.totalHonorableKills;

        // avatar - character icon / profilemain - character render
        var fallback = "?alt=/wow/static/images/2d/profilemain/race/" + char.race + "-" + char.gender + ".jpg";
        var thumbnail = (char.thumbnail + "").replace("avatar.jpg", "profilemain.jpg");
        var avatar = "http://render-api-us.worldofwarcraft.com/static-render/us/" + thumbnail + fallback;

        return (
                <div>
                    <div style={{backgroundImage: "url(" + avatar + ")", backgroundSize:"contains", backgroundRepeat:"no-repeat", height:"550px", width:"740px", margin:"auto"}}> 
                        <CharacterNamePlateControl data={char} />                 
                    </div>
                    <CharacterStatsControl datat={char.stats} />
                    <CharacterTalentsControl data={char.talents} />
                </div>
                );
    }
});

var CharacterNamePlateControl = React.createClass({
    getFactionColor: function (faction) {
        var element = "darkgrey";

        if (faction == "Alliance")
            element = "darkblue";
        else if (faction == "Horde")
            element = "darkred";

        return element;
    },
    render: function () {
        var char = this.props.data;

        // Unused Variable
        var bgroup = char.battlegroup;

        var raceInfo = getRaceInfo(char.race);
        var classInfo = getClassInfo(char.class);
        var factionColor = this.getFactionColor(raceInfo.faction);

        return (
                <div style={{ marginLeft: "5px" }}>
                    <div style={{ fontSize: "48px", color: "white", height: "50px" }}>{char.name}</div>  
                    <div style={{ color: classInfo.color }}>
                        <div style={{ float:"left", marginLeft:"5px"}}>{char.level}</div>
                        <div style={{ float: "left", marginLeft: "5px" } }>{raceInfo.race}</div>
                        <div style={{ float: "left", marginLeft: "5px" } }>{classInfo.name}</div>
                        <div style={{ float: "left", marginLeft: "5px", color: factionColor } }>{char.realm}</div>
                    </div>
                </div>
                );
    }
});

var CharacterStatsControl = React.createClass({
    render: function () {
        var stats = this.props.data;

        return (
                <div>

                </div>
                );
    }
});

var CharacterTalentsControl = React.createClass({
    getInitialState: function () {
        return { activeKey: 1 };
    },
    handleSelect: function (activeKey) {
        this.setState({ activeKey });
    },
    render: function () {
        var PanelGroup = ReactBootstrap.PanelGroup;
        var Panel = ReactBootstrap.Panel;
        var talentsData = this.props.data;

        var talents = "";
        if (talentsData) {
            var eventKey = 1;
            talents = talentsData.map(function (talent) {
                if (talent.spec) {
                    var icon = "http://media.blizzard.com/wow/icons/36/" + talent.spec.icon + ".jpg"
                    var header = React.createElement('div', { style: { height: "25px" } },
                                    React.createElement('div', { style: { width: "150px" } },
                                        React.createElement('img', {src: icon, style:{ height: "25px"}}, null),
                                        React.createElement('label', { style: { marginLeft: "5px" } }, talent.spec.name)));

                    var spells = talent.talents.map(function (spell) {
                        return React.createElement(TalentSpellControl, {}, spell.spell);
                    });

                    return (<Panel key={"ctcPanel-" + talent.spec.name} header={header} eventKey={eventKey++}>
                                <div>                                    
                                    {spells}
                                </div>
                            </Panel>);
                }
            });
        }

        return (
                <div style={{width:"740px", margin:"auto"}}>
                    <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
                        {talents}
                    </PanelGroup>
                </div>
                );
    }
});

var TalentSpellControl = React.createClass({
    render: function () {
        var spell = this.props.children;
        var icon = "http://media.blizzard.com/wow/icons/36/" + spell.icon + ".jpg"

        return (
                <div style={{height: "40px"}}>
                    <img src={icon} style={{float: "left"}} />
                    <div style={{float: "left", marginLeft: "5px"}}>{spell.name}</div>
                </div>
                );
            //<div>{spell.description}</div>
            //<div>{spell.castTime}</div>
            //<div>{spell.id}</div>
    }
});
