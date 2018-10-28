"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_tabs_1 = require("react-tabs");
const candidate_registration_form_1 = require("./candidate-registration-form");
const candidate_table_1 = require("./candidate-table");
const config_1 = require("../../config");
require("react-tabs/style/react-tabs.css");
class GeekHuntersTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skillList: null
        };
    }
    componentWillMount() {
        fetch(config_1.config.apiBaseUrl + "/skills", {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then(response => response.json()).then(skills => this.setState({ skillList: skills }));
    }
    render() {
        if (!this.state.skillList) {
            return React.createElement("div", null, "loading");
        }
        return (React.createElement(react_tabs_1.Tabs, null,
            React.createElement(react_tabs_1.TabList, null,
                React.createElement(react_tabs_1.Tab, null, "Search Candidates"),
                React.createElement(react_tabs_1.Tab, null, "New Candidate")),
            React.createElement(react_tabs_1.TabPanel, null,
                React.createElement(candidate_table_1.CandidateTable, { skillList: this.state.skillList })),
            React.createElement(react_tabs_1.TabPanel, null,
                React.createElement(candidate_registration_form_1.CandidateRegistrationForm, { skillList: this.state.skillList }))));
    }
}
exports.default = GeekHuntersTabs;
//# sourceMappingURL=geek-hunters-tabs.js.map