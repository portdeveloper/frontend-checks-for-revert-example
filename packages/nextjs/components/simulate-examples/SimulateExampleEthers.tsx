import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, FUNCTION_NAME, YOUR_CONTRACT_ABI } from "~~/utils/abi";
import { getParsedError } from "~~/utils/scaffold-eth/getParsedError";
import { notification } from "~~/utils/scaffold-eth/notification";

export const SimulateExampleEthers = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

  useEffect(() => {
    const initializeProviderAndSigner = async () => {
      // Check if window.ethereum is available (MetaMask or other wallet)
      if (window.ethereum) {
        try {
          // Create a browser provider
          const browserProvider = new ethers.BrowserProvider(window.ethereum);

          // Request account access if needed
          await window.ethereum.request({ method: "eth_requestAccounts" });

          // Get the signer from the provider
          const ethSigner = await browserProvider.getSigner();

          setProvider(browserProvider);
          setSigner(ethSigner);
        } catch (error) {
          console.error("Error initializing provider and signer:", error);
        }
      } else {
        console.error("No Ethereum wallet detected. Please install MetaMask or another compatible wallet.");
      }
    };

    initializeProviderAndSigner();
  }, []);

  const handleWriteContract = async () => {
    if (!signer || !provider) {
      notification.error("Wallet not connected. Please connect your wallet first.");
      return;
    }

    try {
      // Create contract instance
      const contract = new ethers.Contract(CONTRACT_ADDRESS, YOUR_CONTRACT_ABI, provider);

      // Connect the contract to the signer for write operations
      const contractWithSigner = contract.connect(signer);

      // Simulate the transaction using staticCall
      // This will throw an error if the transaction would fail
      await contractWithSigner.getFunction(FUNCTION_NAME).staticCall();

      notification.success("Simulation successful! Now executing the transaction...");

      // If simulation succeeds, execute the actual transaction
      const tx = await contractWithSigner.getFunction(FUNCTION_NAME)();
      await tx.wait();

      notification.success("Transaction successful!");
    } catch (error) {
      const parsedError = getParsedError(error);
      notification.error(parsedError);
      console.error("Transaction error:", error);
    }
  };

  return (
    <div className="w-1/2 bg-blue-500 p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-white mb-4">Simulate with ethers.js before executing</h2>
      <p className="text-white">
        Here we use ethers.js <code>staticCall</code> method to simulate the transaction before executing it.
      </p>
      <p className="text-white link underline">
        <a
          href="https://docs.ethers.org/v6/api/contract/#BaseContractMethod-staticCall"
          target="_blank"
          rel="noreferrer"
        >
          https://docs.ethers.org/v6/api/contract/#BaseContractMethod-staticCall
        </a>
      </p>
      <p className="text-white">
        If the <code>staticCall</code> call fails, we catch the error and display it to the user. Otherwise, we proceed
        with the actual transaction.
      </p>
      <p className="text-white">Even gas estimation is enough to check if the call is going to fail.</p>
      <p className="text-white link underline">
        <a
          href="http://docs.ethers.org/v6/api/contract/#BaseContractMethod-estimateGas"
          target="_blank"
          rel="noreferrer"
        >
          http://docs.ethers.org/v6/api/contract/#BaseContractMethod-estimateGas
        </a>
      </p>
      <button className="btn btn-secondary btn-sm" onClick={handleWriteContract} disabled={!signer}>
        {signer ? "Send 💸" : "Connect Wallet First"}
      </button>
    </div>
  );
};
