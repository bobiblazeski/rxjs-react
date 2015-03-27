TopCharts = {};

TopCharts.create = function() {
    TreeMap.create('#viz',Store.results);
    BarChart.create('#barchart',Store.results);
};