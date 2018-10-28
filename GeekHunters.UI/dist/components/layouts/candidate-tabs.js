"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_tabs_1 = require("react-tabs");
class CandidateTabs extends React.Component {
    render() {
        return (React.createElement(react_tabs_1.Tabs, null,
            React.createElement(react_tabs_1.TabList, null,
                React.createElement(react_tabs_1.Tab, null, "Title 1"),
                React.createElement(react_tabs_1.Tab, null, "Title 2")),
            React.createElement(react_tabs_1.TabPanel, null,
                React.createElement("h2", null, "Any content 1")),
            React.createElement(react_tabs_1.TabPanel, null,
                React.createElement("h2", null, "Any content 2"))));
    }
}
exports.default = CandidateTabs;
//# sourceMappingURL=candidate-tabs.js.map