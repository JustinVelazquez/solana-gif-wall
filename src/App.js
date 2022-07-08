import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { useEffect } from 'react';

const App = () => {
  // const checkIfWalletIsConnected = async () => {
  //   try {
  //     const { solana } = window;
  //     if (solana) {
  //       if (solana.isPhantom) {
  //         console.log('Phantom Wallet found!');
  //       } else {
  //         alert('Solana object not found! Download the Phantom Wallet!');
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
 
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
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
