Util = {};

// Email validation regex
var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/**
 * Check is email valid by regex
 *
 * @param {String} email - email to be checked
 * @return {Boolean} true if satisfies email regex, false otherwise
 */
Util.validEmail = function (email) {
    return EMAIL_REGEX.test(email);
};
/**
 * Return entries containing search text.
 *
 * @param {String} text - search text
 * @param {Array} list - list of entries
 * @return {Array} entries that satisfy the search text
 */
Util.search = function (text, list) {
    if (!text || text.trim() == '') {
        return list;
    }
    var tokens = text.trim().toUpperCase().split(' ');
    return R.filter(function (obj) {
        return satisfies(tokens, obj);
    }, list);
};
/**
 * Check is token present anywhere in any of the object value
 * @param {Array} tokens - array of string tokens
 * @param {Object} obj - object that might contain all the tokens
 * @return {Boolean} true if present, false otherwise
 */
function satisfies(tokens, obj) {
    var len = tokens.length;
    for (var i = 0; i < len; ++i) {
        if (!inObject(tokens[i], obj)) {
            return false;
        }
    }
    return true;
}
/**
 * Check is token present anywhere in any of the object value
 * @param {String} token - token string being search at
 * @param {Object} obj - object that might contain the token
 * @return {Boolean} true if present, false otherwise
 */
function inObject(token, obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)
            && typeof obj[key] === 'string'
            && obj[key].toUpperCase().indexOf(token) > -1) {
            return true;
        }
    }
    return false;
}

/**
 * Fake client entry
 *
 * @return {Object} created fake client entry
 */
Util.dummy = function () {
    var name = faker.name.firstName(),
        surname = faker.name.lastName();
    return {
        name: name,
        surname: surname,
        email: faker.internet.email(name, surname),
        state: faker.address.state()
    };
};
/**
 * Retrieve entries for the current page.
 *
 * @param {Array} list - array of entries
 * @param {Number} page - requested page
 * @param {Number} pageSize - size of each page
 * @return {Array} entries on the requested page
 */
Util.pageEntries = function (list, page, pageSize) {
    return R.take(pageSize, R.drop(Math.max((page - 1) * pageSize, 0), list));
};
/**
 * Fit current page according to page size and number of entries
 *
 * @param {Number} total - total number of entries
 * @param {Number} page - requested page
 * @param {Number} pageSize - size of each page
 * @return {Number} fitted page between requested page & maximum number of pages
 */
Util.fitPage = function (total, page, pageSize) {
    var maxPage = Math.ceil(total / pageSize);
    if (page > maxPage) {
        return maxPage;
    } else if (page < 1) {
        return 1;
    }
    return page;
};

/**
 * Group entries into list of census regions
 *
 * @func
 * @param {Array} list - array of clients
 * @return {Array} The list of regions where each regions is represented by object containing name & value where
 * region.name  could be one of ["Atlanta", "Chicago", "Denver", "Los Angeles", "New York", "Philadelphia"]
 * region.value represents the number of entries from that region
 */
Util.regionsBySize = function (list) {
    var grouped = R.groupBy(function (client) {
        return UsStates.region(client.state);
    }, list);
    return R.map(function (regionName) {
        return {
            name: regionName,
            value: grouped.hasOwnProperty(regionName) ? grouped[regionName].length : 0
        }
    }, R.pluck('region', UsStates.regions));
};
// Sort entries by sort obj
//  obj.key - defines the field property could be one of [name,surname, email, state]
//  obj.value - -1 for descending order, +1
Util.sort = function (obj, list) {
    if (obj) {
        return list.sort(function (a, b) {
            return obj.value < 0 ? comparator(a[obj.key], b[obj.key]) : comparator(b[obj.key], a[obj.key]);
        });
    }
    return R.sortBy(R.prop('time'), list);
};
// Compare two strings
function comparator(a, b) {
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
}