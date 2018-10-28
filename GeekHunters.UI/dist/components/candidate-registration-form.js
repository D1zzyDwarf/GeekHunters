"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class CandidateRegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = '';
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state);
        event.preventDefault();
    }
    render() {
        return (React.createElement("div", { className: "container" },
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "firstname" },
                        "Firstname:",
                        React.createElement("input", { className: "form-control", id: "firstname", type: "text" }))),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "lastname" },
                        "Lastname:",
                        React.createElement("input", { className: "form-control", id: "lastname", type: "text" }))),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "skills" },
                        "Skills:",
                        React.createElement("select", { multiple: true, className: "form-control", id: "skills" }))),
                React.createElement("input", { className: "btn btn-primary", type: "submit", value: "Submit" }))));
    }
}
exports.CandidateRegistrationForm = CandidateRegistrationForm;
//# sourceMappingURL=candidate-registration-form.js.map