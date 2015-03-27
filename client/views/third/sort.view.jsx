var NORMAL = "btn btn-default btn-sm";
var SELECTED = "btn btn-primary btn-sm";

SortView = React.createClass({

    componentWillMount: function () {
        this.handlers = {
            up: function () {
                this.props.notify.onNext({ key:this.props.name, value: 1});
            }.bind(this),
            clear: function () {
                this.props.notify.onNext(null);
            }.bind(this),
            down: function () {
                this.props.notify.onNext({ key:this.props.name, value: -1});
            }.bind(this)
        };
    },
    render: function () {
        var activeClass= activeButton(this.props.position);
        return (
            <div className="col-xs-6 col-md-2">
                <div className="btn-group " data-toggle="buttons">
                    <label className={activeClass.down}  onClick={this.handlers.up}>
                        <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                    </label>
                    <label className={activeClass.clear}  onClick={this.handlers.clear}>
                        {this.props.name}
                    </label>
                    <label className={activeClass.up} onClick={this.handlers.down}>
                        <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                    </label>
                </div>
            </div>
        );
    }
});



function activeButton(n){
    var res= {};

    res.down    = n >  0 ? SELECTED : NORMAL;
    res.clear = n == 0 ? SELECTED : NORMAL;
    res.up  = n <  0 ? SELECTED : NORMAL;
    return res;
}