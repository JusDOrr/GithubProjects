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
        var talentsData = this.props.data;

        // TODO: FIX THE ISSUE WITH MISSING KEY VALUES
        var talents = "";
        if (talentsData) {
            var eventKey = 1;
            talents = talentsData.map(function (talent) {
                if (talent.spec) {
                    var icon = getIcon(talent.spec.icon);
                    var header = React.createElement('div', { style: { height: "25px" } },
                                    React.createElement('div', { style: { width: "150px" } },
                                        React.createElement('img', {src: icon, style:{ height: "25px"}}, null),
                                        React.createElement('label', { style: { marginLeft: "5px" } }, talent.spec.name)));

                    var spells = talent.talents.map(function (spell) {
                        return React.createElement(TalentSpell, { }, spell.spell);
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

var TalentSpell = React.createClass({
    render: function () {
        var spell = this.props.children;
        var icon = getIcon(spell.icon);

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