"use client";

import type { NextPage } from "next";
import {
  NoSimulateExampleEthers,
  NoSimulateExampleWagmiViem,
  SimulateExampleEthers,
  SimulateExampleWagmiViem,
} from "~~/components/simulate-examples";

const Home: NextPage = () => {
  return (
    <>
      <div className="w-full flex flex-col bg-secondary items-center p-4">
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
      <div className="flex flex-col gap-4 w-full">
        <div className="text-2xl font-bold text-center p-4">Viem Example:</div>
        <div className="flex gap-4">
          <NoSimulateExampleWagmiViem />
          <SimulateExampleWagmiViem />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="text-2xl font-bold text-center p-4">Ethers Example:</div>
        <div className="flex gap-4">
          <NoSimulateExampleEthers />
          <SimulateExampleEthers />
        </div>
      </div>
    </>
  );
};

export default Home;
