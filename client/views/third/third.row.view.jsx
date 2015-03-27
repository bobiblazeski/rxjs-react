// Shows sorting by fields and automatic entry of data
ThirdRowView  = React.createClass({
    getInitialState: function () {
        return {
            name: 0,
            surname: 0,
            email: 0,
            state:0
        };
    },

    componentWillMount: function () {
        Store.sort.subscribe(function(val){
            this.setState({
                name:    val.key =='name'    ? val.value : 0,
                surname: val.key =='surname' ? val.value : 0,
                email:   val.key =='email'   ? val.value : 0,
                state:   val.key =='state'   ? val.value : 0
            });
        }.bind(this));
    },

  render: function() {
    return (
        <div className="row  row-spacing">
            <SortView name="name" position={this.state.name} notify={Store.sort} />
            <SortView name="surname"  position={this.state.surname} notify={Store.sort}/>
            <SortView name="email"  position={this.state.email} notify={Store.sort}/>
            <SortView name="state"  position={this.state.state} notify={Store.sort}/>
            <InsertView notify={Store.insert} period={2500}  />
        </div>
    );
  }
});