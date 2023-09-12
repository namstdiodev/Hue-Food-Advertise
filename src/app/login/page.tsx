"use client"
import React from "react"
import useLogin, { Props} from "./hook"
import { ReceivedProps } from "./type"
const LoginPageLayout = (props: Props) => {
    return (
        <div>
            <p>12121212</p>
        </div>
    )
}

const Login = (props: ReceivedProps) => {
    return <LoginPageLayout {...useLogin(props)}/>
}