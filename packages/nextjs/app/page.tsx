"use client";

import { WriteOnlyFunctionForm } from "./debug/_components/contract/WriteOnlyFunctionForm";
import type { NextPage } from "next";
import { useAccount, useWriteContract } from "wagmi";
import { YOUR_CONTRACT_ABI } from "~~/utils/abi";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { writeContract } = useWriteContract();

  return (
    <>
      <div className="w-full flex flex-col items-center p-4">
        <h1 className="text-4xl font-bold text-white mb-4">Simulate contract calls before sending them to the user</h1>
        <a
          href="https://testnet.monadexplorer.com/address/0xD64e4eC77812901a8b63826CA266f4C0D23f81c5"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          See the contract on Monad Explorer
        </a>
      </div>
      <div className="flex w-full min-h-screen">
        <div className="w-1/2 bg-red-500 p-4 flex flex-col gap-4">
          {/* Left column content */}
          <h2 className="text-2xl font-bold text-white mb-4">useWriteContract from wagmi without simulation</h2>
          <p className="text-white">Here we use useWriteContract hook from wagmi directly.</p>
          <a
            href="https://wagmi.sh/react/api/hooks/useWriteContract#usewritecontract"
            target="_blank"
            rel="noopener noreferrer"
            className="link mb-4"
          >
            Wagmi useWriteContract Documentation
          </a>
          <div className="flex justify-between gap-4">
            <p className="font-medium my-0 break-words">eatGasAndFail</p>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() =>
                writeContract({
                  abi: YOUR_CONTRACT_ABI,
                  address: "0xD64e4eC77812901a8b63826CA266f4C0D23f81c5",
                  functionName: "eatGasAndFail",
                })
              }
            >
              Send 💸
            </button>
          </div>
        </div>
        <div className="w-1/2 bg-blue-500 p-4 flex flex-col gap-4">
          {/* Right column content */}
          <h2 className="text-2xl font-bold text-white mb-4">Simulate before executing</h2>
          <p className="text-white">
            Here we use the <code>simulateContractWriteAndNotifyError</code> function to simulate the transaction before
            executing it.
          </p>
          <p>
            <code>simulateContractWriteAndNotifyError</code> calls simulateContract from wagmi, if it catches an error,
            it throws an error and sends a toast notif to the user.
          </p>
          <a
            href="https://wagmi.sh/core/api/actions/simulateContract#simulatecontract"
            target="_blank"
            rel="noopener noreferrer"
            className="link mb-4"
          >
            Wagmi simulateContract Documentation
          </a>
          <WriteOnlyFunctionForm
            abi={YOUR_CONTRACT_ABI}
            abiFunction={{
              name: "eatGasAndFail",
              inputs: [],
              outputs: [],
              stateMutability: "view",
              type: "function",
            }}
            onChange={() => {
              console.log("onChange");
            }}
            contractAddress="0xD64e4eC77812901a8b63826CA266f4C0D23f81c5"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
