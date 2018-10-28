"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_tabs_1 = require("react-tabs");
require("react-tabs/style/react-tabs.css");
class CustomTabs extends React.Component {
    render() {
        return (React.createElement(react_tabs_1.Tabs, null,
            React.createElement(react_tabs_1.TabList, null,
                React.createElement(react_tabs_1.Tab, null, "Search Candidates"),
                React.createElement(react_tabs_1.Tab, null, "New Candidate")),
            React.createElement(react_tabs_1.TabPanel, null,
                React.createElement("h2", null, "Search Candidates")),
            React.createElement(react_tabs_1.TabPanel, null,
                React.createElement("h2", null, "New Candidate"))));
    }
}
exports.default = CustomTabs;
//# sourceMappingURL=custom-tabs.js.map