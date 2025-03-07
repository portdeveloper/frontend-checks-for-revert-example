import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, FUNCTION_NAME, YOUR_CONTRACT_ABI } from "~~/utils/abi";
import { getParsedError } from "~~/utils/scaffold-eth/getParsedError";
import { notification } from "~~/utils/scaffold-eth/notification";

export const NoSimulateExampleEthers = () => {
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
      // Create contract instance to get the function data
      const contract = new ethers.Contract(CONTRACT_ADDRESS, YOUR_CONTRACT_ABI, provider);

      // Get the function data for the transaction
      const functionData = contract.interface.encodeFunctionData(FUNCTION_NAME, []);

      // Get the sender address
      const fromAddress = await signer.getAddress();

      // Get the current nonce for the account
      const nonce = await provider.getTransactionCount(fromAddress);

      // Get the current network to determine gas parameters
      const feeData = await provider.getFeeData();
      const network = await provider.getNetwork();
      console.log("feeData", feeData);
      console.log("network", network);

      // Create a completely raw transaction request with all parameters explicitly set
      const rawTx = {
        type: "0x2", // EIP-1559 transaction
        to: CONTRACT_ADDRESS,
        from: fromAddress,
        data: functionData,
        nonce: ethers.toBeHex(nonce),
        gas: ethers.toBeHex(1000000), // Hardcoded gas limit to avoid estimation
        maxFeePerGas: ethers.toBeHex(feeData.maxFeePerGas || ethers.parseUnits("50", "gwei")),
        maxPriorityFeePerGas: ethers.toBeHex(feeData.maxPriorityFeePerGas || ethers.parseUnits("2", "gwei")),
        chainId: ethers.toBeHex(network.chainId),
      };

      // Send the raw transaction directly using window.ethereum.request
      // This is the most direct method possible, bypassing all ethers.js checks
      notification.success("Sending transaction using the most direct method possible...");

      // Use window.ethereum.request directly to send the transaction
      // This completely bypasses ethers.js and any simulation it might do
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [rawTx],
      });

      notification.success("Transaction sent! Waiting for confirmation...");

      // Wait for the transaction to be mined
      // We need to use the provider to wait for the transaction
      const receipt = await provider.waitForTransaction(txHash);

      notification.success("Transaction successful!");
    } catch (error) {
      const parsedError = getParsedError(error);
      notification.error(parsedError);
      console.error("Transaction error:", error);
    }
  };

  return (
    <div className="w-1/2 bg-red-500 p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-white mb-4">Direct RPC Call (No Simulation)</h2>
      <p className="text-white">
        This example uses <code>window.ethereum.request</code> directly with the <code>eth_sendTransaction</code>{" "}
        method.
      </p>
      <p className="text-white">
        It is almost impossible to not simulate a call in ethers v6. If we try to get the gas estimation, it fails. So,
        this examples uses a raw call. Do not pay attention to this example.
      </p>
      <p className="text-white">
        We completely bypass ethers.js and its simulation by directly calling the wallet&apos;s RPC interface with all
        parameters explicitly set.
      </p>
      <p className="text-white">This approach doesn&apos;t catch errors before sending the transaction.</p>
      <button className="btn btn-secondary btn-sm" onClick={handleWriteContract} disabled={!signer}>
        {signer ? "Send Direct RPC TX 💸" : "Connect Wallet First"}
      </button>
    </div>
  );
};
