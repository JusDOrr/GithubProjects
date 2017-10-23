var Stats = React.createClass({
    render: function () {
        var Well = ReactBootstrap.Well,
            Grid = ReactBootstrap.Grid,
            Row = ReactBootstrap.Row,
            Col = ReactBootstrap.Col,
            Table = ReactBootstrap.Table;

        var stats = this.props.data;

        if (!stats)
            return null;

        // TODO: HARD CODED WARRIOR RIGHT NOW, MUST UPDATE
        var classStats = getClassStats(1, stats);

        // TODO: AM I ALLOWED TO USE THIS? /static/components/Icon/Icon.svg#haste
        return (
                <Well style={{ width: "740px", margin: "auto", height: "200px"}}>
                    <Table>
                        <tbody>
                            <tr>
                                <td style={{ display: "inline-block", width: "25%", height: "75px", borderTop: "transparent"}}>
                                    <img src="/images/Stats/Health.png" style={{ width: "55px", display: "inline-block" }} />
                                    <div style={{ display: "inline-block", marginLeft: "5px", verticalAlign: "middle", fontSize: "small" }}>
                                        <div>{classStats.health.toLocaleString()}</div>
                                        <div>HEALTH</div>
                                    </div>
                                </td>
                                <td style={{ display: "inline-block", width: "25%", height: "75px", borderTop: "transparent" }}>
                                    <img src="/images/Stats/Rage.png" style={{ width: "55px", display: "inline-block" }} />
                                    <div style={{ display: "inline-block", marginLeft: "5px", verticalAlign: "middle", fontSize: "small" }}>
                                        <div>{classStats.power.toLocaleString()}</div>
                                        <div>RAGE</div>
                                    </div>
                                </td>
                                <td style={{ display: "inline-block", width: "25%", height: "75px", borderTop: "transparent" }}>
                                    <img src="/images/Stats/Strength.png" style={{ width: "55px", display: "inline-block" }} />
                                    <div style={{ display: "inline-block", marginLeft: "5px", verticalAlign: "middle", fontSize: "small" }}>
                                        <div>{classStats.str.toLocaleString()}</div>
                                        <div>STRENGTH</div>
                                    </div>
                                </td>
                                <td style={{ display: "inline-block", width: "25%", height: "75px", borderTop: "transparent" }}>
                                    <img src="/images/Stats/Stamina.png" style={{ width: "55px", display: "inline-block" }} />
                                    <div style={{ display: "inline-block", marginLeft: "5px", verticalAlign: "middle", fontSize: "small" }}>
                                        <div>{classStats.sta.toLocaleString()}</div>
                                        <div>STAMINA</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ display: "inline-block", width: "25%", height: "75px", borderTop: "transparent" }}>
                                    <img src="/images/Stats/CriticalStrike.png" style={{ width: "55px", display: "inline-block" }} />
                                    <div style={{ display: "inline-block", marginLeft: "5px", verticalAlign: "middle", fontSize: "small" }}>
                                        <div>{Math.round(classStats.crit)}%</div>
                                        <div>CRITICAL STRIKE</div>
                                    </div>
                                </td>
                                <td style={{ display: "inline-block", width: "25%", height: "75px", borderTop: "transparent" }}>
                                    <img src="/images/Stats/Haste.png" style={{ width: "55px", display: "inline-block" }} />
                                    <div style={{ display: "inline-block", marginLeft: "5px", verticalAlign: "middle", fontSize: "small" }}>
                                        <div>{Math.round(classStats.haste)}%</div>
                                        <div>HASTE</div>
                                    </div>
                                </td>
                                <td style={{ display: "inline-block", width: "25%", height: "75px", borderTop: "transparent" }}>
                                    <img src="/images/Stats/Mastery.png" style={{ width: "55px", display: "inline-block" }} />
                                    <div style={{ display: "inline-block", marginLeft: "5px", verticalAlign: "middle", fontSize: "small" }}>
                                        <div>{Math.round(classStats.mastery)}%</div>
                                        <div>MASTERY</div>
                                    </div>
                                </td>
                                <td style={{ display: "inline-block", width: "25%", height: "75px", borderTop: "transparent" }}>
                                    <img src="/images/Stats/Versatility.png" style={{ width: "55px", display: "inline-block" }} />
                                    <div style={{ display: "inline-block", marginLeft: "5px", verticalAlign: "middle", fontSize: "small" }}>
                                        <div>{Math.round(classStats.versatilityDamageDoneBonus)}%</div>
                                        <div>VERSATILITY</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Well>
                );
    }
});
