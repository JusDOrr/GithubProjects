var CharacterControl = React.createClass({
    render: function () {
        var Well = ReactBootstrap.Well;
        var char = this.props.data;

        var avatar = getAvatar(char.race, char.gender, char.thumbnail);

        return (
                <div style={{marginTop: "1px"}}>
                    <div className="armory-character" style={{backgroundImage: "url(" + avatar + ")"}}>
                        <div style={{display: "inline-block"}}>
                            <Gear data={char.items} />
                        </div>
                    </div>
                    <Stats data={char.stats} faction={this.props.faction} charClass={char.class}/>
                    <Talents data={char.talents} faction={this.props.faction} />
                    <ProgressionControl data={char.progression} />
                </div>
                );
    }
});
