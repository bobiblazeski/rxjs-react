Store = {};
// All the entered clients
Store.clients = new Rx.BehaviorSubject([]);
// Search text starts empty, any free text allowed
Store.searchText = new Rx.BehaviorSubject('');
// Sort object
// null - no search
// obj.key - search field
// obj.value - search direction
Store.sort = new Rx.BehaviorSubject(null);
// Page number
Store.pageNumber = new Rx.BehaviorSubject(Constants.PAGE);
// Page size
Store.pageSize = new Rx.BehaviorSubject(Constants.PAGE_SIZE);
// Sort field
Store.sortField = new Rx.BehaviorSubject({});
// Insert new client
// TODO this looks kinda fishy
Store.insert = new Rx.Subject();

// Whenever new client is inserted add it to store
Store.insert.subscribe(function (client) {
    Store.clients.onNext(Store.clients.value.concat(R.merge(client,{time: Date.now()})));
});
// Source of clients filtered by search text
Store.results = Store.clients.combineLatest(
    Store.searchText,
    function (clients, text) {
        return Util.search(text, clients);
    }
);
// Source of sorted resulsts (clients already filtered by search text)
Store.sorted = Store.results.combineLatest(
    Store.sort,
    function (results, sort) {
        return Util.sort(sort,results);
    }
);
// Source of shown clients (sorted clients already filtered by search text)
Store.shown = Store.sorted.combineLatest(
    Store.pageNumber,
    Store.pageSize,
    function (sorted, pageNumber, pageSize) {
        var fittedPage = Util.fitPage(sorted.length, pageNumber, pageSize);
        if (fittedPage !== pageNumber) {
            Store.pageNumber.onNext(fittedPage);
        }
        return Util.pageEntries(sorted, fittedPage, pageSize);
    }
);
// Whenever sort field changes update Store.sort
// TODO might be better to be done directly for now
Store.sortField.subscribe(function (condition) {
    Store.sort.onNext(condition);
});