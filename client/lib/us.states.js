UsStates = {};
// USA States
UsStates.all = [
    {'name': 'Alabama', 'code': 'AL'}, {'name': 'Alaska', 'code': 'AK'},
    {'name': 'Arizona', 'code': 'AZ'}, {'name': 'Arkansas', 'code': 'AR'}, {'name': 'California', 'code': 'CA'},
    {'name': 'Colorado', 'code': 'CO'}, {'name': 'Connecticut', 'code': 'CT'}, {'name': 'Delaware', 'code': 'DE'},
    {'name': 'Florida', 'code': 'FL'}, {'name': 'Georgia', 'code': 'GA'}, {'name': 'Hawaii', 'code': 'HI'},
    {'name': 'Idaho', 'code': 'ID'}, {'name': 'Illinois', 'code': 'IL'}, {'name': 'Indiana', 'code': 'IN'},
    {'name': 'Iowa', 'code': 'IA'}, {'name': 'Kansas', 'code': 'KS'}, {'name': 'Kentucky', 'code': 'KY'},
    {'name': 'Louisiana', 'code': 'LA'}, {'name': 'Maine', 'code': 'ME'}, {'name': 'Maryland', 'code': 'MD'},
    {'name': 'Massachusetts', 'code': 'MA'}, {'name': 'Michigan', 'code': 'MI'}, {'name': 'Minnesota', 'code': 'MN'},
    {'name': 'Mississippi', 'code': 'MS'}, {'name': 'Missouri', 'code': 'MO'}, {'name': 'Montana', 'code': 'MT'},
    {'name': 'Nebraska', 'code': 'NE'}, {'name': 'Nevada', 'code': 'NV'}, {'name': 'New Hampshire', 'code': 'NH'},
    {'name': 'New Jersey', 'code': 'NJ'}, {'name': 'New Mexico', 'code': 'NM'}, {'name': 'New York', 'code': 'NY'},
    {'name': 'North Carolina', 'code': 'NC'}, {'name': 'North Dakota', 'code': 'ND'}, {'name': 'Ohio', 'code': 'OH'},
    {'name': 'Oklahoma', 'code': 'OK'}, {'name': 'Oregon', 'code': 'OR'}, {'name': 'Pennsylvania', 'code': 'PA'},
    {'name': 'Rhode Island', 'code': 'RI'}, {'name': 'South Carolina', 'code': 'SC'}, {
        'name': 'South Dakota',
        'code': 'SD'
    },
    {'name': 'Tennessee', 'code': 'TN'}, {'name': 'Texas', 'code': 'TX'}, {'name': 'Utah', 'code': 'UT'},
    {'name': 'Vermont', 'code': 'VT'}, {'name': 'Virginia', 'code': 'VA'}, {'name': 'Washington', 'code': 'WA'},
    {'name': 'West Virginia', 'code': 'WV'}, {'name': 'Wisconsin', 'code': 'WI'}, {'name': 'Wyoming', 'code': 'WY'}
];
/**
 * Return state name by its two letter code
 *
 * @param {String} code - state two letter code
 * @return {String} state name
 */
UsStates.name = function (code) {
    return R.find(R.propEq('code', code), UsStates.all).name;
};

// USA census regions with their corresponding countries
UsStates.regions = [
    {
        "region": "Atlanta",
        "states": ["Alabama", "Florida", "Georgia", "Louisiana", "Mississippi", "North Carolina", "South Carolina"]
    },
    {
        "region": "Chicago",
        "states": ["Arkansas", "Illinois", "Indiana", "Iowa", "Michigan", "Minnesota", "Missouri", "Wisconsin"]
    },
    {
        "region": "Denver",
        "states": ["Arizona", "Colorado", "Kansas", "Montana", "Nebraska", "New Mexico", "North Dakota", "South Dakota", "Oklahoma", "Texas", "Utah", "Wyoming"]
    },
    {
        "region": "Los Angeles",
        "states": ["Alaska", "California", "Hawaii", "Idaho", "Nevada", "Oregon", "Washington"]
    },
    {
        "region": "New York",
        "states": ["Connecticut", "Maine", "Massachusetts", "New Hampshire", "New Jersey", "New York", "Puerto Rico", "Rhode Island", "Vermont"]
    },
    {
        "region": "Philadelphia",
        "states": ["Delaware", "District of Columbia", "Kentucky", "Maryland", "Ohio", "Pennsylvania", "Tennessee", "Virginia", "West Virginia"]
    }
];
// USA census regions names
UsStates.regionNames = R.pluck('region',UsStates.regions);
/**
 * Find state region
 *
 * @param {String} state - state name
 * @return {String} census region
 */
UsStates.region = function (state) {
    for(var i = 0; i < UsStates.regions.length; ++i) {
        if(R.contains(state,UsStates.regions[i].states)){
            return UsStates.regions[i].region;
        }
    }
    throw "Unknown state: " +state;
};
