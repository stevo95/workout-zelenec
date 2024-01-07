import axios from 'axios';

export const getBalance = async () => {
    try {
        const result = await axios.get(
            process.env.REACT_APP_API_URL + '/bank/balance',
            { timeout: 30000 }
        );
        return result.data;
    } catch(e) {
        console.error('Failed to fetch bank info');
        console.log(e);
    }
}