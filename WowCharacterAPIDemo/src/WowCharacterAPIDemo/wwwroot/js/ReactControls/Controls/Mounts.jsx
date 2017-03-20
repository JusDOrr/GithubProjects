var MountControl = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
    },
    loadCommentsFromServer: function () {
        var apiPath = getAPIPath(APIType.Mounts);

        var xhr = new XMLHttpRequest();
        xhr.open('get', apiPath, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data.mounts });
        }.bind(this);
        xhr.send();
    },
    render: function () {
        var Well = ReactBootstrap.Well,
            PageHeader = ReactBootstrap.PageHeader;

        var HeaderElement = React.createElement(PageHeader, { style: { textAlign: "center", margin: "0" } }, "Mounts");

        return (
          <div>
            <Well>
                {HeaderElement}
                Mounts Go Here
            </Well>
          </div>
      );
    }
});
