// Main react view
MainView = React.createClass({

    componentWillMount: function () {
        // TODO Is it smart to initialize charts at React mount view?
        TopCharts.create();
    },
    render: function () {
        return (
            <div className="container">
                <NavigationView />
                <ThirdRowView />
                <EntriesView />
            </div>
        );
    }
});