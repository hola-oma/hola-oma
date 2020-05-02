import React from "react";
import { SvgIconProps } from "@material-ui/core";

import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CakeIcon from "@material-ui/icons/Cake";
import HealingIcon from "@material-ui/icons/Healing";

export const emojiArray = (): Array<React.ReactElement<SvgIconProps>> => {
  return [
    <InsertEmoticonIcon/>,
    <ThumbUpIcon/>,
    <SentimentVeryDissatisfiedIcon/>,
    <FavoriteIcon/>,
    <CakeIcon/>,
    <HealingIcon/>
  ];
}
