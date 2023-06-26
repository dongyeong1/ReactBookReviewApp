import React, { useCallback, useState, useEffect } from "react";
import { Input, Button, Form, Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    ADD_POST_REQUEST,
    LOAD_MY_INFO_REQUEST,
    NAVER_LOGIN_REQUEST,
    REMOVE_POST_REQUEST,
} from "../../reducer";
import BookSearchFormModal from "../Modal/BookSearchFormModal";
import BookImageSelect from "../BookImageSelect";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import styled from "styled-components";
import { KAKAO_ACCESS_TOKEN, NAVER_ACCESS_TOKEN } from "../LoginToken";

const FormItem = styled(Form.Item)`
    label {
        font-size: 20px;
    }
`;

const ReviewWrapper = styled.div`
    display: flex;
`;

// style={{ border:0,  width:400}}
const ContentWrapper = styled.div`
    .textArea {
        border: 0px;
        margin-top: 20px;
        width: 400px;
        height: 150px;
    }

    margin-left: 50px;
    margin-top: 70px;
    .ant-input {
        border: 0px;
        width: 400px;
    }
    .ant-rate {
        margin-top: 5px;
        margin-right: 270px;
    }
    .ant-btn {
        border-radius: 100px;
        margin-left: 150px;
    }
`;
const TextArea = styled(Input.TextArea)``;

const PostForm = ({ reviewSetModal }) => {
    const { post, user } = useSelector((state) => state);
    const [searchedBook, setSearchedBook] = useState(null);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [rate, setRate] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (post && post.id) {
            successModals();
        }
    }, [post]);

    const [modal, setModal] = useState(false);
    const onChangeText = useCallback(
        (e) => {
            setText(e.target.value);
        },
        [text]
    );

    const onChangeTitle = useCallback(
        (e) => {
            setTitle(e.target.value);
        },
        [title]
    );

    const onChangeRate = useCallback(
        (e) => {
            setRate(e);
        },
        [rate]
    );

    const showModal = useCallback(() => {
        setModal(true);
    }, [modal]);

    useEffect(() => {
        if (sessionStorage.getItem(NAVER_ACCESS_TOKEN)) {
            dispatch({
                type: NAVER_LOGIN_REQUEST,
            });
        } else if (sessionStorage.getItem(KAKAO_ACCESS_TOKEN)) {
            dispatch({
                type: NAVER_LOGIN_REQUEST,
            });
        } else {
            dispatch({
                type: LOAD_MY_INFO_REQUEST,
            });
        }
    }, []);

    const submitText = useCallback(() => {
        dispatch({
            type: ADD_POST_REQUEST,
            data: {
                userId: user.id,
                title,
                text,
                rate,
                isbn: searchedBook.isbn,
                image: searchedBook.image,
                bookname: searchedBook.title,
            },
        });
    }, [text, searchedBook, title, rate]);

    const successModals = () => {
        Modal.success({
            content: "독후감 등록완료",
            onOk() {
                dispatch({
                    type: REMOVE_POST_REQUEST,
                });
                reviewSetModal(false);
            },
        });
    };

    return (
        <div>
            <Form layout="vertical" onFinish={submitText}>
                <ReviewWrapper>
                    <div>
                        <BookImageSelect
                            searchedBook={searchedBook}
                            showModal={showModal}
                        ></BookImageSelect>
                    </div>

                    <ContentWrapper>
                        <FormItem label="제목" required>
                            <Input
                                value={title}
                                onChange={onChangeTitle}
                                placeholder="제목을 입력해주세요"
                            ></Input>
                        </FormItem>
                        <FormItem label="평점" required>
                            <Rate onChange={onChangeRate} value={rate}></Rate>
                        </FormItem>
                        <FormItem label="내용" required>
                            <Input.TextArea
                                className="textArea"
                                value={text}
                                placeholder="내용을 입력해주세요"
                                onChange={onChangeText}
                            ></Input.TextArea>
                        </FormItem>
                        <Button size="large" type="primary" htmlType="submit">
                            등록하기
                        </Button>
                    </ContentWrapper>
                </ReviewWrapper>
            </Form>
            <BookSearchFormModal
                setModal={setModal}
                modal={modal}
                setSearchedBook={setSearchedBook}
            ></BookSearchFormModal>
        </div>
    );
};

export default PostForm;
