import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Container, Card, CardMedia, CardContent, Typography, CardHeader, Avatar, CardActions, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Post } from 'shared/models/post.model';
import { getRepliesToPost } from "services/reply";

import AlarmIcon from '@material-ui/icons/Alarm';
import CommentIcon from '@material-ui/icons/Comment';

import Moment from 'react-moment';

import './PostManagement.css';
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

  useEffect(() => {
    let numNewReplies = 0;
    for (let i = 0; i < posts.length; i++) {
      // eslint-disable-next-line no-loop-func
      getRepliesToPost(posts[i].pid).then((replyArray: any) => {
        let newRep = false;
        for (let j = 0; j < replyArray.length; j++) {
          if (replyArray[j].read === false) {
            newRep = true;
            numNewReplies++;
          }
        }
        setNewReplies(newReplies => newReplies.concat(newRep));
        onNewReplies(numNewReplies);
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

  const renderPostTitle = (post: Post) => {
    if (post.receiverIDs.length === 1) {
      return <span>You shared this with {post.receiverIDs.length} recipients.</span>
    } else if (post.receiverIDs.length > 1) {
      return <span>You shared this with one recipient.</span>
    } else {
      // todo: [stretch] add a link to "Invite Follower" page
      return <span>You are not sharing your posts with anyone yet!<Link to="/addAccountLink">Invite followers</Link></span>;
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

        {
          posts.map((post: Post, index: number) => {
            return (
              <Child xs={12} key={index}>
                <div className="postStyle">
                  <Link to={{
                    pathname: "/postDetails",
                    state: {post: post}
                  }}>
                  <Card variant="outlined" className="postStyle">
                    <CardHeader 
                        avatar={<Avatar>{firstLetterOfName()}</Avatar>}
                        title={renderPostTitle(post)}
                        subheader={<Moment format="MMMM Do, YYYY">{post.date}</Moment>}
                      />
                    {post.photoURL && 
                      <CardMedia
                        className={classes.media}
                        image={post.photoURL}
                        title={"Photo shared on " + post.date}
                      />
                    }
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {'\"' + getMessageSubstring(post.message) + '\"'}
                      </Typography>
                    </CardContent>

                    <CardActions>
                      {/* todo: if ANY replies exist, show this icon with a number */}
                      {/* I don't think the quantity of replies is on a post yet, and 
                      if it never will be then let's just remove this */}
                      <IconButton>
                        <CommentIcon color="secondary"/>
                      </IconButton>
                      <Typography variant="caption" color="textSecondary">N replies</Typography>

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