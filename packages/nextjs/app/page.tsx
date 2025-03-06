"use client";

import { WriteOnlyFunctionForm } from "./debug/_components/contract/WriteOnlyFunctionForm";
import type { NextPage } from "next";
import { NoSimulateExample } from "~~/components/simulate-examples/NoSimulateExample";
import { SimulateExample } from "~~/components/simulate-examples/SimulateExample";
import { YOUR_CONTRACT_ABI } from "~~/utils/abi";

const Home: NextPage = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center p-4">
        <h1 className="text-4xl font-bold mb-4">Simulate contract calls before sending them to the user</h1>
        <a
          href="https://testnet.monadexplorer.com/address/0xD64e4eC77812901a8b63826CA266f4C0D23f81c5"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          See the contract on Monad Explorer
        </a>
        <a
          href="https://github.com/portdeveloper/frontend-checks-for-revert-example"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          See the repo on GitHub
        </a>
      </div>
      <div className="flex w-full min-h-screen">
        <NoSimulateExample />
        <SimulateExample />
      </div>
    </>
  );
};

export default Home;
