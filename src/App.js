import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const TEST_GIFs = [
  'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
  'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
  'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
  'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp',
];

const App = () => {
  // Setting our State to see if WAllet is connected
  const [walletAddress, SetWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);

  //Checks if wallet is connected on page load
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');

          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key',
            response.publicKey.toString()
          );
          SetWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet');
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Connect Wallet function
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key', response.publicKey.toString());
      SetWalletAddress(response.publicKey.toString());
    }
  };
  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log('Gif Link:', inputValue);
      setGifList([...gifList, inputValue]);
      setInputValue('');
    } else {
      console.log('Empty Input. Try again');
    }
  };

  // Capture Form Changes
  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  // Renders our Connect button
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect To Wallet
    </button>
  );

  //renders if our wallet is connected
  const renderConnectedContainer = () => (
    <div className="connected-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendGif();
        }}
      >
        <input
          type="text"
          placeholder="Enter gif link here!"
          value={inputValue}
          onChange={onInputChange}
        />
        <button type="submit" className="cta-button-gif-button">
          Submit
        </button>
      </form>
      <div className="gif-grid">
        {TEST_GIFs.map((gif) => (
          <div className="gif-item" key={gif}>
            {' '}
            <img src={gif} alt={gif} />{' '}
          </div>
        ))}
      </div>
    </div>
  );

  //Use Effects
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching Gif List...');

      // Call Solana Program here

      //Setting state
      setGifList(TEST_GIFs);
    }
  }, [walletAddress]);

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">???? GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ???
          </p>
          {/* Condtional Check to render wallet */}
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          {/* <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a> */}
        </div>
      </div>
    </div>
  );
};

export default App;
