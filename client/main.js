// Entry point for the application
Meteor.startup(function () {

    React.render(
        React.createElement(MainView, null),
        document.getElementById('content')
    );
});

// Insert some dummy data to show something
R.forEach(function(){
    Store.insert.onNext(Util.dummy());
},R.range(1,200));