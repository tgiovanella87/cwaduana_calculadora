import React, { useState, useEffect, useCallback } from "react";
import { Text, Password, Button } from "../form/Forms";

function ResultModal(props) {
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
      <div className="container lg:w-[90vw] w-[90vw] bg-white rounded-2xl shadow-2xl flex flex-wrap">
        <div
          className="self-start bg-gradient-to-b from-gray-300 to-gray-100 w-[100%] rounded-tl-xl rounded-tr-xl pl-4 flex justify-center p-4 text-teal-900
        font-bold text-xl"
        >
          <h2>Aqui está o resultado da sua simulação</h2>
        </div>
        <div className="self-center w-[100%] pl-4 m-2">
          <div className="grid lg:grid-cols-5 gap-4">
            <div>Contato: Thiago Giovanella</div>
            <div>E-mail: tgiovanella87@gmail.com</div>
            <div>Serviço: Exportação</div>
            <div>Origem: Brasil - 37011</div>
            <div>Destino: Estados Unidos - 85465</div>
          </div>
          <div className="my-6">
            <div className="mb-2"> Informações dos produtos</div>
            <div className="grid lg:grid-cols-2 gap-4">
              <div>Descrição do produto completa</div>
              <div>Quantidade: 14</div>
            </div>
            <div className="grid lg:grid-cols-5 gap-4">
              <div>Valor: U$ 100,00</div>
              <div>Peso: 350g</div>
              <div>Altura: 20cm</div>
              <div>Largura: 20cm</div>
              <div>Profundidade: 20cm</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4"></div>
        </div>
      </div>
    </div>
  );
}

export default ResultModal;
