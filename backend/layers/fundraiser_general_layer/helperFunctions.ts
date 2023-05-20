import { LambdaResult, LambdaResultBody } from './lambdaTypes';

export const lambdaResultHandler = (statusCode: number, body: any): LambdaResult => {
    return {
        statusCode: statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        isBase64Encoded: false,
        body: JSON.stringify(body)
    }
}

export const getLambdaResultBody = (success: boolean, message: string, data: {[key: string] : any} | null = null): LambdaResultBody => {
    return {
        Success: success,
        Message: message,
        Data: data,
    }
}