import React from 'react';

import { Container, Typography } from '@material-ui/core';

import { Reply } from "../../models/reply.model";
import { replyEmojiArray } from "../../../Icons";

import './FamilyMsgView.css';

interface IReply {
    reply: Reply;
  }

const ModalReply: React.FC<IReply> = ({reply}) => {

    const emojiIcons = replyEmojiArray();

    const messageAsArray = (reply: Reply) => {
        return reply.message as number[];
    }

    const messageAsString = (reply: Reply) => {
        return reply.message as string;
    }
    
    const isEmoji = (reply: Reply) => {
        return (reply.replyType === "emoji" && typeof reply.message !== "string");
    }

    const isMessage = (reply: Reply) => {
        return (reply.replyType === "voice" && typeof reply.message[0] === "string");
    }

    if (isEmoji(reply)) {
        return (
            <>
                {
                    messageAsArray(reply).map((emojiIndex: number, replyIndex: number) => {
                        return (
                            <Container key={replyIndex}>
                                {emojiIcons[emojiIndex]}
                            </Container>
                        )
                    })
                }
            </>
        )
    } else if (isMessage(reply)) {
        return (
            <Container className="wrapReply">
                <Typography variant="h5">
                    {reply.message}
                </Typography>
            </Container>
        )
    } else {
        return (
            <img
                src={messageAsString(reply)}
                className="modalPhoto"
                alt="Reply img"
            />
        )
    }
};

export default ModalReply;