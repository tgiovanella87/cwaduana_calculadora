import { Field, FieldArray, Form, Formik } from "formik";
import Head from "next/head";
import { requestByLocation } from "./api/fedex";

import React, { Fragment, useEffect, useState } from "react";

import { findAllCountries } from "../models/countries";

import { Button } from "../components/form/Forms";
import LoginModal from "../components/modal/LoginModal";
import ResultModal from "../components/modal/ResultModal";

export default function App({ countries }) {
  const handleSubmit = async (value) => {
    await requestByLocation(value);
  };

  const [initialValues, setInitialValues] = useState({
    produtos: [
      {
        descricao: "",
        altura: "",
        largura: "",
        profundidade: "",
        peso: "",
        valor: "",
        quantidade: "",
      },
    ],
    nomeContato: "",
    contatoEmpresa: "",
    emailContato: "",
    telefoneContato: "",
    opcao: "ex",
    origem: "br",
    cepOrigem: "",
    destino: "us",
    cepDestino: "",
  });
  const [visible, setVisibility] = useState(false);
  const [countriesOptions, setCountriesOptions] = useState([]);

  useEffect(() => {
    const countriesObject = JSON.parse(countries);
    const options = countriesObject.map((item) => {
      return (
        <option value={item.initials} key={`option_${item.id}`}>
          {item.initials} - {item.description}
        </option>
      );
    });
    options.unshift(<option value="">Selecione</option>);
    setCountriesOptions(options);
  }, []);

  const changeVisibility = () => {
    setVisibility((prevState) => !prevState);
  };

  return (
    <Fragment>
      <Head>
        <title>CW Aduana Calculadora</title>
      </Head>
      <ResultModal visible />
      <LoginModal visible={visible} changeVisibility={changeVisibility} />
      <div className="container mx-auto bg-white rounded-lg p-1 mt-8">
        <div className="bg-gradient-to-r from-teal-400 to-teal-800 rounded-sm mb-4">
          <h2 className="text-white font-bold text-lg p-3 rounded-md shadow-md">
            Calculadora de Frete - CW Aduana
          </h2>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values }) => (
            <Form>
              <div className="grid lg:grid-cols-4 gap-2">
                <div className="lg:col-span-4">
                  <div className="flex flex-row mb-8 rounded-lg shadow-lg p-1 flex-wrap">
                    {/* Dados do contato */}
                    <div className="lg:flex-grow-[2] lg:max-w-[60%] flex-grow-[1] w-full flex flex-wrap flex-col p-2">
                      <div className="flex flex-row w-full mb-2">
                        <div className="bg-[#cfd8dc] p-2 flex-grow-[2]">
                          Dados de contato
                        </div>
                        <div className="lg:col-span-2 col-span-4 bg-[#cfd8dc] rounded-tr-lg rounded-br-lg">
                          {/* <Button
                            action={changeVisibility}
                            id="clienteAtivo"
                            label="Já sou cliente"
                            className="shadow-md bg-teal-500 pl-4 pr-4 text-slate-50 rounded-xl hover:ring-2 hover:ring-offset-2 hover:ring-teal-200 p-1 w-full h-full"
                          /> */}
                        </div>
                      </div>
                      <div className="col-span-8 mt-2 grid grid-cols-8 gap-2">
                        <div className="lg:col-span-5 col-span-8">
                          <Field
                            placeholder="Seu nome completo"
                            id="nomeContato"
                            name="nomeContato"
                            label="Seu nome completo:"
                            className="rounded-md border-solid border-[1px] w-full p-2"
                          />
                        </div>
                        <div className="lg:col-span-3 col-span-8">
                          <Field
                            placeholder="Nome da sua empresa"
                            id="contatoEmpresa"
                            name="contatoEmpresa"
                            label="Nome da sua empresa:"
                            className="rounded-md border-solid border-[1px] w-full p-2"
                          />
                        </div>
                        <div className="lg:col-span-5 col-span-8">
                          <Field
                            placeholder="Seu e-mail"
                            id="emailContato"
                            name="emailContato"
                            label="Seu E-mail:"
                            className="rounded-md border-solid border-[1px] w-full p-2"
                          />
                        </div>
                        <div className="lg:col-span-3 col-span-8">
                          <Field
                            placeholder="(35) 99999-9999"
                            id="telefoneContato"
                            name="telefoneContato"
                            label="Seu número de contato:"
                            className="rounded-md border-solid border-[1px] w-full p-2"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Dados do transporte */}
                    <div className="lg:flex-grow-[1] lg:w-[30%] w-full flex flex-wrap flex-col p-2">
                      <div className="col-span-6 bg-[#cfd8dc] p-2 mb-2">
                        Dados do transporte
                      </div>
                      <div className="col-span-6 grid grid-cols-2">
                        <div className="grid grid-cols-2 gap-2 col-span-2">
                          <div className="col-span-1">
                            <label>
                              <Field
                                id="in"
                                type="radio"
                                name="opcao"
                                value="in"
                                className="mr-2"
                              />
                              importação
                            </label>
                          </div>
                          <div className="col-span-1">
                            <div>
                              <label>
                                <Field
                                  id="ex"
                                  name="opcao"
                                  value="ex"
                                  type="radio"
                                  className="mr-2"
                                />
                                Exportação
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-2 flex flex-wrap justify-between shadow-md p-2 bg-slate-100">
                          <div className="md:w-[49%] w-[100%]">
                            <Field
                              as="select"
                              id="origem"
                              name="origem"
                              placeholder="Escolha o pais de origem"
                              className="p-2 rounded-lg bg-white border-solid border-[1px] focus:border-sky-400 w-full"
                            >
                              {countriesOptions}
                            </Field>
                          </div>

                          <div className="md:w-[49%] w-[100%]">
                            <Field
                              placeholder="37000-000"
                              id="cepOrigem"
                              name="cepOrigem"
                              label="Cep de Origem:"
                              className="rounded-md border-solid border-[1px] w-full p-2"
                            />
                          </div>
                        </div>

                        <div className="col-span-2 flex flex-wrap justify-between shadow-md p-2 bg-slate-100 mt-4">
                          <div className="md:w-[49%] w-[100%]">
                            <Field
                              as="select"
                              id="destino"
                              name="destino"
                              placeholder="Escolha o pais de Destino"
                              className="p-2 rounded-lg bg-white border-solid border-[1px] focus:border-sky-400 w-full"
                            >
                              {countriesOptions}
                            </Field>
                          </div>

                          <div className="md:w-[49%] w-[100%]">
                            <Field
                              placeholder="37000-000"
                              id="cepDestino"
                              name="cepDestino"
                              label="Cep de Destino:"
                              className="rounded-md border-solid border-[1px] w-full p-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    {/* Dados do Produto */}
                    <FieldArray
                      name="produtos"
                      render={(arrayHelper) => (
                        <div className="flex flex-row flex-wrap bg-slate-100">
                          <div className="p-2 flex-grow flex items-center align-middle">
                            Dados dos Produtos
                          </div>
                          <div className="align-middle text-center flex text-white">
                            <Button
                              className="bg-teal-600 p-2 rounded-md"
                              label="Adicionar Produto"
                              onClick={() => {
                                arrayHelper.insert(1, {
                                  descricao: "",
                                  altura: "",
                                  largura: "",
                                  profundidade: "",
                                  peso: "",
                                  valor: "",
                                  quantidade: "",
                                });
                              }}
                            />
                          </div>

                          {values.produtos.map((produto, index) => (
                            <div className=" bg-white w-full flex flex-wrap justify-around">
                              <div
                                key={index}
                                className="bg-teal-800 text-white w-full flex-grow-[1] mt-2 flex justify-between p-3"
                              >
                                {` Produto ${index + 1}`}
                                <button
                                  key={`rem-${index}`}
                                  onClick={() => arrayHelper.remove(index)}
                                >
                                  Remover
                                </button>
                              </div>
                              <div
                                key={`desc-${index}`}
                                className="lg:w-[40%] w-full mt-2"
                              >
                                <Field
                                  key={`field-desc-${index}`}
                                  placeholder="Descrição do produto"
                                  name={`produtos[${index}].descricao`}
                                  className="rounded-md border-solid border-[1px] w-full p-2"
                                />
                              </div>
                              <div
                                key={`alt-${index}`}
                                className="lg:w-[28%] w-[48%] mt-2"
                              >
                                <Field
                                  key={`field-alt-${index}`}
                                  placeholder="Altura"
                                  name={`produtos[${index}].altura`}
                                  label="Altura:"
                                  className="rounded-md border-solid border-[1px] w-full p-2"
                                />
                              </div>
                              <div
                                key={`larg-${index}`}
                                className="lg:w-[28%] w-[48%] mt-2"
                              >
                                <Field
                                  key={`field-lar-${index}`}
                                  placeholder="Largura"
                                  name={`produtos[${index}].largura`}
                                  label="Largura:"
                                  className="rounded-md border-solid border-[1px] w-full p-2"
                                />
                              </div>
                              <div
                                key={`prof-${index}`}
                                className="lg:w-[24%] w-[48%] mt-2"
                              >
                                <Field
                                  key={`field-prof-${index}`}
                                  placeholder="Profundidade"
                                  name={`produtos[${index}].profundidade`}
                                  label="Profundidade:"
                                  className="rounded-md border-solid border-[1px] w-full p-2"
                                />
                              </div>
                              <div
                                key={`pes-${index}`}
                                className="lg:w-[24%] w-[48%] mt-2"
                              >
                                <Field
                                  key={`field-pes-${index}`}
                                  placeholder="Peso"
                                  name={`produtos[${index}].peso`}
                                  label="Peso:"
                                  className="rounded-md border-solid border-[1px] w-full p-2"
                                />
                              </div>
                              <div
                                key={`val-${index}`}
                                className="lg:w-[24%] w-[48%] mt-2"
                              >
                                <Field
                                  key={`field-val-${index}`}
                                  placeholder="Valor"
                                  name={`produtos[${index}].valor`}
                                  label="Valor:"
                                  className="rounded-md border-solid border-[1px] w-full p-2"
                                />
                              </div>
                              <div
                                key={`qnt-${index}`}
                                className="lg:w-[24%] w-[48%] mt-2"
                              >
                                <Field
                                  key={`field-qnt-${index}`}
                                  placeholder="Quantidade"
                                  name={`produtos[${index}].quantidade`}
                                  label="Quantidade:"
                                  className="rounded-md border-solid border-[1px] w-full p-2"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <Button
                  label="Simular Frete"
                  type="submit"
                  className="bg-teal-500 px-6 py-2 rounded-lg text-white hover:bg-teal-600"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  //console.info(await getAuthToken());
  const countries = await findAllCountries();

  return {
    props: {
      countries: JSON.stringify(countries),
    },
  };
}

export { App };
