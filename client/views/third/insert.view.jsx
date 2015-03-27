var interval = null;
// Automatic entry of new fake clients
InsertView = React.createClass({
    getInitialState: function () {
        return {stopped: true}
    },
    componentWillMount: function () {
        toggleInserting.call(this, !this.state.stopped);
        this.handlers = {
            onClick: function () {
                toggleInserting.call(this, this.state.stopped);
                this.setState({stopped: !this.state.stopped});
            }.bind(this)
        }
    },
    render: function () {
        var display = this.state.stopped ?  {  text: 'Stop', className: "btn btn-lg btn-danger btn-block btn-sm" }
            :  {  text: 'Start', className: "btn btn-lg btn-primary btn-block btn-sm" };
        return (
            <div className="col-xs-6 col-md-4">
                <button type="submit" className={display.className}
                        onClick={this.handlers.onClick}>{display.text} </button>
            </div>
        );
    }
});


function toggleInserting(stopped) {
    if (stopped) {
        clearInterval(interval);
    } else {
        interval = setInterval(function () {
            this.props.notify.onNext(Util.dummy());
        }.bind(this), this.props.period);
    }
}