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
        var Well = ReactBootstrap.Well;
        var char = this.props.data;
        
        // Unused Variables
        var calcClass = char.calcClass;
        var lastModified = char.lastModified;
        var totalHKills = char.totalHonorableKills;

        var avatar = getAvatar(char.race, char.gender, char.thumbnail);
        var raceInfo = getRaceInfo(char.race);
        var backgroundColor = getFactionColor(raceInfo.faction);

        return (
                <div>
                    <Well style={{ width: "740px", margin: "auto", background: backgroundColor }}>
                        <NamePlate data={char} />
                    </Well>
                    <div style={{backgroundImage: "url(" + avatar + ")", backgroundSize:"contains", backgroundRepeat:"no-repeat", height:"550px", width:"740px", margin:"auto"}}> 
                        <div style={{display: "inline-block"}}>
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
        return (
                <div style={{ height: "100px", marginLeft: "5px" }}>
                    <NameSection data={this.props.data} />
                    <InfoSection data={this.props.data} />
                </div>
                );
    }
});

var NameSection = React.createClass({
    render: function () {
        var char = this.props.data;

        if (!char)
            return null;

        var raceInfo = getRaceInfo(char.race);
        var classInfo = getClassInfo(char.class);
        var logo = getLogo(raceInfo.faction);

        var title = "";
        if (char.titles) {
            titleItem = char.titles.filter(function (obj) { return obj.selected == true; })[0];
            if(titleItem)
                title = String(titleItem.name).replace(/%s | %s|%s, /gi, "");
        }

        return (
                <div style={{ height: "100px", display: "inline-block" }}>
                    <div style={{ backgroundImage: "url(" + logo + ")" , float: "left" , width: "77.5px" , height: "100px" , backgroundSize: "100%" }} />
                    <div style={{ float: "left" , marginLeft: "10px" , marginTop: "20px", paddingRight: "10px",  height: "60px", borderRight: "solid grey", borderRightWidth: "thin" }}>
                        <div style={{ fontSize: "36px", color: classInfo.color, height: "40px" }}>{char.name}</div>
                        <div style={{ fontSize: "14px" , color: "white" , height: "40px" }}>{title}</div>
                    </div>
                </div>
                );
    }
});

var InfoSection = React.createClass({
    render: function () {
        var char = this.props.data;

        if (!char)
            return null;

        var raceInfo = getRaceInfo(char.race);
        var classInfo = getClassInfo(char.class);
        var guild = (char.guild) ? char.guild.name : "";
        var itemlvl = (char.items) ? char.items.averageItemLevelEquipped : "";

        var shieldicon = "/images/Icons/shieldicon.png";
        var swordsicon = "/images/Icons/swordsicon.png";

        return (                
                <div style={{ height: "100px", display: "inline-block", position: "absolute", paddingLeft: "10px", color: "#f8b700", fontSize: "14px" }}>
                    <div style={{ height: "20px", marginTop: "35px" }}>
                        <div style={{ backgroundImage: "url(" + shieldicon + ")", float: "left", width: "16px", height: "16px", backgroundSize: "100%" }} />
                        <div style={{ float: "left", marginLeft: "5px" } }>{char.achievementPoints}</div>
                        <div style={{ backgroundImage: "url(" + swordsicon + ")", float: "left", width: "16px", height: "16px", backgroundSize: "100%", marginLeft: "5px" }} />
                        <div style={{ float: "left", marginLeft: "5px" } }>{itemlvl} ILVL</div>
                    </div>
                    <div style={{ height: "20px", color: "white" }}>
                        <div style={{ float: "left" }}>{char.level}</div>
                        <div style={{ float: "left", marginLeft: "5px" } }>{raceInfo.race}</div>
                        <div style={{ float: "left", marginLeft: "5px" } }>{classInfo.name}</div>
                        <div style={{ float: "left", marginLeft: "5px", color: "#f8b700" } }>&lt;{guild}&gt;</div>
                        <div style={{ float: "left", marginLeft: "5px" } }>{char.realm}</div>
                    </div>
                </div>
                );
    }
});
