"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const config_1 = require("../../config");
require("bootstrap/dist/css/bootstrap.min.css");
class CandidateRegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            candidateFirstName: null,
            candidateLastName: null,
            candidateSkills: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onSkillsChange = this.onSkillsChange.bind(this);
    }
    onFirstNameChange(event) {
        this.setState({ candidateFirstName: event.target.value });
    }
    onLastNameChange(event) {
        this.setState({ candidateLastName: event.target.value });
    }
    onSkillsChange(event) {
        var options = event.target.options;
        var skills = [];
        for (var i = 0; i < options.length; i++) {
            if (options[i].selected) {
                skills.push(options[i].value);
            }
        }
        this.setState({ candidateSkills: skills });
    }
    handleSubmit() {
        event.preventDefault();
        fetch(config_1.config.apiBaseUrl + "/candidates", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                FirstName: this.state.candidateFirstName,
                LastName: this.state.candidateLastName,
                Skills: this.state.candidateSkills
            })
        }).then(response => {
            console.log(response.json());
            if (response.status == 200) {
                alert("Candidate profile created");
            }
        }).catch(error => {
            console.log(error);
            alert("Failed to create candidate");
        });
    }
    render() {
        return (React.createElement("div", { className: "container" },
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "firstname" },
                        "Firstname:",
                        React.createElement("input", { required: true, className: "form-control", id: "firstname", type: "text", onChange: e => this.onFirstNameChange(e) }))),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "lastname" },
                        "Lastname:",
                        React.createElement("input", { required: true, className: "form-control", id: "lastname", type: "text", onChange: e => this.onLastNameChange(e) }))),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "skills" },
                        "Skills:",
                        React.createElement("select", { multiple: true, className: "form-control", id: "skills", onChange: e => this.onSkillsChange(e) }, this.props.skillList.map(skill => React.createElement("option", { key: skill, value: skill }, skill))))),
                React.createElement("input", { className: "btn btn-primary", type: "submit", value: "Submit" }))));
    }
}
exports.CandidateRegistrationForm = CandidateRegistrationForm;
//# sourceMappingURL=candidate-registration-form.js.map