import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Container, Grid, Card, CardHeader, CardActions, CardContent } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Link } from 'react-router-dom';

import { Post } from 'shared/models/post.model';

import './Inbox.css';

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    maxWidth: 250
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
});

interface IInbox {
  // add posts as Post model here
  // For now, I made it a number to show how you might loop through a quantity of things passed in
  posts: Array<Post>; // array of type "Post"
}

// todo: pass "Posts" into this functional component
const Inbox: React.FC<IInbox> = ({ posts }) => {

  const classes = useStyles();

  return (
    <Container>
      <Grid container>
        {/* Todo: loop through passed-in posts to build inbox item for each one */}
        {
          posts.map((post: Post, index: number) => {
            // @ts-ignore
            return (
              <div className={"inboxCard"}>
                <Link to={"/settings"}>
                <Card className={classes.root} variant="outlined">

                  {/* Doesn't have to be a card, just something I put in to get it started */}
                  <CardHeader
                      title={post.from}>
                  </CardHeader>

                  <CardContent>
                    {post.read? <DraftsIcon className="icon"/> : <MailIcon className="icon"/>}
                  </CardContent>
                </Card>

              </Link>
              </div>
            )
          })
        }
      </Grid>
    </Container>
  )
}

export default Inbox;