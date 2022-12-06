import React, { useState, useEffect, useCallback } from "react";
import { Text, Password, Button } from "../form/Forms";

function LoginModal(props) {
  const { visible, changeVisibility } = props;
  const [visibility, setVisibility] = useState("");

  const changeSelfVisibility = useCallback(() => {
    changeVisibility((prevState) => !prevState);
  });

  useEffect(() => {
    setVisibility(visible ? "" : "hidden");
  }, [visible]);

  return (
    <div
      className={` ${visibility} fixed w-[100vw] h-[100vh] bg-slate-600 bg-opacity-90 flex flex-grow items-center justify-center`}
    >
      <div className="container lg:w-[40vw] w-[90vw] bg-white rounded-2xl shadow-2xl flex flex-wrap">
        <div
          className="self-start bg-gradient-to-b from-gray-300 to-gray-100 w-[100%] rounded-tl-xl rounded-tr-xl pl-4 flex justify-center p-4 text-teal-900
        font-bold text-xl"
        >
          <h2>Faça o seu login para continuar</h2>
        </div>
        <div className="self-center w-[100%] pl-4 m-2">
          <div className="grid grid-cols-1 gap-2">
            <div>
              <Text
                placeholder="Digite o seu e-mail"
                id="email"
                name="email"
                label="E-mail"
              />
            </div>
            <div>
              <Password
                placeholder="Digite a sua senha"
                id="senha"
                name="senha"
                label="Senha"
              />
            </div>
          </div>
        </div>
        <div className="self-end bg-gradient-to-b from-gray-100 to-gray-300 w-[100%] rounded-bl-xl rounded-br-xl pl-4 p-4 grid grid-cols-2 gap-2">
          <div className="flex justify-start">
            <Button
              id="login"
              label="Fazer Login"
              className="shadow-md bg-teal-600 text-white rounded-xl p-2 hover:bg-teal-800 transition ease-in-out duration-300"
            />
          </div>
          <div className="flex justify-end">
            <Button
              id="login"
              label="Cancelar login"
              action={changeSelfVisibility}
              className="shadow-md bg-gray-400 text-white rounded-xl p-2 hover:bg-gray-600 transition ease-in-out duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { LoginModal };
