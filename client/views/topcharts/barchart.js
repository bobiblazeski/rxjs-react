BarChart = {};
// Renders Epoch realtime bar chart http://fastly.github.io/epoch/real-time/#bar
BarChart.create = function(placeholder,source) {
    var time = Date.now();
    var barChartData = R.map(function(regionName){
        return {
            label:regionName,
            values: [{time:time, y:0}]
        }
    }, UsStates.regionNames);
    var barChart = $('#barchart').epoch({
        type: 'time.bar',
        data: barChartData
    });
    source.sample(Rx.Observable.interval(2000)).subscribe(function (entries) {
        barChart.push(toData(entries));
    });
};

function toData(entries) {
    var time = Date.now();
    return R.map(function(region){
        return {
            time:time,
            y: region.value
        }
    },Util.regionsBySize(entries));
}