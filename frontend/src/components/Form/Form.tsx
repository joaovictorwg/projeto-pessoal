import React from "react";
import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import "./Form.css";

interface FormProps {
    route: string;
    method: "login" | "register";
}

function Form({route, method}: FormProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, {
                username,
                password
            })
            if (method === "login") {
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                console.log('navigating to /')
                navigate("/")
            }
            else {
                alert("User created")
                navigate("/login")
            }
        }
        catch (error) {
            alert(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input className="form-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input className="form-input"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="form-button" type="submit">{name}</button>
            
        </form>
    )
}

export default Form