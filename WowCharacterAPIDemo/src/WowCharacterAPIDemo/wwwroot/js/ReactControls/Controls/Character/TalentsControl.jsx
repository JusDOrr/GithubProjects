var Talents = React.createClass({
    getInitialState: function () {
        return { activeKey: 1 };
    },
    handleSelect: function (activeKey) {
        this.setState({ activeKey });
    },
    getTalentClass: function (faction) {
        var className = "alli-talentcontrolPanel";

        if (faction === "Horde")
            className = "horde-talentcontrolPanel";

        return className;
    },
    getTalentDescClass: function (faction) {
        var className = "alli-talentControlDesc";

        if (faction === "Horde")
            className = "horde-talentControlDesc";

        return className;
    },
    render: function () {
        var PanelGroup = ReactBootstrap.PanelGroup,
            Panel = ReactBootstrap.Panel,
            Well = ReactBootstrap.Well;

        var talentsData = this.props.data;
        var ControlPanelClass = this.getTalentClass(this.props.faction);
        var ControlPanelDescClass = this.getTalentDescClass(this.props.faction);

        var talents = "";
        if (talentsData) {
            var eventKey = 1;
            talents = talentsData.map(function (talent) {
                if (talent.spec) {
                    var icon = getIcon(talent.spec.icon);
                    var header = React.createElement('div', { className: "talentControlHeader" },
                                    React.createElement('div', { },
                                        React.createElement('img', { src: icon }, null),
                                        React.createElement('label', { }, talent.spec.name)));

                    // (No longer) Sorting by the tier value first, then mapping spells
                    var spells = talent.talents
                            .sort(function (a, b) { return (a.tier > b.tier) ? 1 : ((b.tier > a.tier) ? -1 : 0); })
                            .map(function (spell) {
                                return React.createElement(TalentSpell, { key:"talentSpell-" + spell.spell.name }, spell.spell, spell.tier);
                            });

                    return (<Panel className={ControlPanelClass} key={"ctcPanel-" + talent.spec.name} header={header} eventKey={eventKey++ }>
                                <Well className={ControlPanelDescClass}>{talent.spec.description}</Well>
                                <div className="talentSpellsContainer">
                                    {spells}
                                </div>
                            </Panel>);
                }
            });
        }   

        return (
                <div className="talentControl">
                    <div className="talentLabel">Talents</div>
                    <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
                        {talents}
                    </PanelGroup>
                </div>
                );
    }
});

var TalentSpell = React.createClass({
    getLevel: function(tier){
        var level = 15 * (tier + 1);

        if (level > 90) { level = 100; }

        return level;
    },
    render: function () {
        var spell = this.props.children[0];
        var tier = this.props.children[1];

        var icon = getIcon(spell.icon);
        var lvl = this.getLevel(tier);

        return (
                <div className="talentSpellControl">
                    <div className="talentSpellControlLvl">{lvl}</div>
                    <div className="tooltip-talent">
                        <TalentToolTip spell={spell} icon={icon} />
                        <img src={icon} />
                    </div>
                    <div className="talentSpellControlName">{spell.name}</div>
                    </div>
                );
    }
});

var TalentToolTip = React.createClass({
    render: function () {
        var name = this.props.spell.name;
        var castTime = this.props.spell.castTime;
        var desc = this.props.spell.description;

        return (
                <div className="tooltiptext-talent tooltip-talent-top">
                    <div style={{ marginBottom: "5px", display: "flex" }}>
                        <img style={{ margin: "0 5px", width: "35px", height: "35px" }} src={this.props.icon} />
                        <div style={{ margin: "auto 20px" }}>{name}</div>
                    </div>
                    <div style={{ margin: "10px" }}>{castTime}</div>
                    <div style={{ margin: "10px" }}>{desc}</div>
                </div>
                );
    }
});
