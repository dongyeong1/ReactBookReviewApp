import React, { useCallback, useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../../reducer";
import styled from "styled-components";

const ButtonWrapper = styled(Button)`
    border-radius: 30px;
    margin-top: 5px;
    margin-left: 420px;
`;

const CommentForm = ({ bookpostId }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state);

    const [comment, setComment] = useState("");
    const onChangeComment = useCallback(
        (e) => {
            setComment(e.target.value);
        },
        [comment]
    );

    const onSubmit = () => {
        if (user) {
            dispatch({
                type: ADD_COMMENT_REQUEST,
                data: {
                    comment,
                    userId: user.id,
                    postId: bookpostId,
                },
            });
        } else {
            alert("로그인을 해주세요!");
        }
    };

    return (
        <Form onFinish={onSubmit}>
            <Input.TextArea
                value={comment}
                onChange={onChangeComment}
            ></Input.TextArea>
            <ButtonWrapper type="primary" htmlType="submit">
                댓글작성
            </ButtonWrapper>
        </Form>
    );
};

export default CommentForm;
