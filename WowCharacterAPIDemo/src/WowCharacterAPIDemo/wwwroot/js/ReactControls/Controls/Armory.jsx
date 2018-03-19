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
                <Form inline style={{ margin: "auto", width: "fit-content" }}>
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
                    <Well style={{ width: "var(--ControlWidth)", margin: "auto", textAlign: "center" } }>{this.props.data}
                    </Well>
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
        var Well = ReactBootstrap.Well;
        var char = this.props.data;
        
        // Unused Variables
        var calcClass = char.calcClass;
        var lastModified = char.lastModified;
        var totalHKills = char.totalHonorableKills;

        var raceInfo = getRaceInfo(char.race);
        var backgroundImg = (raceInfo.faction === "Alliance") ? "/images/BlueChalkboard.jpg" : "/images/RedChalkboard.jpg";
        var ArmoryControl = this.getArmoryControl(raceInfo.faction);

        return (
                <div style={{marginTop: "5px"}}>
                    <Well style={{ width: "var(--ControlWidth)", margin: "auto", backgroundImage: "url(" + backgroundImg + ")", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                        <NamePlate data={char} />
                    </Well>
                    <PvpPlate />
                    <ArmoryNavBar selectCallback={this.onSelect} faction={raceInfo.faction}/>
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
                    <div style={{ position: "absolute", top: "12px", left: "12px" }}>{icon}</div>
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
                    {this.renderItem("/images/Pvp/Honor.png", "", "Honor Level", "22")}
                    {this.renderItem("/images/Pvp/HonorableKills.png", "", "Honorable Kills", "16535")}
                    {this.renderItem("/images/Pvp/PvpFrame.png", "2v2", "2v2 Rating", "96")}
                    {this.renderItem("/images/Pvp/PvpFrame.png", "3v3", "3v3 Rating", "0")}
                    {this.renderItem("/images/Pvp/PvpFrame.png", "BG", "Battlegrounds Rating", "0")}
                </Well>
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
