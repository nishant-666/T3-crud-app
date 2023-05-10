import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Input from "~/components/Input";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const post = api.POSTAPI.postSample.useMutation();
  const get = api.GETAPI.getSample.useQuery();
  const update = api.UPDATEAPI.updateSample.useMutation();
  const deleteData = api.DELETEAPI.deleteSample.useMutation();

  const [inputs, setInputs] = useState({
    id: "",
    name: "",
    email: "",
    age: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [data, setData] = useState(get?.data?.users);
  const getInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;

    let u = { [name]: value };
    setInputs((prev) => ({ ...prev, ...u }));
  };

  const sendInput = () => {
    post.mutate(inputs);
  };

  const updateInput = () => {
    update.mutate(inputs);
  };

  const deleteInput = (id: string) => {
    deleteData.mutate({ id: id });
  };

  useEffect(() => {
    setData(get?.data?.users);
    setInputs({
      id: "",
      name: "",
      email: "",
      age: "",
    });
  }, [get?.data?.users]);
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Input
          type="text"
          placeholder="Enter your Name"
          onChange={getInputData}
          name="name"
          value={inputs.name}
        />
        <Input
          type="email"
          placeholder="Enter your Email"
          onChange={getInputData}
          name="email"
          value={inputs.email}
        />
        <Input
          type="string"
          placeholder="Enter your Age"
          onChange={getInputData}
          name="age"
          value={inputs.age}
        />

        <button
          onClick={isUpdate ? updateInput : sendInput}
          className="btn-primary btn mt-3"
        >
          {isUpdate ? "Update Data" : "Add Data"}
        </button>
        <button
          onClick={() => {
            setInputs({
              id: "",
              name: "",
              email: "",
              age: "",
            });
            setIsUpdate(false);
          }}
          className="btn-primary btn mt-3"
        >
          Reset Data
        </button>

        <div className="grid">
          {data?.map((item) => {
            return (
              <div className="flexbox prose">
                <p>{item.name}</p>
                <p>{item.email}</p>
                <p>{item.age}</p>
                <button
                  onClick={() => {
                    setIsUpdate(true);
                    setInputs({
                      id: item.id as string,
                      name: item.name as string,
                      email: item.email,
                      age: item.age,
                    });
                  }}
                  className="btn-primary btn mt-3"
                >
                  Update Data
                </button>
                <button
                  onClick={() => {
                    deleteInput(item.id as string);
                  }}
                  className="btn-primary btn mt-3"
                >
                  Delete Data
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
