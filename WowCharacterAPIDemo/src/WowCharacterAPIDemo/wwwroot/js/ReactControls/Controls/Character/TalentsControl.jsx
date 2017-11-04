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
                    var header = React.createElement('div', { style: { height: "fit-content" } },
                                    React.createElement('div', { style: { width: "150px" } },
                                        React.createElement('img', {src: icon, style:{ height: "25px"}}, null),
                                        React.createElement('label', { style: { marginLeft: "5px" } }, talent.spec.name)));

                    // Sorting by the tier value first, then mapping spells
                    var spells = talent.talents.sort(function (a, b) { return (a.tier > b.tier) ? 1 : ((b.tier > a.tier) ? -1 : 0); }).map(function (spell) {
                        return React.createElement(TalentSpell, { key:"talentSpell-" + spell.spell.name }, spell.spell, spell.tier);
                    });

                    return (<Panel key={"ctcPanel-" + talent.spec.name} header={header} eventKey={eventKey++}>
                                <Well style={{ width: "700px", height: "fit-content" }}>{talent.spec.description}</Well>
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

var TalentSpell = React.createClass({
    getLevel: function(tier){
        var level = 15 * (tier + 1);

        if (level > 90) {
            level = 100;
        }

        return level;
    },
    render: function () {
        var spell = this.props.children[0];
        var tier = this.props.children[1];

        var icon = getIcon(spell.icon);
        var lvl = this.getLevel(tier);
        //var desc = spell.description

        return (
                <div style={{height: "40px"}}>
                    <div style={{float: "left", height: "36px", width: "15px"}}>{lvl}</div>
                    <img src={icon} style={{float: "left", height: "36px", width: "36px", marginLeft: "15px"}} />
                    <div style={{float: "left", marginLeft: "5px"}}>{spell.name}</div>
                </div>
                );
    }
});