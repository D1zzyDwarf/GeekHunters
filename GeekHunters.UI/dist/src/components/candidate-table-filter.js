"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class CandidateTableFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSkills: props.selectedSkills,
        };
        this.onSkillsChange = props.onSkillsChange.bind(this);
    }
    onButtonClick(e) {
        let button = event.target.value;
        let newSelected = this.state.selectedSkills;
        if (button === "All") {
            newSelected = ["All"];
        }
        else if (newSelected.indexOf(button) != -1) {
            newSelected.splice(this.state.selectedSkills.indexOf(button), 1);
        }
        else {
            if (newSelected.indexOf("All") != -1) {
                newSelected.splice(this.state.selectedSkills.indexOf("All"), 1);
            }
            newSelected.push(button);
            if (this.props.skillList.length === newSelected.length + 1) {
                newSelected = ["All"];
            }
        }
        this.setState({ selectedSkills: newSelected });
        this.onSkillsChange(newSelected);
    }
    render() {
        return (React.createElement("div", { style: { padding: 10 }, className: "btn-group" }, this.props.skillList.map(skill => React.createElement("span", { style: { padding: 10 } },
            React.createElement("button", { className: this.state.selectedSkills.indexOf(skill) != -1 ? "btn btn-primary filter-button" : "btn btn-default filter-button", value: skill, onClick: e => this.onButtonClick(e) }, skill)))));
    }
}
exports.CandidateTableFilter = CandidateTableFilter;
//# sourceMappingURL=candidate-table-filter.js.map