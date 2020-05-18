import React from "react";
import CredentialsWrapper from "shared/components/CredentialsWrapper";
import Child from "shared/components/Child/Child";
import Row from "shared/components/Row/Row";
import GitHubIcon from '@material-ui/icons/GitHub';
import { Button } from "@material-ui/core";

const About: React.FC = () => {

  const handleGitHubButtonClick = () => {
    window.location.href="https://github.com/hola-oma";
  }

  const gitHubButton = () => (
    <Button
      variant="outlined"
      color="primary"
      size="large"
      onClick={handleGitHubButtonClick}
      startIcon={<GitHubIcon />}
    >
      Project GitHub
    </Button>
  )

  return (
    <CredentialsWrapper>
      <Row justify="space-around">

            <Child xs={12} sm={8}>
              <span className="boldText">
                About
              </span>
              <p><i>Hola, Oma!</i> is a fictional social networking app developed for Capstone (CS 467) at Oregon State University.</p>
          
              <h3>Team members</h3>
              <ul>
                <li>Kristin Wood</li>
                <li>Mandi Burley</li>
                <li>Rebecca Taylor</li>
              </ul>
              
              {gitHubButton()}

            </Child>

      </Row>
    </CredentialsWrapper>
  );
};

export default About;
