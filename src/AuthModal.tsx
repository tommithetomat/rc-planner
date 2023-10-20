import React, { useState, ChangeEvent } from "react";
import { Button } from "./components/Buttons";
import { Input, InputProps } from "./components/InputComp";
import { checkUserByEmail, registerUser, loginUser } from "./requests";
import info from "./img/Info.png";

interface AuthModalProps {
  onClose: () => void;
}

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

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(false); 
  const [step, setStep] = useState(1);

  const validatePassword = (value: string) => {
    const passwordRegex = /^[A-Za-z0-9.,:;?!*+%<>\[\]{}\\_{}$#@\-]{8,32}$/;
    return passwordRegex.test(value);
  };

  const handleNextStep = async () => {
    const parts = email.split("@");

    if (parts.length === 2) {
      const domain = parts[1].toLowerCase();
      if (validDomains.includes(domain)) {
        setError(null);
      } else {
        setError("Недопустимый домен электронной почты.");
        return;
      }
    } else {
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
    } catch (error) {
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
    } catch (error) {
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

      const formattedUsername =
        username.charAt(0).toUpperCase() + username.slice(1);

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
    } catch (error) {
      console.error("Ошибка регистрации пользователя:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`bg-white flex flex-col p-4 rounded-[4rem] ${
          step === 1 || step === 2
            ? "h-[31.875rem] w-[37.5rem]"
            : "h-[38.625rem] w-[44.375rem]"
        }  relative justify-center items-center gap-10`}
      >
        <button
          className="absolute top-10 right-10 text-[22px] leading-none text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &#10006;
        </button>
        <h2 className="text-[2.25rem] font-semibold text-center font-redcollar">
          {step === 1
            ? "Вход"
            : step === 2
            ? "Ввод пароля"
            : "Регистрация"}
        </h2>
        {step === 1 && (
          <>
            <Input
              label="E-mail"
              value={email.toLocaleLowerCase()}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              error={error}
              placeholder="Enter email"
              typeOf="password"
              width={"w-[21.265rem]"}
            />
            <div className="flex justify-center">
              <Button
                color="black"
                label={"Далее"}
                onClick={handleNextStep}
                width={"w-[21.265rem]"}
                padding={"py-[1.3125rem] px-[2rem]"}
              />
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <Input
              label={"Пароль"}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              type="password"
              placeholder="Введите пароль"
              typeOf="password"
              width={"w-[21.265rem]"}
              showhide={true}
              right={"right-36"}
            />
            <div className="flex justify-center">
              <Button
                color="black"
                label={"Войти"}
                onClick={handleLogin}
                width={"w-[21.265rem]"}
              />
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="flex items-center flex-col justify-center mt-4">
              <div className="h-10 px-3 py-2 bg-neutral-50 w-[32.5rem] rounded-xl items-center gap-2 inline-flex">
                <img src={info} alt="info" />
                <p className="text-[0.875rem]">
                  {'В пароле используйте от 8 до 32 символов: строчные и прописные латинские буквы (A-z), цифры (0-9) и спец символы ( . , : ; ? ! * + % - < > @ [ ] { } / \ _ {} $ # )'}
                </p>
              </div>
            </div>
            <Input
              label="Имя"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              placeholder="Введите ваше имя"
              error={error}
              maxLength={20}
              typeOf="password"
              width={"w-[21.265rem]"}
            />
            <Input
              label="Пароль"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              type="password"
              placeholder="Введите пароль"
              error={error}
              typeOf="password"
              width={"w-[21.265rem]"}
              showhide={true}
            />
            <Input
              label="Повторите пароль"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              type="password"
              placeholder="Повторите пароль"
              error={error}
              typeOf="password"
              width={"w-[21.265rem]"}
              showhide={true}
            />
            <div className="flex justify-center">
              <Button
                color={username && password && confirmPassword ? "black" : "gray"}
                label={"Зарегистрироваться"}
                onClick={handleRegistrationStep}
                width={"w-[21.265rem]"}
                padding={"py-[1.3125rem] px-[2rem]"}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
