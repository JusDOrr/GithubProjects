var ArmoryControl = React.createClass({
    getInitialState: function () {
        return { data: null };
    },
    loadCharacterFromServer: function (realm, character) {
        GetCharacter(this.onload, this.onerror, realm, character);
    },
    onload: function (data) {
        this.setState({ data: data });
    },
    onerror: function (e) {
        // Nothing with this yet
    },
    onSearchClick: function () {
        var realm = document.getElementById('formControlsRealm').value;
        var char = document.getElementById('formControlsChar').value;

        this.loadCharacterFromServer(realm, char);
    },
    render: function () {
        var Well = ReactBootstrap.Well, PageHeader = ReactBootstrap.PageHeader,
            Form = ReactBootstrap.Form, FormGroup = ReactBootstrap.FormGroup,
            FormControl = ReactBootstrap.FormControl, ControlLabel = ReactBootstrap.ControlLabel,
            Button = ReactBootstrap.Button;

        var HeaderElement = React.createElement(PageHeader, { className: "pageHeader" }, "Armory");
        var DescElement = React.createElement("p", { className: "pageDescription" },
                                "This page consumes Blizzard's WOW Character APIs.");

        var BodyElement = "";
        if (this.state.data) {
            if (this.state.data.reason != undefined)
                BodyElement = React.createElement(ErrorLayout, { data: this.state.data.reason }, null);
            else
                BodyElement = React.createElement(ArmoryBody, { data: this.state.data }, null);
        }

        return (
          <div>
            <Well className="pageWell">
                {HeaderElement}
                {DescElement}
                <Form inline className="armory-form">
                    <FormGroup controlId="formControlsRealm">
                        <ControlLabel>Realm:</ControlLabel>
                        <FormControl label="Realm" placeholder="Enter Realm Name..." style={{ marginLeft: "5px" }}/>
                    </FormGroup>
                    <FormGroup controlId="formControlsChar" style={{ marginLeft: "5px" }}>
                        <ControlLabel>Character:</ControlLabel>
                        <FormControl label="Character" placeholder="Enter Character Name..." style={{ marginLeft: "5px" }} />
                    </FormGroup>
                    <Button type="button" onClick={this.onSearchClick} style={{ marginLeft: "5px" }}>
                    Search
                    </Button>
                </Form>
                {BodyElement}
            </Well>
        </div>
        );
    }
});

var ErrorLayout = React.createClass({
    render: function () {
        var Well = ReactBootstrap.Well;

        return (
                <div style={{marginTop: "5px"}}>
                    <Well className="error-well">{this.props.data}</Well>
                </div>
                );
    }
});

var ArmoryBody = React.createClass({
    getInitialState: function () {
        return { ArmoryNavType: ArmoryNavType.Character };
    },
    onSelect: function (armoryNavType) {
        this.setState({ ArmoryNavType: armoryNavType });
    },
    getArmoryControl: function (faction) {
        switch (this.state.ArmoryNavType) {
            case ArmoryNavType.Character:
                return (<CharacterControl data={this.props.data} faction={faction}></CharacterControl>);
            default:
                return (<div/>);
        }
    },
    render: function () {
        var char = this.props.data;
        
        // Unused Variables
        var calcClass = char.calcClass;
        var lastModified = char.lastModified;
        var totalHKills = char.totalHonorableKills;

        var raceInfo = getRaceInfo(char.race);
        var ArmoryControl = this.getArmoryControl(raceInfo.faction);

        return (
                <div style={{marginTop: "5px"}}>
                    <NamePlate data={char} faction={raceInfo.faction} />
                    <PvpPlate />
                    <ArmoryNavBar selectCallback={this.onSelect} faction={raceInfo.faction} />
                    {ArmoryControl}
                </div>
                );
    }
});

var PvpPlate = React.createClass({
    renderPrestige: function (text) {
        return (
            <div className="armory-pvp-plate tooltip">
                <span className="tooltiptext tooltip-top">Prestige Level</span>
                <div style={{display: "inline-block"}}>
                    <img src="/images/Pvp/Prestige.png" style={{marginLeft: "-10px"}} />
                </div>
                {text}
            </div>
            )
    },
    renderItem: function (imgSource, icon, tooltip, text) {
        return (
            <div className="armory-pvp-plate tooltip">
                <span className="tooltiptext tooltip-top">{tooltip}</span>
                <div style={{display: "inline-block"}}>
                    <img src={imgSource} />
                    <div>{icon}</div>
                </div>
                {text}
            </div>
            )
    },
    render: function () {
        var Well = ReactBootstrap.Well;

        return (
                <Well className="armory-pvp">
                    {this.renderPrestige("0")}
                    {this.renderItem("/images/Pvp/Honor.png", "", "Honor Level", "0")}
                    {this.renderItem("/images/Pvp/HonorableKills.png", "", "Honorable Kills", "0")}
                    {this.renderItem("/images/Pvp/PvpFrame.png", "2v2", "2v2 Rating", "0")}
                    {this.renderItem("/images/Pvp/PvpFrame.png", "3v3", "3v3 Rating", "0")}
                    {this.renderItem("/images/Pvp/PvpFrame.png", "BG", "Battlegrounds Rating", "0")}
                </Well>
                );
    }
});

var NamePlate = React.createClass({
    render: function () {
        var Well = ReactBootstrap.Well;

        var backgroundImg = (this.props.faction === "Alliance") ? "/images/BlueChalkboard.jpg" : "/images/RedChalkboard.jpg";

        return (
                <Well className="armory-name-plate" style={{ backgroundImage: "url(" + backgroundImg + ")" }}>
                    <div>
                        <NameSection data={this.props.data} />
                        <InfoSection data={this.props.data} />
                    </div>
                </Well>
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
                <div className="name-section">
                    <div className="name-section-logo" style={{ backgroundImage: "url(" + logo + ")" }} />
                    <div className="name-section-name-title">
                        <div className="name-section-name" style={{ color: classInfo.color}}>{char.name}</div>
                        <div className="name-section-title">{title}</div>
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
                <div className="info-section">
                    <div className="info-section-stats">
                        <div className="info-section-stats-logo" style={{ backgroundImage: "url(" + shieldicon + ")" }} />
                        <div className="info-section-standard">{char.achievementPoints}</div>
                        <div className="info-section-stats-logo" style={{ backgroundImage: "url(" + swordsicon + ")", marginLeft: "5px" }} />
                        <div className="info-section-standard">{itemlvl} ILVL</div>
                    </div>
                    <div className="info-section-stats-data">
                        <div style={{ float: "left" }}>{char.level}</div>
                        <div className="info-section-standard">{raceInfo.race}</div>
                        <div className="info-section-standard">{classInfo.name}</div>
                        <div className="info-section-standard" style={{ color: "#f8b700" }}>&lt;{guild}&gt;</div>
                        <div className="info-section-standard">{char.realm}</div>
                    </div>
                </div>
                );
    }
});
