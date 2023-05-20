import './Footer.css';
import linkedInIcon from '../../resources/linkedin-icon-18-256.png';

const Footer = () => {

    const redirectLinkedIn = () => {
        window.open('https://www.linkedin.com/in/stefansarmir/', '_blank');
    }

    return (
        <div className='footerContainer'>
            <div className='footerLeft'>
                <p>
                    © 2023 RPS s.r.o.
                    | All rights reserved
                </p>
            </div>
            <div className='footerCenter'>
                <img 
                    className='linkedInIcon'
                    src={linkedInIcon} 
                    alt='LinkedIn icon' 
                    onClick={redirectLinkedIn}
                />
            </div>
            <div className='footerRight'>
                Built by Stefan Sarmir
            </div>
        </div>
    );
};

export default Footer;
