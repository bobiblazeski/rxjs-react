Meteor.startup(function () {

    React.render(
        React.createElement(MainView, null),
        document.getElementById('content')
    );
});