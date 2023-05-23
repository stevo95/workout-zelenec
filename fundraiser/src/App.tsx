import './App.css';
import { RefObject, useRef, useState } from 'react';
import BankSection from './Components/BankSection/BankSection';
import NavBar from './Components/Navbar/NavBar';
import Gallery from './Components/Gallery/Gallery';
import MapSection from './Components/MapSection/MapSection';
import TextSection from './Components/TextSection/TextSection';
import QRSelector from './Components/QRSelector/QRSelector';
import { ACCOUNT_LINK } from './Constants';
import Footer from './Components/Footer/Footer';


function App() {
  const [ isFixed, setIsFixed ] = useState<boolean>(true);
  const divRef: RefObject<HTMLDivElement> = useRef(null);

  const onAppScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;;
    const scrollY = element.scrollTop;
    if (scrollY < 200) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  }

  const scrollToDiv = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='App' >
      <div className='blockWrapper' onScroll={onAppScroll}>
        <NavBar
          isFixed={isFixed}
          callback={scrollToDiv}
        />
        <div className='contentWrapper'>
          <Gallery/>
          <TextSection/>
          <BankSection ref={divRef}/>
          <p className='left paddingInner'>
              <strong>
                Pre detailné informácie o účte kliknite <a target='_blank' rel='noreferrer' href={ACCOUNT_LINK}>SEM</a>.
                Kliknutím budete presmerovaný na stránku transparentného účtu, 
                kde je možné získať informácie o možnosti prevodu alebo vyberte 
                jednu z možností nižšie a vykonajte prevod použitím vygenerovaného QR kódu.
              </strong>
          </p>
          <QRSelector/>
          <MapSection/>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
