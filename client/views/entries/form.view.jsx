var DEFAULT_US_STATE = UsStates.all[0].code;
var DEFAULT_STATE = {
    name: "",
    surname: "",
    email: "",
    stateCode: DEFAULT_US_STATE,
    submitDisabled: true,
    duplicateEmail: false
};

// View containing form for client entry
// It enables entering new client when fallowing conditions are met:
// #1 All fields are entered [name, surname, email, state]
// #2 Email is valid and not present in the current clients
FormView = React.createClass({
    getInitialState: function () {
        return DEFAULT_STATE;
    },

    componentWillMount: function () {
        var name = new Rx.BehaviorSubject(this.state.name);
        var surname = new Rx.BehaviorSubject(this.state.surname);
        var email = new Rx.BehaviorSubject(this.state.email);
        var stateCode = new Rx.BehaviorSubject(this.state.stateCode);
        this.props.source.combineLatest(
            name,
            surname,
            email,
            stateCode,
            function (clients, name, surname, email, stateCode) {
                var validEmail = isEmailValid(email, clients);
                var submitDisabled = !validEmail || R.any(R.eq(''), [name, surname, email, stateCode]);
                return {
                    name: name,
                    surname: surname,
                    email: email,
                    stateCode: stateCode,
                    submitDisabled: submitDisabled,
                    duplicateEmail: email
                };
            }).subscribe(this.setState.bind(this));
        this.handlers = {
            name: function (event) {
                name.onNext(String.prototype.trim.call(event.target.value));
            },
            surname: function (event) {
                surname.onNext(String.prototype.trim.call(event.target.value));
            },
            email: function (event) {
                email.onNext(String.prototype.trim.call(event.target.value));
            },
            stateCode: function (event) {
                stateCode.onNext(event.target.value);
            },
            submit: function () {
                this.props.notify.onNext({
                    name: this.state.name,
                    surname: this.state.surname,
                    email: this.state.email,
                    state: UsStates.name(this.state.stateCode)
                });
                name.onNext(DEFAULT_STATE.name);
                surname.onNext(DEFAULT_STATE.surname);
                email.onNext(DEFAULT_STATE.email);
                stateCode.onNext(DEFAULT_STATE.stateCode);
            }.bind(this)
        };
    },

    render: function () {
        return (
            <div className="col-xs-3 form-group">
                <p>
                    <input type="text" className="form-control" placeholder="name"
                          value={this.state.name} onChange={this.handlers.name}/>
                </p>
                <p>
                    <input type="text" className="form-control" placeholder="surname"
                          value={this.state.surname} onChange={this.handlers.surname}/>
                </p>
                <p>
                    <input type="email" className="form-control" placeholder="email"
                          value={this.state.email} onChange={this.handlers.email}/>
                </p>
                <p>
                    <StateView source={UsStates.all} onChange={this.handlers.stateCode}/>
                </p>
                <p>
                    <button type="submit" className="btn btn-lg btn-primary btn-block"
                            disabled={this.state.submitDisabled} onClick={this.handlers.submit}>Submit
                    </button>
                </p>
            </div>
        );
    }
});

/**
 * Is email valid and not contained in the clients
 *
 * @param {String} email - email to be checked for validity and uniqueness
 * @param {Array} clients - list of clients
 * @return {Boolean} true is email is valid and unique, flase otherwise
 */
function isEmailValid(email, clients) {
    return Util.validEmail(email) && R.none(R.propEq('email', email), clients);
}