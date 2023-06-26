import React, { useState, useEffect, useCallback } from "react";
import { Button, Card, Input, Form } from "antd";
import { useDispatch } from "react-redux";
import { SIGNUP_REQUEST } from "../reducer";
import styled from "styled-components";

const FormWrapper = styled.div`
    margin-left: 100px;

    display: flex;
    flex-direction: column;

    margin-top: 100px;

    .input {
        margin-bottom: 30px;
        width: 800px;
        height: 40px;
    }
    .button {
        width: 300px;
        margin-left: 250px;
    }
`;

const SignUp = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, []);
    const onChangeNickname = useCallback((e) => {
        setNickname(e.target.value);
    }, []);
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const onSubmit = useCallback(() => {
        dispatch({
            type: SIGNUP_REQUEST,
            data: {
                email,
                password,
                nickname,
            },
        });
    }, [email, nickname, password]);

    return (
        <div>
            <Form onFinish={onSubmit}>
                <FormWrapper>
                    <Input
                        className="input"
                        value={email}
                        type="email"
                        placeholder="이메일입력"
                        onChange={onChangeEmail}
                    />
                    <Input
                        className="input"
                        value={nickname}
                        placeholder="닉네임 입력"
                        onChange={onChangeNickname}
                    />
                    <Input
                        className="input"
                        value={password}
                        placeholder="비밀번호 입력"
                        type="password"
                        onChange={onChangePassword}
                    />
                    <Button className="button" type="primary" htmlType="submit">
                        회원가입
                    </Button>
                </FormWrapper>
            </Form>
        </div>
    );
};

export default SignUp;
