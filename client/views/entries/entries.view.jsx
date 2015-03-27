// Control view containing display table and form for client entry
EntriesView  = React.createClass({
  render: function() {
    return (
        <div className="row  row-spacing">
            <TableView source={Store.shown} />
            <FormView source={Store.clients} notify={Store.insert} />
        </div>
    );
  }
});