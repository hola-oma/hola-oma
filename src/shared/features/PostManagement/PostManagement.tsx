import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Container, Card, CardMedia, CardContent, Typography, CardHeader, Avatar, CardActions, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Post } from 'shared/models/post.model';
import { getRepliesToPost } from "services/reply";

import AlarmIcon from '@material-ui/icons/Alarm';
import CommentIcon from '@material-ui/icons/Comment';

import Moment from 'react-moment';

import Child from 'shared/components/Child/Child';
import Column from 'shared/components/Column/Column';

const useStyles = makeStyles({
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
  displayName: String;
  posts: Array<Post>; // array of type "Post"
  onNewReplies: any;
}

const PostManagement: React.FC<IPostManagement> = ({ displayName, posts, onNewReplies }) => {

  const classes = useStyles();
  const [newReplies, setNewReplies] = useState<boolean[]>([]);
  const [numReplies, setNumReplies] = useState<number[]>([]);

  useEffect(() => {
    let isMounted = true;
    let numNewReplies = 0;

    for (let i = 0; i < posts.length; i++) {
    // eslint-disable-next-line no-loop-func
      getRepliesToPost(posts[i].pid).then((replyArray: any) => {
        if (isMounted) {
          let newRep = false;
          setNumReplies(numReplies => numReplies.concat(replyArray.length));
          for (let j = 0; j < replyArray.length; j++) {
            if (replyArray[j].read === false) {
              newRep = true;
              numNewReplies++;
            }
          }
          setNewReplies(newReplies => newReplies.concat(newRep));
          onNewReplies(numNewReplies);
        }
      });
    }

    return () => { isMounted = false; }
}, [onNewReplies, posts]); // fires on page load if this is empty [] 

  const getMessageSubstring = function(message: string) {
    let returnValue = "";
    if (message.trim().length !== 0) {
      returnValue += '"';
      if (message.length > 100) {
        returnValue += (message.substring(0, 100) + "...");
      } else {
        returnValue += message;
      }
      returnValue += '"';
    }
    return returnValue;
  }

  const renderPostTitle = (post: Post) => {
    if (post.receiverIDs.length === 0 || !post.receiverIDs) {
      return <span>You are not sharing your posts with anyone yet!<Link to="/addAccountLink">Invite followers</Link></span>;
    } else if (post.receiverIDs.length === 1) {
      return <span>You shared this with one recipient.</span>
    } else if (post.receiverIDs.length > 1) {
      return <span>You shared this with {post.receiverIDs.length} recipients.</span>
    }
  }

  const firstLetterOfName = () => {
    if (displayName.length > 0) {
      return displayName.charAt(0);
    } else {
      return ":)";
    }
  }

  return (
    <Container>
      <Column spacing={2}>
        <Child xs={12}>
          <Typography component="h2" variant="h5" align="center">
            Posts
          </Typography>

          {posts.length === 0 && <Typography>
            Your sent posts will appear here. Create a post to see!
          </Typography>}

        {
          posts.map((post: Post, index: number) => {
            return (
              <Child xs={12} key={index}>
                <div className={classes.postStyle}>
                  <Link to={{
                    pathname: "/postDetails",
                    state: {post: post}
                  }}>
                  <Card variant="outlined" className={classes.postStyle}>
                    <CardHeader 
                        avatar={<Avatar>{firstLetterOfName()}</Avatar>}
                        title={renderPostTitle(post)}
                        subheader={<Moment format="MMMM Do, YYYY">{post.date}</Moment>}
                      />
                    {post.photoURL && 
                      <CardMedia
                        className={classes.media}
                        image={post.photoURL}
                        title={"Photo shared"}
                      />
                    }
                    {post.videoURL && 
                      <CardMedia
                        className={classes.media}
                        image={post.videoURL}
                        title={"Video shared"}
                        component="video"
                      />
                    }
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {getMessageSubstring(post.message)}
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <IconButton>
                        <CommentIcon color="secondary"/>
                      </IconButton>
                      <Typography variant="caption" color="textSecondary">
                        {numReplies[index] === 1 ? (numReplies[index] + ' reply') : (numReplies[index] + ' replies')}
                      </Typography>

                      {/* if there are NEW REPLIES, show this messaging */}
                      {newReplies[index] && 
                        <span className="newAlert pullRight">
                          <Typography variant="caption">New replies!</Typography>
                          <IconButton>
                            <AlarmIcon />
                          </IconButton>
                        </span>
                      }
                    </CardActions>
                  </Card>

                </Link>
                </div>
              </Child>
            )
          })
        }
        </Child>
      </Column>
    </Container>
  )
}

export default PostManagement;