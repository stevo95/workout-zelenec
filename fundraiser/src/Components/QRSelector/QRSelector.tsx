import { useCallback, useMemo, useState } from 'react';
import five from '../../resources/5.jpeg'
import twentyFive from '../../resources/25.jpeg'
import fifty from '../../resources/50.jpeg'
import hundred from '../../resources/100.jpeg'
import fiveHundred from '../../resources/500.jpeg'
import './QRSelector.css';

const QRSelector = () => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const options = useMemo(() => [5, 25, 50, 100, 500], []);
    const optionsImageUrls: { [key: number]: string } = {
        0: five,
        1: twentyFive,
        2: fifty,
        3: hundred,
        4: fiveHundred,
    }

    const onSelectorClick = useCallback((i: number) => {
        setSelectedIndex(i);
    }, []);

    const renderOptions = useCallback(() => {
        return options.map((option, index) => (
            <div 
                key={index}
                className={index === selectedIndex ? 'selectedPart' : 'selectorPart'}
                onClick={() => onSelectorClick(index)}
            >
                {option}€
            </div>
        ));
    }, [selectedIndex, options, onSelectorClick]);


    return (
        <div className='qrSelectorContainer'>
            <div className='qrSelectorTopSection'>
                { renderOptions() }
            </div>
            <div className='qrSelectorBottomSection'>
                <img className='qrCode' src={optionsImageUrls[selectedIndex]} alt={`${options[selectedIndex]}€ QR Code`} />
            </div>
        </div>
    );
}

export default QRSelector;
