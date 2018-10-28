import * as React from "react";
import { config } from "../../config";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChangeEvent } from "react";

interface IComponentProps {
    skillList: Array<string>;
}

interface IComponentState {
    candidateFirstName: string;
    candidateLastName: string;
    candidateSkills: Array<string>;

}

export class CandidateRegistrationForm extends React.Component<IComponentProps, IComponentState> {
    constructor(props: IComponentProps) {
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

    onFirstNameChange(event: ChangeEvent) {
        this.setState({ candidateFirstName: (event.target as any).value });
    }

    onLastNameChange(event: ChangeEvent) {
        this.setState({ candidateLastName: (event.target as any).value });
    }

    onSkillsChange(event: ChangeEvent) {
        var options = (event.target as any).options;
        var skills: Array<any> = [];
        for (var i = 0; i < options.length; i++) {
            if (options[i].selected) {
                skills.push(options[i].value);
            }
        }
        this.setState({ candidateSkills: skills });
    }

    handleSubmit() {
        event.preventDefault();

        fetch(config.apiBaseUrl + "/candidates", {
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
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstname">
                            Firstname:
                            <input required className="form-control" id="firstname" type="text" onChange={e => this.onFirstNameChange(e)}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">
                            Lastname:
                            <input required className="form-control" id="lastname" type="text" onChange={e => this.onLastNameChange(e)}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="skills">
                            Skills:
                            <select multiple className="form-control" id="skills" onChange={e => this.onSkillsChange(e)}>
                                {this.props.skillList.map(skill =>
                                    <option key={skill} value={skill}>{skill}</option>)}
                            </select>
                        </label>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}