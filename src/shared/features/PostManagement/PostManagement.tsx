import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Container, Grid, Card, CardMedia, Typography } from '@material-ui/core';
import Alarm from '@material-ui/icons/Alarm';
import { Link } from 'react-router-dom';

import { Post } from 'shared/models/post.model';
import { getRepliesToPost } from "services/reply";

import Moment from 'react-moment';

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
  media: {
    height: '140px'
  },
  postStyle: {
    height: "100%"
  },
  postBottom: {
    maxHeight: 90
  }
});

interface IPostManagement {
  // add posts as Post model here
  // For now, I made it a number to show how you might loop through a quantity of things passed in
  posts: Array<Post>; // array of type "Post"
}

// todo: pass "Posts" into this functional component
const PostManagement: React.FC<IPostManagement> = ({ posts }) => {

  const classes = useStyles();
  const [newReplies, setNewReplies] = useState<boolean[]>([]);

  useEffect(() => {
    for (let i = 0; i < posts.length; i++) {
      getRepliesToPost(posts[i].pid).then((replyArray: any) => {
        let newRep = false;
        for (let j = 0; j < replyArray.length; j++) {
          if (replyArray[j].read === false) {
            newRep = true;
            break;
          }
        }
        setNewReplies(newReplies => newReplies.concat(newRep));
      });
    }
}, []); // fires on page load if this is empty [] 

  const getMessageSubstring = function(message: string) {
    if (message.length > 100) {
      return (message.substring(0, 100) + "...");
    } else {
      return message;
    }
  }

  return (
    <Container>
      <Typography component="h2" variant="h5">
        Posts
      </Typography>

      <Grid container spacing={2}>
        {
          posts.map((post: Post, index: number) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <div className={"postStyle"}>
                  <Link to={{
                    pathname: "/postDetails",
                    state: {post: post}
                  }}>
                  <Card variant="outlined" className={"postStyle"}>
                    <Grid container direction={"column"} justify={"space-between"} className={"postStyle"}>
                      
                      {post.photoURL && <Grid item>
                        <CardMedia
                          component="img"
                          className={classes.media}
                          image={post.photoURL}
                        />
                      </Grid>}

                      <Grid item>
                          <Typography variant="h5">
                            {getMessageSubstring(post.message)}
                          </Typography>
                      </Grid>

                      <Grid item className={classes.postBottom}>
                          <Grid container justify={"space-between"}>
                            <Grid item xs={5}>
                                <Typography variant="subtitle2">
                                    Sent message
                                    <br/>
                                    <Moment format="MMMM Do YYYY">{post.date}</Moment>
                                </Typography>
                            </Grid>
                            {newReplies[index] === true &&
                              <Grid item xs={5}>
                                <Alarm className="icon"/>
                                <Typography variant="subtitle2">
                                  New replies!
                                </Typography>
                              </Grid>
                            }
                          </Grid>
                      </Grid>
                    </Grid>
                  </Card>

                </Link>
                </div>
              </Grid>
            )
          })
        }
      </Grid>
    </Container>
  )
}

export default PostManagement;