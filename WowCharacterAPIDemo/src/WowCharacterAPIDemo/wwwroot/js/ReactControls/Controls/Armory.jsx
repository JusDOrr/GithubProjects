var ArmoryControl = React.createClass({
    getInitialState: function () {
        return { data: null };
    },
    componentDidMount: function () {
        this.loadCharacterFromServer(null, null);
    },
    loadCharacterFromServer: function (realm, character) {
        var apiPath = getAPIPath(APIType.Characters, realm, character);
        GET(apiPath, this.onload, this.onerror);
    },
    onload: function (data) {
        this.setState({ data: data });
    },
    onerror: function (e) {
        // Nothing with this yet
    },
    onSearchClick: function () {
        var realm = document.getElementById('formControlsRealm').value;
        var char = document.getElementById('formControlsChar').value;

        this.loadCharacterFromServer(realm, char);
    },
    render: function () {
        var Well = ReactBootstrap.Well, PageHeader = ReactBootstrap.PageHeader,
            Form = ReactBootstrap.Form, FormGroup = ReactBootstrap.FormGroup,
            FormControl = ReactBootstrap.FormControl, ControlLabel = ReactBootstrap.ControlLabel,
            Button = ReactBootstrap.Button;

        var HeaderElement = React.createElement(PageHeader, { className: "pageHeader" }, "Character");
        var DescElement = React.createElement("p", { className: "pageDescription" },
                                "This page consumes Blizzard's WOW Character Profile APIs.");

        var BodyElement = "";
        if (this.state.data) {
            if (this.state.data.reason != undefined)
                BodyElement = React.createElement(ErrorLayout, { data: this.state.data.reason }, null);
            else
                BodyElement = React.createElement(CharacterLayout, { data: this.state.data }, null);
        }

        return (
          <div>
            <Well className="pageWell">
                {HeaderElement}
                {DescElement}
                <Form inline style={{ margin: "auto", width: "fit-content" }}>
                    <FormGroup controlId="formControlsRealm">
                        <ControlLabel>Realm:</ControlLabel>
                        <FormControl label="Realm" placeholder="Enter Realm Name..." style={{ marginLeft: "5px" }}/>
                    </FormGroup>
                    <FormGroup controlId="formControlsChar" style={{ marginLeft: "5px" }}>
                        <ControlLabel>Character:</ControlLabel>
                        <FormControl label="Character" placeholder="Enter Character Name..." style={{ marginLeft: "5px" }} />
                    </FormGroup>
                    <Button type="button" onClick={this.onSearchClick} style={{ marginLeft: "5px" }}>
                    Search
                    </Button>
                </Form>
                {BodyElement}
            </Well>
        </div>
        );
    }
});