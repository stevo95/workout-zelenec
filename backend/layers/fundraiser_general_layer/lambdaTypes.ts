
export interface LambdaResult {
    statusCode: number; 
    multiValueHeaders?: {
        'Set-Cookie'?: string[] | string;
    };
    headers: {
        'Content-Type': string;
        'Access-Control-Allow-Origin': string;
    };
    isBase64Encoded?: boolean;
    body: string;
};

export interface LambdaResultBody {
    Success: boolean;
    Message: string;
    Data: any;
}