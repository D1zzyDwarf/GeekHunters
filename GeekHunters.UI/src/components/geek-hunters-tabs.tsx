import * as React from "react";
import { Tab, TabList, Tabs, TabPanel } from "react-tabs";
import { CandidateRegistrationForm } from "./candidate-registration-form";
import { CandidateTable } from "./candidate-table";
import { config } from "../../config";
import 'react-tabs/style/react-tabs.css';

interface IGeekHuntersTabsState {
    skillList: string[];
}

export default class GeekHuntersTabs extends React.Component<any, IGeekHuntersTabsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            skillList: null
        };
    }

    componentWillMount() {
        fetch(config.apiBaseUrl + "/skills", {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then(response =>
            response.json()
        ).then(skills =>
            this.setState({ skillList: skills })
        );
    }

    render() {
        if (!this.state.skillList) {
            return <div>loading...</div>
        }
        return (
            <Tabs>
                <TabList>
                    <Tab>Search Candidates</Tab>
                    <Tab>New Candidate</Tab>
                </TabList>
                <TabPanel>
                    <CandidateTable skillList={this.state.skillList} />
                </TabPanel>
                <TabPanel>
                    <CandidateRegistrationForm skillList={this.state.skillList} />
                </TabPanel>
            </Tabs>
        );
    }
}