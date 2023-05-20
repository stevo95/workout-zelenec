import axios from "axios";

export const getBalance = async () => {
    try {
        const result = await axios.get(
            'https://72lc0o1ebf.execute-api.eu-central-1.amazonaws.com/Stage/scrape', 
            { timeout: 30000 }
        );
        return result.data;
    } catch(e) {
        console.error('Failed to fetch bank info');
        console.log(e);
    }
}