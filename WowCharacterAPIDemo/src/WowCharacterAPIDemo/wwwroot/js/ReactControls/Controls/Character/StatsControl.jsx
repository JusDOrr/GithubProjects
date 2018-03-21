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
    getPowerCell: function (powerType, power) {
        var icon = "";
        if (powerType === "rage") icon = "/images/Stats/Rage100.png";
        else if (powerType === "mana") icon = "/images/Stats/Mana100.png";
        else if (powerType === "fury") icon = "/images/Stats/Fury100.png";
        else if (powerType === "maelstrom") icon = "/images/Stats/Maelstrom100.png";
        else if (powerType === "energy") icon = "/images/Stats/Energy100.png";
        else if (powerType === "runic-power") icon = "/images/Stats/RunicPower100.png";
        else if (powerType === "focus") icon = "/images/Stats/Focus100.png";

        return this.getTableCell(icon, power.toLocaleString(), powerType.toLocaleString().toUpperCase());
    },
    getMainStatCell: function (stat) {
        var statVal = "";
        var statName = "";
        var icon = "";

        if (stat.str) {
            statVal = stat.str.toLocaleString();
            statName = "STRENGTH";
            icon = "/images/Stats/Strength100.png";
        }
        else if (stat.agi) {
            statVal = stat.agi.toLocaleString();
            statName = "AGILITY";
            icon = "/images/Stats/Agility100.png";
        }
        else if (stat.int) {
            statVal = stat.int.toLocaleString();
            statName = "INTELLECT";
            icon = "/images/Stats/Intellect100.png";
        }

        return this.getTableCell(icon, statVal, statName);
    },
    render: function () {
        var Well = ReactBootstrap.Well,
            Table = ReactBootstrap.Table;

        var stats = this.props.data;

        if (!stats)
            return null;

        var className = this.getStatClass(this.props.faction);
        var classStats = getClassStats(this.props.charClass, stats);

        // AM I ALLOWED TO USE THESE? /static/components/Icon/Icon.svg#haste, etc.
        return (
                <Well className={className}>
                    <Table>
                        <tbody>
                            <tr className="stats-tr">
                                {this.getTableCell("/images/Stats/Health.png", classStats.health.toLocaleString(), "HEALTH")}
                                {this.getPowerCell(classStats.powerType, classStats.power)}
                                {this.getMainStatCell(classStats)}
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
