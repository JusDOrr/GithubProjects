var ProgressionControl = React.createClass({
    render: function () {
        var Well = ReactBootstrap.Well;

        if (!this.props.data)
            return (<div />);

        var progression = this.props.data;

        // Current Content Raids are: The Emerald Nightmare, Trial of Valor, The Nighthold, and Tomb of Sargeras
        var raids = progression.raids.slice(progression.raids.length - 5, progression.raids.length).map(function (raid) {
            return React.createElement(Raid, { key:"Raid-" + raid.name, data: raid }, null);
        });;

        return (
                <div>
                    <div className="progressControl">Legion Raid Progress</div>
                    <Well className="progressControlWell">
                        {raids}
                    </Well>
                </div>
                );
    }
});

var Raid = React.createClass({
    render: function () {
        var Well = ReactBootstrap.Well;
        var raid = this.props.data;

        var raidImg = getRaidImage(raid.name);

        // Retreive boss status per raid difficulty
        var lfrBossProg = { "name": "LFR", bosses: [] },
            normBossProg = { "name": "Normal", bosses: [] },
            heroBossProg = { "name": "Heroic", bosses: [] },
            mythicBossProg = { "name": "Mythic", bosses: [] };

        var progress = raid.bosses.map(function (boss) {
            if (boss.lfrKills != undefined)
                lfrBossProg.bosses.push({ "name": boss.name, "kills": boss.lfrKills, "time": boss.lfrTimestamp });
            if (boss.normalKills != undefined)
                normBossProg.bosses.push({ "name": boss.name, "kills": boss.normalKills, "time": boss.normalTimestamp });
            if (boss.heroicKills != undefined)
                heroBossProg.bosses.push({ "name": boss.name, "kills": boss.heroicKills, "time": boss.heroicTimestamp });
            if (boss.mythicKills != undefined)
                mythicBossProg.bosses.push({ "name": boss.name, "kills": boss.mythicKills, "time": boss.mythicTimestamp });
        })

        // Build LFR, Normal, Heroic, and Mythic Progress Bars...
        var lfrProg = React.createElement(RaidProgress, { progress: lfrBossProg }, null);
        var normProg = React.createElement(RaidProgress, { progress: normBossProg }, null);
        var heroProg = React.createElement(RaidProgress, { progress: heroBossProg }, null);
        var mythicProg = React.createElement(RaidProgress, { progress: mythicBossProg }, null);

        return (
                <Well className="raidWell">
                    <img src={raidImg} />
                    <div>{raid.name}</div>
                    <div style={{ color: "#c69b6d", fontSize: "11px" }}>Level 110</div>
                    <div>
                        {lfrProg}
                        {normProg}
                        {heroProg}
                        {mythicProg}
                    </div>
                </Well>
                );
    }
});

var RaidProgress = React.createClass({
    getProgressStyle: function (killTotal, bossTotal) {
        var percent = (killTotal / bossTotal) * 100;
        var style = "success";
        if (percent >= 50 && percent < 100)
            style = "warning";
        else if (percent < 50)
            style = "danger";

        return style;
    },
    render: function () {
        var ProgressBar = ReactBootstrap.ProgressBar;

        var difficultyName = this.props.progress.name;
        var progress = this.props.progress.bosses;

        var killTotal = 0;
        var value = progress.forEach(function (boss, index) {
            if (boss.kills > 0)
                killTotal += 1;
        });

        var label = killTotal + "/" + progress.length;
        var style = this.getProgressStyle(killTotal, progress.length);

        return (
                <div className="raid">
                    <div>{difficultyName}</div>
                    <ProgressBar striped active bsStyle={style} min={0} max={progress.length} now={killTotal} label={label}
                                 style={{ backgroundColor: "grey", display: "inline-block", width: "190px", marginLeft: "5px" }}/>
                </div>
                );
    }
});