import { useWriteContract } from "wagmi";
import { YOUR_CONTRACT_ABI } from "~~/utils/abi";

export const NoSimulateExample = () => {
  const { writeContract } = useWriteContract();

  return (
    <div className="w-1/2 bg-red-500 p-4 flex flex-col gap-4">
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
  );
};
