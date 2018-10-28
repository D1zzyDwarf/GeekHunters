"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_tabs_1 = require("react-tabs");
const candidate_registration_form_1 = require("./candidate-registration-form");
const candidate_table_1 = require("./candidate-table");
require("react-tabs/style/react-tabs.css");
class CandidateTabs extends React.Component {
    render() {
        return (React.createElement(react_tabs_1.Tabs, null,
            React.createElement(react_tabs_1.TabList, null,
                React.createElement(react_tabs_1.Tab, null, "Search Candidates"),
                React.createElement(react_tabs_1.Tab, null, "New Candidate")),
            React.createElement(react_tabs_1.TabPanel, null,
                React.createElement(candidate_table_1.CandidateTable, null)),
            React.createElement(react_tabs_1.TabPanel, null,
                React.createElement(candidate_registration_form_1.CandidateRegistrationForm, null))));
    }
}
exports.default = CandidateTabs;
//# sourceMappingURL=candidate-tabs.js.map