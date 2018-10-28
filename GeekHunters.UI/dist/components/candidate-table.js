"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class CandidateTable extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "container" },
            React.createElement("div", { style: { padding: 10 } },
                React.createElement("view", { style: { padding: 10 } },
                    React.createElement("button", { className: "btn btn-primary filter-button" }, "All")),
                React.createElement("view", { style: { padding: 10 } },
                    React.createElement("button", { className: "btn btn-default filter-button" }, ".NET")),
                React.createElement("view", { style: { padding: 10 } },
                    React.createElement("button", { className: "btn btn-default filter-button" }, "SQL"))),
            React.createElement("table", { className: "table" },
                React.createElement("tr", null,
                    React.createElement("th", null, "Firstname"),
                    React.createElement("th", null, "Lastname"),
                    React.createElement("th", null, "Skills")),
                React.createElement("tr", null,
                    React.createElement("td", null, "Kai"),
                    React.createElement("td", null, "Sun"),
                    React.createElement("td", null, ".NET, SQL")))));
    }
}
exports.CandidateTable = CandidateTable;
//# sourceMappingURL=candidate-table.js.map