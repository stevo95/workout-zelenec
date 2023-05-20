import { APIGatewayEvent, Handler } from 'aws-lambda';
import { getLambdaResultBody, lambdaResultHandler } from '/opt/fundraiser_general_layer/helperFunctions';
import { getBalance } from '/opt/fundraiser_general_layer/puppeteer';
import { LambdaResult } from '/opt/fundraiser_general_layer/lambdaTypes';

export const lambdaHandler: Handler = async (
  event: APIGatewayEvent,
): Promise<LambdaResult> => {
    try {        
        const currentBalance = await getBalance('https://ib.vub.sk/pch/transparentne-ucty?iban=SK7202000000004789114758');
        return lambdaResultHandler(200, getLambdaResultBody(
            true,
            'Data scraped successfuly.',
            {
                balance: JSON.stringify(currentBalance)
            }
        ));
    } catch (err) {
        console.error(JSON.stringify(err));
        return lambdaResultHandler(500, getLambdaResultBody(
            false,
            'Oops, Something Went Wrong...',
            {
                error: err
            }
        ));
    }
}  
