export const YOUR_CONTRACT_ABI = [
  {
    type: "constructor",
    inputs: [{ name: "_owner", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  { type: "receive", stateMutability: "payable" },
  { type: "function", name: "eatGasAndFail", inputs: [], outputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "greeting",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "premium",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setGreeting",
    inputs: [{ name: "_newGreeting", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "totalCounter",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "userGreetingCounter",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  { type: "function", name: "withdraw", inputs: [], outputs: [], stateMutability: "nonpayable" },
  {
    type: "event",
    name: "GreetingChange",
    inputs: [
      { name: "greetingSetter", type: "address", indexed: true, internalType: "address" },
      { name: "newGreeting", type: "string", indexed: false, internalType: "string" },
      { name: "premium", type: "bool", indexed: false, internalType: "bool" },
      { name: "value", type: "uint256", indexed: false, internalType: "uint256" },
    ],
    anonymous: false,
  },
] as const;

export const CONTRACT_ADDRESS = "0xD64e4eC77812901a8b63826CA266f4C0D23f81c5";
export const FUNCTION_NAME = "eatGasAndFail";
