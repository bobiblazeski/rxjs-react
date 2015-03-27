// Utility view that renders select ccording to given source
StateView  = React.createClass({
  render: function() {
      var options = R.mapIndexed(function(d,key){
         return  <option key={key} value={d.code}>{d.name}</option>
      },this.props.source);
    return (
        <select name="state" className="form-control" onChange={this.props.onChange}>
            {options}
        </select>
    );
  }
});