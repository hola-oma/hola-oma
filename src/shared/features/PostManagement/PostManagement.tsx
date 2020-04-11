import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Container, Grid, Card, CardHeader, CardContent, Typography, Box } from '@material-ui/core';
import Alarm from '@material-ui/icons/Alarm';
import { Link } from 'react-router-dom';

import { Post } from 'shared/models/post.model';

import './PostManagement.css';

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

interface IPostManagement {
  // add posts as Post model here
  // For now, I made it a number to show how you might loop through a quantity of things passed in
  posts: Array<Post>; // array of type "Post"
}

// todo: pass "Posts" into this functional component
const PostManagement: React.FC<IPostManagement> = ({ posts }) => {

  const classes = useStyles();

  return (
    <Container>
      <Container>
          {/* Todo: Make CreatePost page */}
          <Link to={"/newPost"}>
            <Card>
                <CardContent>
                    Make a new post
                </CardContent>
            </Card>
          </Link>
      </Container>
      <Grid container>
        {
          posts.map((post: Post, index: number) => {
            return (
              <div className={"postCard"}>
                <Link to={"/postDetails"}>
                <Card className={classes.root} variant="outlined">

                  <CardHeader
                      title={post.message}>
                  </CardHeader>

                  <CardContent>
                      <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">
                                Sent message
                                <br/>
                                {post.timestamp}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Alarm className="icon"/>
                            <Typography variant="subtitle2">
                                New replies!
                            </Typography>
                        </Grid>
                      </Grid>
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

export default PostManagement;