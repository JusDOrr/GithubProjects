var Stats = React.createClass({
    getTableCell: function (img, stat, title) {
        return(<StatCell image={img} stat={stat} title={title} />);
    },
    getStatClass: function (faction) {
        var className = (faction === "Horde") ? "horde-stats" : "alli-stats";

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
                                <StatCell image="/images/Stats/Health.png" stat={classStats.health.toLocaleString()} title="HEALTH" />
                                {this.getPowerCell(classStats.powerType, classStats.power)}
                                {this.getMainStatCell(classStats)}
                                <StatCell image="/images/Stats/Stamina.png" stat={classStats.sta.toLocaleString()} title="STAMINA" />
                            </tr>
                            <tr className="stats-tr">
                                <StatCell image="/images/Stats/CriticalStrike100.png" stat={classStats.crit} title="CRITICAL STRIKE" rating={classStats.critRating} />
                                <StatCell image="/images/Stats/Haste.png" stat={classStats.haste} title="HASTE" rating={classStats.hasteRating} />
                                <StatCell image="/images/Stats/Mastery100.png" stat={classStats.mastery} title="MASTERY" rating={classStats.masteryRating} />
                                <StatCell image="/images/Stats/Versatility.png" stat={classStats.versatilityDamageDoneBonus} title="VERSATILITY" rating={classStats.versatility} />
                            </tr>
                        </tbody>
                    </Table>
                </Well>
                );
    }
});

var StatCell = React.createClass({
    render: function () {
        var stat = this.props.stat;
        if (this.props.rating)
            stat = Math.round(stat) + "%";

        return (
                <td className="tooltip-stat" style={{borderTop: "transparent"}}>
                    <StatToolTip stat={this.props.stat} title={this.props.title} rating={this.props.rating} />
                    <img src={this.props.image} />
                    <div>
                        <div>{stat}</div>
                        <div>{this.props.title}</div>
                    </div>
                </td>
                );
    }
});

var StatToolTip = React.createClass({
    round: function(number, precision) {
        var factor = Math.pow(10, precision);
        var tempNumber = number * factor;
        var roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    },
    getRating: function (rating) {
        return (
                <div style={{display: "inline-flex", width: "auto"}}>
                    <div style={{ margin: "0 5px 0 10px", width: "auto", fontSize: "14px" }}>Total Rating</div>
                    <div style={{ margin: "auto 0", width: "auto", fontSize: "11px" }}>{rating}</div>
                </div>
               )
    },
    render: function () {
        var stat = this.props.stat;
        var title = this.props.title;

        var rating = "";
        if (this.props.rating) {
            rating = this.getRating(this.props.rating);
            stat = this.round(stat, 2) + "%";
        }

        return (
                <div className="tooltiptext-stat tooltip-stat-top">
                    <div style={{display: "inline-flex", width: "auto"}}>
                        <div style={{ margin: "5px 5px 5px 10px", width: "auto", fontSize: "16px" }}>{title}</div>
                        <div style={{ margin: "auto 0", width: "auto", fontSize: "11px" }}>{stat}</div>
                    </div>
                    {rating}
                </div>
                );
    }
});
