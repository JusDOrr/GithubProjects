var Talents = React.createClass({
    getInitialState: function () {
        return { activeKey: 1 };
    },
    handleSelect: function (activeKey) {
        this.setState({ activeKey });
    },
    render: function () {
        var PanelGroup = ReactBootstrap.PanelGroup;
        var Panel = ReactBootstrap.Panel;
        var Well = ReactBootstrap.Well;
        var talentsData = this.props.data;

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

                    // Sorting by the tier value first, then mapping spells
                    var spells = talent.talents.sort(function (a, b) { return (a.tier > b.tier) ? 1 : ((b.tier > a.tier) ? -1 : 0); }).map(function (spell) {
                        return React.createElement(TalentSpell, { key:"talentSpell-" + spell.spell.name }, spell.spell, spell.tier);
                    });

                    return (<Panel key={"ctcPanel-" + talent.spec.name} header={header} eventKey={eventKey++}>
                                <Well className="talentControlDesc">{talent.spec.description}</Well>
                                <div>
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
        //var desc = spell.description

        return (
                <div className="talentSpellControl">
                    <div className="talentSpellControlLvl">{lvl}</div>
                    <img src={icon} />
                    <div className="talentSpellControlName">{spell.name}</div>
                </div>
                );
    }
});