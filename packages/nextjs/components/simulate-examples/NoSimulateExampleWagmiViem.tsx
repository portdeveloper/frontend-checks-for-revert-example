import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, FUNCTION_NAME, YOUR_CONTRACT_ABI } from "~~/utils/abi";

export const NoSimulateExampleWagmiViem = () => {
  const { writeContract } = useWriteContract();

  return (
    <div className="w-1/2 bg-red-500 p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-white mb-4">useWriteContract from wagmi without simulation</h2>
      <p className="text-white">Here we use useWriteContract hook from wagmi directly.</p>
      <a
        href="https://wagmi.sh/react/api/hooks/useWriteContract#usewritecontract"
        target="_blank"
        rel="noopener noreferrer"
        className="link underline mb-4 text-white"
      >
        Wagmi useWriteContract Documentation
      </a>
      <button
        className="btn btn-secondary btn-sm"
        onClick={() =>
          writeContract({
            abi: YOUR_CONTRACT_ABI,
            address: CONTRACT_ADDRESS,
            functionName: FUNCTION_NAME,
          })
        }
      >
        Send 💸
      </button>
    </div>
  );
};
