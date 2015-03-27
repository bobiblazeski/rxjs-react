TreeMap = {};

// Renders d3plus tremap http://d3plus.org/examples/basic/9029130/
TreeMap.create = function (placeholder, source) {
    // TODO how to get initial data in the source?
    var visualization = d3plus.viz()
        .container(placeholder)
        .type("tree_map")
        .id("name")
        .size("value");
    source.sample(Rx.Observable.interval(2000)).subscribe(function (entries) {
        visualization.data(Util.regionsBySize(entries)).draw();
    });
};