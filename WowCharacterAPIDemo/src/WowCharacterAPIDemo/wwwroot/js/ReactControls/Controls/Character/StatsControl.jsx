var Stats = React.createClass({
    getTableCell: function (img, stat, title) {
        return(
            <td style={{borderTop: "transparent"}}>
                <img src={img} />                                       
                <div>
                    <div>{stat}</div>
                    <div>{title}</div>
                </div>
            </td>
            );
    },
    getStatClass: function (faction) {
        var className = "alli-stats";

        if (faction === "Horde")
            className = "horde-stats";

        return className;
    },
    render: function () {
        var Well = ReactBootstrap.Well,
            Table = ReactBootstrap.Table;

        var stats = this.props.data;

        if (!stats)
            return null;

        var className = this.getStatClass(this.props.faction);

        // TODO: HARD CODED WARRIOR RIGHT NOW, MUST UPDATE
        var classStats = getClassStats(1, stats);

        // TODO: AM I ALLOWED TO USE THIS? /static/components/Icon/Icon.svg#haste
        return (
                <Well className={className}>
                    <Table>
                        <tbody>
                            <tr className="stats-tr">
                                {this.getTableCell("/images/Stats/Health.png", classStats.health.toLocaleString(), "HEALTH")}
                                {this.getTableCell("/images/Stats/Rage100.png", classStats.power.toLocaleString(), "RAGE")}
                                {this.getTableCell("/images/Stats/Strength100.png", classStats.str.toLocaleString(), "STRENGTH")}
                                {this.getTableCell("/images/Stats/Stamina.png", classStats.sta.toLocaleString(), "STAMINA")}
                            </tr>
                            <tr className="stats-tr">
                                {this.getTableCell("/images/Stats/CriticalStrike100.png", Math.round(classStats.crit)+"%", "CRITICAL STRIKE")}
                                {this.getTableCell("/images/Stats/Haste.png", Math.round(classStats.haste)+"%", "HASTE")}
                                {this.getTableCell("/images/Stats/Mastery100.png", Math.round(classStats.mastery)+"%", "MASTERY")}
                                {this.getTableCell("/images/Stats/Versatility.png", Math.round(classStats.versatilityDamageDoneBonus)+"%", "VERSATILITY")}
                            </tr>
                        </tbody>
                    </Table>
                </Well>
                );
    }
});
