"use client";

import { WriteOnlyFunctionForm } from "./debug/_components/contract/WriteOnlyFunctionForm";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { useAccount, useWriteContract } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { YOUR_CONTRACT_ABI } from "~~/utils/abi";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { writeContract } = useWriteContract();

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract({ contractName: "YourContract" });

  return (
    <>
      <div className="flex w-full min-h-screen">
        <div className="w-1/2 bg-red-500 p-4">
          {/* Left column content */}
          <h2 className="text-2xl font-bold text-white mb-4">Left Column</h2>
          <p className="text-white">This is the left column content.</p>
          <button
            className="btn btn-secondary"
            disabled={!connectedAddress}
            onClick={() =>
              writeContract({
                abi: YOUR_CONTRACT_ABI,
                address: "0x285649b8140cF63DB87170B431042Fdc84AC747F",
                functionName: "eatGasAndFail",
                args: [1n],
              })
            }
          >
            Eat Gas and Fail
          </button>
        </div>
        <div className="w-1/2 bg-blue-500 p-4">
          {/* Right column content */}
          <h2 className="text-2xl font-bold text-white mb-4">Right Column</h2>
          <p className="text-white">This is the right column content.</p>
          <WriteOnlyFunctionForm
            abi={YOUR_CONTRACT_ABI}
            abiFunction={{
              name: "eatGasAndFail",
              inputs: [{ name: "amount", type: "uint256" }],
              outputs: [],
              stateMutability: "view",
              type: "function",
            }}
            onChange={() => {
              console.log("onChange");
            }}
            contractAddress="0x285649b8140cF63DB87170B431042Fdc84AC747F"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
