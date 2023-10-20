import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "./components/Buttons";
import { Input } from "./components/InputComp";
import { checkUserByEmail, registerUser, loginUser } from "./requests";
import info from "./img/Info.png";
const validDomains = [
    "gmail.com",
    "mail.ru",
    "yahoo.com",
    "hotmail.com",
    "yandex.ru",
    "rambler.ru",
    "qip.ru",
    "msn.com",
    "live.com",
    "list.ru",
    "bk.ru",
    "inbox.ru",
];
export const AuthModal = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [step, setStep] = useState(1);
    const validatePassword = (value) => {
        const passwordRegex = /^[A-Za-z0-9.,:;?!*+%<>\[\]{}\\_{}$#@\-]{8,32}$/;
        return passwordRegex.test(value);
    };
    const handleNextStep = async () => {
        const parts = email.split("@");
        if (parts.length === 2) {
            const domain = parts[1].toLowerCase();
            if (validDomains.includes(domain)) {
                setError(null);
            }
            else {
                setError("Недопустимый домен электронной почты.");
                return;
            }
        }
        else {
            setError("Неправильный формат адреса электронной почты.");
            return;
        }
        if (step !== 3 && !validatePassword(password)) {
            setError("Пароль не соответствует требованиям.");
            return;
        }
        try {
            const response = await checkUserByEmail(email);
            setIsRegistered(response.exists);
            setStep(2);
        }
        catch (error) {
            console.error("Ошибка проверки пользователя:", error);
            setStep(3);
        }
    };
    const handleLogin = async () => {
        try {
            const loginResponse = await loginUser(email, password);
            console.log("Пользователь успешно вошел:", loginResponse);
            localStorage.setItem("authToken", loginResponse.jwt);
            localStorage.setItem("userId", loginResponse.user.id);
            localStorage.setItem("isAuthenticated", "true");
            console.log("Voshel: " + loginResponse.user.id);
            onClose();
        }
        catch (error) {
            console.error("Ошибка входа пользователя:", error);
        }
    };
    const handleRegistrationStep = async () => {
        try {
            if (password !== confirmPassword) {
                setError("Пароль и подтверждение пароля не совпадают.");
                return;
            }
            if (!validatePassword(password)) {
                setError("Пароль не соответствует требованиям.");
                return;
            }
            const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);
            const userData = {
                username: formattedUsername,
                email,
                password,
            };
            const response = await registerUser(userData);
            setStep(1);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setUsername("");
            setIsRegistered(null);
            console.log("Пользователь успешно зарегистрирован:", response);
        }
        catch (error) {
            console.error("Ошибка регистрации пользователя:", error);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50", children: _jsxs("div", { className: `bg-white flex flex-col p-4 rounded-[4rem] ${step === 1 || step === 2
                ? "h-[31.875rem] w-[37.5rem]"
                : "h-[38.625rem] w-[44.375rem]"}  relative justify-center items-center gap-10`, children: [_jsx("button", { className: "absolute top-10 right-10 text-[22px] leading-none text-gray-500 hover:text-gray-700", onClick: onClose, children: "\u2716" }), _jsx("h2", { className: "text-[2.25rem] font-semibold text-center font-redcollar", children: step === 1
                        ? "Вход"
                        : step === 2
                            ? "Ввод пароля"
                            : "Регистрация" }), step === 1 && (_jsxs(_Fragment, { children: [_jsx(Input, { label: "E-mail", value: email.toLocaleLowerCase(), onChange: (e) => setEmail(e.target.value), error: error, placeholder: "Enter email", typeOf: "password", width: "w-[21.265rem]" }), _jsx("div", { className: "flex justify-center", children: _jsx(Button, { color: "black", label: "Далее", onClick: handleNextStep, width: "w-[21.265rem]", padding: "py-[1.3125rem] px-[2rem]" }) })] })), step === 2 && (_jsxs(_Fragment, { children: [_jsx(Input, { label: "Пароль", value: password, onChange: (e) => setPassword(e.target.value), type: "password", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C", typeOf: "password", width: "w-[21.265rem]", showhide: true, right: "right-36" }), _jsx("div", { className: "flex justify-center", children: _jsx(Button, { color: "black", label: "Войти", onClick: handleLogin, width: "w-[21.265rem]" }) })] })), step === 3 && (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex items-center flex-col justify-center mt-4", children: _jsxs("div", { className: "h-10 px-3 py-2 bg-neutral-50 w-[32.5rem] rounded-xl items-center gap-2 inline-flex", children: [_jsx("img", { src: info, alt: "info" }), _jsx("p", { className: "text-[0.875rem]", children: 'В пароле используйте от 8 до 32 символов: строчные и прописные латинские буквы (A-z), цифры (0-9) и спец символы ( . , : ; ? ! * + % - < > @ [ ] { } / \ _ {} $ # )' })] }) }), _jsx(Input, { label: "\u0418\u043C\u044F", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0438\u043C\u044F", error: error, maxLength: 20, typeOf: "password", width: "w-[21.265rem]" }), _jsx(Input, { label: "\u041F\u0430\u0440\u043E\u043B\u044C", value: password, onChange: (e) => setPassword(e.target.value), type: "password", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C", error: error, typeOf: "password", width: "w-[21.265rem]", showhide: true }), _jsx(Input, { label: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), type: "password", placeholder: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C", error: error, typeOf: "password", width: "w-[21.265rem]", showhide: true }), _jsx("div", { className: "flex justify-center", children: _jsx(Button, { color: username && password && confirmPassword ? "black" : "gray", label: "Зарегистрироваться", onClick: handleRegistrationStep, width: "w-[21.265rem]", padding: "py-[1.3125rem] px-[2rem]" }) })] }))] }) }));
};
