import React from "react";

import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import styles from './Login.module.css'

import Form from "../../components/forms/Form";
import Input from "../../components/forms/input/Input";
import Button from "../../components/common/Button";
import Title from "../../components/common/Title";

import { User, login as loginService } from "../../services/authService";

import { useAuth } from "../../contexts/AuthContext";


const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const initialValues: User = {
        email: "",
        password: "",
    };

    const validationSchema = yup.object().shape({
        email: yup.string()
            .email("E-mail inválido")
            .required("E-mail é obrigatório"),
        password: yup.string()
            .min(6, "A senha deve ter pelo menos 6 caracteres")
            .required("Senha obrigatória"),
    });

    const onSubmit = async (values: User) => {
        try {
            const user = await loginService(values);
            login(user);
            navigate("/");
        } catch (error) {
            alert("Erro ao realizar login");
        }
    };

    return (
        <div className={styles.loginWrapper}>
            <Form
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <>
                        <Title>MEU SITE PESSOAL</Title>

                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            errors={errors.email}
                            touched={touched.email}
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            errors={errors.password}
                            touched={touched.password}
                        />

                        <Button type="submit">Entrar</Button>
                    </>
                )}
            </Form>
        </div>
    );
}

export default Login;