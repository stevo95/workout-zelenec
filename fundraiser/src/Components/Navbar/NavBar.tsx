import './NavBar.css';
import Zelenec from '../../resources/zelenecerb.png'
import { ACCOUNT_LINK } from '../../Constants';

interface NavBarProps {
    isFixed: boolean;
    callback: () => void;
}

const NavBar = ({ isFixed, callback } : NavBarProps) => {

    const redirectToUrlInNewTab = () => {
        window.open(ACCOUNT_LINK, '_blank');
    };
    
    return (
        <div className={isFixed ? 'navbarFixed' : 'navbarSticky'}>
            <div>
            <img src={Zelenec} alt='Zelenec erb' className='logo'></img>
            </div>
            <div className='navbarRight'>
            <div onClick={redirectToUrlInNewTab} className='button title textWhite'>
                ÚČET
            </div>
            <div onClick={callback} className='buttonHighlighted title textWhite'>
                PRISPIEŤ
            </div>
            </div>
        </div>
    );
};

export default NavBar;
