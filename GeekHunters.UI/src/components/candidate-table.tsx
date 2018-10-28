import * as React from "react";
import { MouseEvent } from "react";
import { config } from "../../config";
import { CandidateTableFilter } from "./candidate-table-filter";
import "bootstrap/dist/css/bootstrap.min.css";

interface IComponentProps {
    skillList: Array<string>;
}

interface ICandidateTableState {
    candidates: Candidate[]
}

interface Candidate {
    firstName: string,
    lastName: string,
    skills: string[]
}

export class CandidateTable extends React.Component<IComponentProps, ICandidateTableState> {
    constructor(props: IComponentProps) {
        super(props);
        this.state = {
            candidates: null
        };

        this.onSkillsChange = this.onSkillsChange.bind(this);
    }

    componentWillMount() {
        fetch(config.apiBaseUrl + "/candidates", {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then(response =>
            response.json()
        ).then(candidates =>
            this.setState({ candidates: candidates })
        );
    }

    onSkillsChange(skills: string[]) {
        if (skills.indexOf("All") != -1) {
            fetch(config.apiBaseUrl + "/candidates", {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            }).then(response =>
                response.json()
            ).then(candidates =>
                this.setState({ candidates: candidates })
            );
        } else {
            if (skills.length ===0) {
                this.setState({ candidates: [] });
                return;
            }
            let encodedSkills = skills.map(s => encodeURI(s).replace(/#/g, '%23'));
            let queryParams = "skills=";
            queryParams += encodedSkills.join("&skills=");
            console.log(queryParams)
            fetch(config.apiBaseUrl + "/candidates?" + queryParams, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            }).then(response =>
                response.json()
            ).then(candidates =>
                this.setState({ candidates: candidates })
            );
        }
    }

    render() {
        if (!this.state.candidates) {
            return <div className="container">loading...</div>;
        }
        return (
            <div className="container">
                <CandidateTableFilter selectedSkills={["All"]} skillList={this.props.skillList} onSkillsChange={this.onSkillsChange} />
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Skills</th>
                        </tr>
                        {this.state.candidates.map(candidate =>
                            <tr>
                                <td>{candidate.firstName}</td>
                                <td>{candidate.lastName}</td>
                                <td>{candidate.skills.join(", ")}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}