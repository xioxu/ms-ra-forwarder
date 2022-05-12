import { VercelRequest, VercelResponse } from '@vercel/node';

module.exports = async (request: VercelRequest, response: VercelResponse) => {
    let detalSecondStrStr = request.query['sec'];
    let detalSecond = 1;
    let max = 10;
    let min = 1;

    if(detalSecondStrStr == null){
        detalSecond = Math.floor(Math.random() * (max - min + 1)) + min;
    }else{
        detalSecond = parseInt(detalSecondStrStr[0]);

        if(detalSecond != NaN){
            if(detalSecond < min || detalSecond > max){
                detalSecond = Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }
    }
    var begin = new Date();

    setTimeout(() => {
        var end = new Date();
        response.status(200)
        .send({
            beginTime:begin,
            endTime:end,
            delaySecond:detalSecond
        });
    }, detalSecond * 1000);

 
}