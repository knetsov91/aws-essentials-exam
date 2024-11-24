export const handler = async (event: any) => {

    console.log(event);
    return {
        statusCode: 200,
        headers: {
        
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST'
          },
        body: "da"
    }
}