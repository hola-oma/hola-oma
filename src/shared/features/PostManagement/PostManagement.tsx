import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Container, Card, CardMedia, CardContent, Typography, CardHeader, Avatar, CardActions, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Post } from 'shared/models/post.model';

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
}

const PostManagement: React.FC<IPostManagement> = ({ displayName, posts }) => {
  const classes = useStyles();
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
                        {post.totalReplyCount === 1 ? '1 reply': post.totalReplyCount + ' replies'}
                      </Typography>

                      {/* if there are NEW REPLIES, show this messaging */}
                      {(post?.unreadReplyCount ?? 0) > 0 && 
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