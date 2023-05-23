import './BankSection.css';
import { ColorRing } from 'react-loader-spinner'
import ProgressBar from '@ramonak/react-progress-bar';
import { useSpring, animated } from 'react-spring';
import { forwardRef, useEffect, useState } from 'react';
import { FUND_GOAL } from '../../Constants';
import { getBalance } from '../../Services/BankService';

const Number = ({ n }: {n: number}) => {
    const { number } = useSpring({
        from: { number: 0 },
        number: n,
        delay: 200,
        config: { mass: 1, tesnion: 20, friction: 10 }
    });
    return <animated.div>
        {number.to((n) => n.toFixed(0))}
    </animated.div>
}

const BankSection = forwardRef<HTMLDivElement, {}>((props, ref) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [balance, setBalance] = useState<number | undefined>();

    const processBalance = (balance: string): void => {
        const i = balance.indexOf(',');
        const subString = balance.slice(0, i);
        const removedSpaces = subString.replace(/\s+/g, '');
        setBalance(parseInt(removedSpaces));
    }

    useEffect(() => {
        if (!balance) {
            getBalance()
                .then((res) => {
                    if (!res?.Data) {
                        console.error('ERROR: Failed to get balance from bank.');
                        return;
                    }
                    const balance = JSON.parse(res?.Data?.balance);
                    processBalance(balance);
                    setLoading(false);
                });
        }
    }, [balance]);

    const calculateProgress = () => {
        if (!balance) return 0;
        return Math.floor(balance * 100 / FUND_GOAL);
    }
    
    return (
        <div ref={ref} className='container'>
            { 
            loading 
                ? 
                <ColorRing/>
                :
                <div className='bankInfo paddingInner'>
                    <div className='progressSection'>
                        <div className="titleSmaller">
                            Vyzbieraná suma / Cieľová suma
                        </div>
                        <div className='progress title'>
                            <div className='animatedWrapper'>
                                <Number n={balance ? balance : 0}/> €
                            </div> 
                            <div className='slashWrapper'>/</div>
                            <div className='goalWrapper'>10 000€</div>
                        </div>
                        <ProgressBar 
                            className='barWrapper'
                            bgColor='rgba(110, 240, 0, 0.9)'
                            height='30px'
                            borderRadius='10px'
                            completed={calculateProgress()}
                            maxCompleted={100}
                            isLabelVisible={true}
                        />
                    </div>
                </div>
            }
        </div>
    );
});

export default BankSection;
