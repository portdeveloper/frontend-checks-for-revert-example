import { useWriteContract } from "wagmi";
import { simulateContract } from "wagmi/actions";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { CONTRACT_ADDRESS, FUNCTION_NAME, YOUR_CONTRACT_ABI } from "~~/utils/abi";
import { getParsedError } from "~~/utils/scaffold-eth/getParsedError";
import { notification } from "~~/utils/scaffold-eth/notification";

export const SimulateExampleWagmiViem = () => {
  const { writeContract } = useWriteContract();

  const handleWriteContract = async () => {
    try {
      await simulateContract(wagmiConfig, {
        address: CONTRACT_ADDRESS,
        abi: YOUR_CONTRACT_ABI,
        functionName: FUNCTION_NAME,
      });
    } catch (error) {
      const parsedError = getParsedError(error);
      notification.error(parsedError);
      throw error;
    }

    writeContract({
      abi: YOUR_CONTRACT_ABI,
      address: CONTRACT_ADDRESS,
      functionName: FUNCTION_NAME,
    });
  };

  return (
    <div className="w-1/2 bg-blue-500 p-4 flex flex-col gap-4">
      {/* Right column content */}
      <h2 className="text-2xl font-bold text-white mb-4">Simulate before executing</h2>
      <p className="text-white">
        Here we use the <code>simulateContractWriteAndNotifyError</code> function to simulate the transaction before
        executing it.
      </p>
      <p className="text-white">
        <code>simulateContractWriteAndNotifyError</code> calls simulateContract from wagmi, if it catches an error, it
        throws an error and sends a toast notif to the user.
      </p>
      <a
        href="https://viem.sh/docs/contract/simulateContract#simulatecontract"
        target="_blank"
        rel="noopener noreferrer"
        className="link underline mb-4 text-white"
      >
        viem simulateContract Documentation
      </a>
      <button className="btn btn-secondary btn-sm" onClick={handleWriteContract}>
        Send 💸
      </button>
    </div>
  );
};
