// View that enables searchign by entered text
SearchView = React.createClass({

    componentWillMount: function () {
        this.handlers = {
            handleChange: function (event) {
                this.props.searchText.onNext(event.target.value);
            }.bind(this)
        };
    },

    render: function () {
        return (
            <div className="col-xs-12 col-md-6">
                <input type="text" className="form-control" placeholder="Search" aria-describedby="basic-addon1"
                       onChange={this.handlers.handleChange}></input>
            </div>
        );
    }
});