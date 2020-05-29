import React from "react";
import Child from "shared/components/Child/Child";
import Row from "shared/components/Row/Row";
import GitHubIcon from '@material-ui/icons/GitHub';
import { Button } from "@material-ui/core";
import ViewWrapper from "shared/components/ViewWrapper";

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
    <ViewWrapper showCopyright={true}>
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
    </ViewWrapper>
  );
};

export default About;
