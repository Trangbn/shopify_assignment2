import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {authStorage} from "../storage/auth-storage";
import {Box, Modal} from "@mui/material";
import {login, register} from "../service/auth";
import {toast} from "react-toastify";

type ModalLoginOrRegisterProps = {
    isOpen: boolean;
    onClose: () => void;
}

export const style = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
};
export default function ModalLoginOrRegister({onClose, isOpen}: ModalLoginOrRegisterProps) {

    const [data, setData] = useState({
        email: "",
        pass: "",
        passConfirm: ""

    });
    const [isLoading, setIsLoading] = useState(false)
    const [isLoginForm, setIsLoginForm] = useState(true)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(pre => ({
            ...pre,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = () => {
        if (isLoginForm){
            setIsLoading(true)
            login({password: data.pass, email: data.email})
                .then((res: any) => {
                    if (res?.result?.access_token) {
                        authStorage.set(res?.result?.access_token)
                        window.location.reload()
                    } else {
                        toast.error(res?.message)
                    }
                })
                .finally(() => {
                    setIsLoading(false)
                })
        } else {
            register({password: data.pass, email: data.email})
                .then((res) => {
                    if (res?.type === "success"){
                        setIsLoginForm(true)
                        toast.success("Register successful!")
                    } else {
                        console.log()
                        toast.error(typeof res.message === "string" ? res.message : res.message[0])
                    }
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }

    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="bg-white flex flex-col items-center rounded-xl absolute top-50 ">
                <Form className="align-items-center d-flex flex-col">
                    <div className="mb-5 text-black">
                        {isLoginForm ? "Login" : "Signup"}
                    </div>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={data?.email} onChange={handleChange} name="email"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={data?.pass} onChange={handleChange} name="pass"/>
                    </Form.Group>
                    {
                        !isLoginForm && (
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Repassword</Form.Label>
                                <Form.Control placeholder="Re-type password" value={data?.passConfirm} onChange={handleChange} type="password" name="passConfirm"/>
                            </Form.Group>
                        )
                    }
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={isLoading || (!isLoginForm && data.passConfirm !== data.pass) || (isLoginForm && (!data.pass || !data.email))}
                    >
                        Submit
                    </Button>
                    <div className="mt-3">
                        {isLoginForm ? "Don't have an account ?" : "Already have an account?"}
                        <span className="cursor-pointer ml-1 text-primary" onClick={() => setIsLoginForm(prev => !prev)}>
                            {!isLoginForm ? "Login" : "Signup now"}
                        </span>
                    </div>
                </Form>
            </Box>
        </Modal>
    )
}
