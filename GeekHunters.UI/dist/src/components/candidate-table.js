"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const config_1 = require("../../config");
const candidate_table_filter_1 = require("./candidate-table-filter");
require("bootstrap/dist/css/bootstrap.min.css");
class CandidateTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: null
        };
        props.skillList.unshift("All");
        this.onSkillsChange = this.onSkillsChange.bind(this);
    }
    componentWillMount() {
        fetch(config_1.config.apiBaseUrl + "/candidates", {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then(response => response.json()).then(candidates => this.setState({ candidates: candidates }));
    }
    onSkillsChange(skills) {
        if (skills.indexOf("All") != -1) {
            fetch(config_1.config.apiBaseUrl + "/candidates", {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            }).then(response => response.json()).then(candidates => this.setState({ candidates: candidates }));
        }
        else {
            if (skills.length === 0) {
                this.setState({ candidates: [] });
                return;
            }
            let encodedSkills = skills.map(s => encodeURI(s).replace(/#/g, '%23'));
            let queryParams = "skills=";
            queryParams += encodedSkills.join("&skills=");
            console.log(queryParams);
            fetch(config_1.config.apiBaseUrl + "/candidates?" + queryParams, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            }).then(response => response.json()).then(candidates => this.setState({ candidates: candidates }));
        }
    }
    render() {
        if (!this.state.candidates) {
            return React.createElement("div", { className: "container" }, "loading");
        }
        return (React.createElement("div", { className: "container" },
            React.createElement(candidate_table_filter_1.CandidateTableFilter, { selectedSkills: ["All"], skillList: this.props.skillList, onSkillsChange: this.onSkillsChange }),
            React.createElement("table", { className: "table" },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Firstname"),
                        React.createElement("th", null, "Lastname"),
                        React.createElement("th", null, "Skills")),
                    this.state.candidates.map(candidate => React.createElement("tr", null,
                        React.createElement("td", null, candidate.firstName),
                        React.createElement("td", null, candidate.lastName),
                        React.createElement("td", null, candidate.skills.join(", "))))))));
    }
}
exports.CandidateTable = CandidateTable;
//# sourceMappingURL=candidate-table.js.map