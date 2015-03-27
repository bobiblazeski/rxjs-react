// View containing search, page size and paginations views
NavigationView  = React.createClass({
  render: function() {
    return (
        <div className="row  row-spacing">
            <SearchView searchText={Store.searchText}/>
            <PageSizeView notify={Store.pageSize}/>
            <PaginationView results={Store.results} pageNumber={Store.pageNumber} pageSize={Store.pageSize} />
        </div>
    );
  }
});