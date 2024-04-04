      // Your JavaScript code here
      const connectWallet = async () => {
  try {
    const phantom = getPhantom();
    const { publicKey, signTransaction } = await connect(phantom);
    document.getElementById("connectWallet").style.display = "none";
    document.getElementById("disconnectWallet").style.display = "block";
    document.getElementById("walletInfo").innerHTML = `Connected Wallet: ${publicKey.toBase58()}`;
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
};
const getPhantom = () => {
  const [phantom, setPhantom] = useState(null);

  if (window.solana && window.solana.isPhantom) {
    setPhantom(window.solana);
  }

  return phantom;
};

// Initialize Phantom wallet connector
const walletAdapter = new PhantomWalletAdapter();

// Connect to the Phantom wallet
const connect = async (wallet) => {
  await wallet.connect();
  return {
    publicKey: wallet.publicKey,
    signTransaction: (transaction) => walletAdapter.signTransaction(wallet, transaction),
  };
};
const disconnectWallet = () => {
  try {
    const phantom = getPhantom();
    disconnect(phantom);
    document.getElementById("connectWallet").style.display = "block";
    document.getElementById("disconnectWallet").style.display = "none";
    document.getElementById("walletInfo").innerHTML = "";
  } catch (error) {
    console.error("Error disconnecting wallet:", error);
  }
};
