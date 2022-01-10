import { VercelRequest, VercelResponse } from '@vercel/node';
import { convert, FORMAT_CONTENT_TYPE } from '../ra';


module.exports = async (request: VercelRequest, response: VercelResponse) => {

    let token = process.env['TOKEN'];
    if (token) {
        let authorization = request.headers['authorization'];
        console.log('verify token...', authorization);
        if (authorization != `Bearer ${token}`) {
            console.error('Invalid token');
            response.status(401).json('Invalid token');
            return;
        }
    }

    try {

        let format = request.headers['format'] || 'audio-16khz-32kbitrate-mono-mp3';
        if (Array.isArray(format)) {
            throw `Invalid format ${format}`;
        }
        if (!FORMAT_CONTENT_TYPE.has(format)) {
            throw `Invalid format ${format}`;
        }
         let txt = request.query['text']
       // let txt = request.body;
        if (txt == null) {
            throw `Invalid text: ${txt}`;
        }

        //zh-CN-XiaoxiaoNeural
        let ssml =`<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US">
        <voice name="zh-CN-XiaoyouNeural"> 
          ${txt}
        </voice>
      </speak>`
        let result = await convert(ssml, format);
        response.sendDate = true;
        response.status(200)
            .setHeader('Content-Type', FORMAT_CONTENT_TYPE.get(format))
            .send(result);
    } catch (error) {
        console.error(error);
        response.status(503)
            .json(error);
    }

}