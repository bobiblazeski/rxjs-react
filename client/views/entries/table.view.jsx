var ROW_CLASSES = ["danger","active","success","info","warning"];

function rowClass(i){
    return i % 2 == 1 ? '' :  ROW_CLASSES[Math.floor(i/2) % ROW_CLASSES.length];
}

// View showing table of selected page of clients
TableView = React.createClass({

    getInitialState: function () {
        return {
            rows: []
        };
    },
    componentWillMount: function () {
        this.props.source.subscribe(function(shown){
            this.setState({rows:shown});
        }.bind(this));
    },
    render: function () {
        var tableRows = R.mapIndexed(function (d, key) {
            var trClass= rowClass(key);
            return (
                <tr key={key} className={trClass}>
                    <td>{d.name}</td>
                    <td>{d.surname}</td>
                    <td>{d.email}</td>
                    <td>{d.state}</td>
                </tr>
            );
        }, this.state.rows);

        return (
            <div className="col-xs-9">
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>name</th>
                        <th>surname</th>
                        <th>email</th>
                        <th>state</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableRows}
                    </tbody>
                </table>
            </div>
        );
    }
});

