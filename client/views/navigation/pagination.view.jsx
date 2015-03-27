// Pagination view
PaginationView = React.createClass({

    getInitialState: function () {
        return {
            pageNumber: 0,
            pageSize: 0,
            total: 0
        };
    },

    componentWillMount: function () {
        this.props.results.combineLatest(
            this.props.pageNumber,
            this.props.pageSize,
            function (results, pageNumber, pageSize) {
                return {
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    total: results.length
                };
            }
        ).subscribe(this.setState.bind(this));
        this.handlers = {
            backward: function () {
                this.props.pageNumber.onNext(this.props.pageNumber.value - 1);
            }.bind(this),
            forward: function () {
                this.props.pageNumber.onNext(this.props.pageNumber.value + 1);
            }.bind(this)
        };
    },
    render: function () {
        var start = Math.max(this.state.pageNumber * this.state.pageSize - (this.state.pageSize - 1), 0);
        var end = Math.min(this.state.total, this.state.pageNumber * this.state.pageSize);
        return (
            <div className="col-xs-6 col-md-4 pagination-view">
                <div className="row  row-spacing">
                    <div className="col-xs-6">
                        {start} - {end} / {this.state.total}
                    </div>
                    <div className="col-xs-6">
                        <label className="btn btn-default btn-sm ">
                            <span className="glyphicon glyphicon-backward" aria-hidden="true"
                                  onClick={this.handlers.backward}></span>
                        </label>
                        <label className="btn btn-default btn-sm ">
                        <span className="glyphicon glyphicon-forward" aria-hidden="true"
                              onClick={this.handlers.forward}></span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
});