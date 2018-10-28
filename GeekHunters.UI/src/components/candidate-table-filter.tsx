﻿import * as React from "react";
import { MouseEvent } from "react";
import { config } from "../../config";
import "bootstrap/dist/css/bootstrap.min.css";

interface IComponentProps {
    skillList: string[];
    selectedSkills: string[];
    onSkillsChange: Function;
}

interface ICandidateTableFilterState {
    selectedSkills: string[],
}

export class CandidateTableFilter extends React.Component<IComponentProps, ICandidateTableFilterState> {

    onSkillsChange: Function;

    constructor(props: IComponentProps) {
        super(props);
        this.state = {
            selectedSkills: props.selectedSkills,
        };

        this.onSkillsChange = props.onSkillsChange.bind(this);
    }

    onButtonClick(e: MouseEvent) {
        let button = (event.target as any).value;
        let newSelected = this.state.selectedSkills;
        if(button === "All") {
            newSelected = ["All"]
        } else if (newSelected.indexOf(button) != -1) {
            newSelected.splice(this.state.selectedSkills.indexOf(button), 1);
        } else {
            if (newSelected.indexOf("All") != -1) {
                newSelected.splice(this.state.selectedSkills.indexOf("All"), 1);
            }
            newSelected.push(button);
            if (this.props.skillList.length === newSelected.length + 1) {
                newSelected = ["All"]
            }
        }
        this.setState({ selectedSkills: newSelected });
        this.onSkillsChange(newSelected);
    }

    render() {
        return (
            <div style={{ padding: 10 }} className="btn-group">
                {this.props.skillList.map(skill => <span style={{ padding: 10 }}><button className={this.state.selectedSkills.indexOf(skill) != -1 ? "btn btn-primary filter-button" : "btn btn-default filter-button"} value={skill} onClick={e => this.onButtonClick(e)}>{skill}</button></span>)}
            </div>
        );
    }
}