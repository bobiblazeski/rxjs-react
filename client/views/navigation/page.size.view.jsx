// View that enables selection of the page size hardcoded values of [5,10,20,30]
PageSizeView = React.createClass({
    componentWillMount: function () {
        this.handlers = {
            five: function () {
                this.props.pageSize.onNext(5);
            }.bind(this),
            ten: function () {
                this.props.notify.onNext(10);
            }.bind(this),
            twenty: function () {
                this.props.notify.onNext(20);
            }.bind(this),
            thirty: function () {
                this.props.notify.onNext(30);
            }.bind(this)
        };
    },

    render: function () {
        return (
            <div className="col-xs-6 col-md-2 pagination-view">
                <button className="btn  btn-default" onClick={this.handlers.five}>5</button>
                <button className="btn btn-default" onClick={this.handlers.ten}>10</button>
                <button className="btn btn-default" onClick={this.handlers.twenty}>20</button>
                <button className="btn btn-default" onClick={this.handlers.thirty}>30</button>
            </div>
        );
    }
});