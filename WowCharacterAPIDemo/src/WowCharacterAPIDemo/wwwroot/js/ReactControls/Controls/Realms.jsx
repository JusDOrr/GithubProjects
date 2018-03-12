var RealmStatusControl = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadRealmsFromServer();
    },
    loadRealmsFromServer: function () {
        var apiPath = getAPIPath(APIType.RealmStatus);
        GET(apiPath, this.onload, this.onerror);
    },
    onload: function (data) {
        this.setState({ data: data.realms });
    },
    onerror: function (e) {
        // Nothing with this yet
    },
    render: function () {
        var Well = ReactBootstrap.Well,
            PageHeader = ReactBootstrap.PageHeader;

        var HeaderElement = React.createElement(PageHeader, { className: "pageHeader" }, "Realm Status");
        var DescElement = React.createElement("p", { className: "pageDescription"},
                                "This page consumes Blizzard's WOW Realm API.");

        return (
          <div>
            <Well className="pageWell">
                {HeaderElement}
                {DescElement}
                <RealmTable data={this.state.data} />
            </Well>
          </div>
      );
    }
});

var RealmTable = React.createClass({
    getHeader: function () {
        var header = React.createElement("tr", { style: { background: "#d6d6d6" } },
                        React.createElement("th", null, "Status"),
                        React.createElement("th", null, "Name"),
                        React.createElement("th", null, "Type"),
                        React.createElement("th", null, "Battlegroup"),
                        React.createElement("th", null, "Population"),
                        React.createElement("th", null, "Timezone"),
                        React.createElement("th", null, "Locale")
                     );

        return header;
    },
    render: function () {
        var Table = ReactBootstrap.Table;

        var Header = this.getHeader();
        var Realms = this.props.data.map(function (realm) {
            return (<RealmRow key={realm.slug} data={realm}></RealmRow>);
        });

        return (
        <Table className="pageTable" striped>
            <thead>{Header}</thead>
            <tbody>{Realms}</tbody>
        </Table>
        );
    }
});

var RealmRow = React.createClass({
    getStatus: function (status, queue) {
        var Glyphicon = ReactBootstrap.Glyphicon;
        var queue = this.getQueue(queue);

        var icon = "";
        if (status)
            icon = React.createElement(Glyphicon, { glyph: "arrow-up", style: { color: "green" } });
        else
            icon = React.createElement(Glyphicon, { glyph: "arrow-down", style: { color: "red" } });

        return React.createElement('td', null, icon, queue);
    },
    getQueue: function (queue) {
        var Glyphicon = ReactBootstrap.Glyphicon;
        var element = "";

        if (queue) {
            element = React.createElement("div", { className: "tooltip" },
                        React.createElement(Glyphicon, { glyph: "time", style: { margin: "0 0 0 5" } },
                            React.createElement("span", { className: "tooltiptext tooltip-top" }, "Login Queue")
                        )
                      );
        }
        return element;
    },
    getType: function (type) {
        var element = "(PvE)";

        if (type == 'pvp')
            element = "(PvP)";

        return React.createElement('td', null, element);
    },
    getPopulation: function (population) {
        var element = "New Players";

        if (population == "full")
            element = "Full";
        else if (population == "low")
            element = "Low";
        else if (population == "medium")
            element = "Medium";

        return React.createElement('td', null, element);
    },
    getLocale: function (locale) {
        var element = locale;

        if (element == 'en_US')
            element = "United States";
        else if (element == 'es_MX')
            element = "Mexico";
        else if (element == 'pt_BR')
            element = "Brazil";

        return React.createElement('td', null, element);
    },
    getTimezone: function (timezone) {
        var element = timezone;

        if (element == 'America/Chicago')
            element = "CDT";
        else if (element == 'America/Denver')
            element = "MDT";
        else if (element == 'America/Los_Angeles')
            element = "PDT";
        else if (element == 'America/New_York')
            element = "EDT";
        else if (element == 'America/Sao_Paulo')
            element = "BRT";
        else if (element == 'Australia/Melbourne')
            element = "AEDT";

        return React.createElement('td', null, element);
    },
    render: function () {
        var realm = this.props.data;

        // Build the columns
        var Name = React.createElement('td', null, realm.name);
        var Battlegroup = React.createElement('td', null, realm.battlegroup);
        var Status = this.getStatus(realm.status, realm.queue);       
        var Type = this.getType(realm.type);        
        var Population = this.getPopulation(realm.population);
        var Timezone = this.getTimezone(realm.timezone);
        var Locale = this.getLocale(realm.locale);

        return (
                <tr>
                    {Status}
                    {Name}
                    {Type}
                    {Battlegroup}
                    {Population}
                    {Timezone}
                    {Locale}
                </tr>
            );
    }
});

//http://media.blizzard.com/wow/icons/{size}/{icon_name}.jpg Icon hosting location
//http://media.blizzard.com/wow/icons/36/inv_ability_mount_cockatricemount_white.jpg