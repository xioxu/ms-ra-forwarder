import { VercelRequest, VercelResponse } from '@vercel/node';
import { convert, FORMAT_CONTENT_TYPE } from '../ra';


var langs_dict = new Map();

function getLangs(){
   if(langs_dict.size < 1){
       var defaultLangs = `af-ZA,af-ZA-AdriNeural##af-ZA,af-ZA-WillemNeural##am-ET,am-ET-MekdesNeural##am-ET,am-ET-AmehaNeural##ar-DZ,ar-DZ-AminaNeural##ar-DZ,ar-DZ-IsmaelNeural##ar-BH,ar-BH-LailaNeural##ar-BH,ar-BH-AliNeural##ar-EG,ar-EG-SalmaNeural##ar-EG,ar-EG-ShakirNeural##ar-IQ,ar-IQ-RanaNeural##ar-IQ,ar-IQ-BasselNeural##ar-JO,ar-JO-SanaNeural##ar-JO,ar-JO-TaimNeural##ar-KW,ar-KW-NouraNeural##ar-KW,ar-KW-FahedNeural##ar-LY,ar-LY-ImanNeural##ar-LY,ar-LY-OmarNeural##ar-MA,ar-MA-MounaNeural##ar-MA,ar-MA-JamalNeural##ar-QA,ar-QA-AmalNeural##ar-QA,ar-QA-MoazNeural##ar-SA,ar-SA-ZariyahNeural##ar-SA,ar-SA-HamedNeural##ar-SY,ar-SY-AmanyNeural##ar-SY,ar-SY-LaithNeural##ar-TN,ar-TN-ReemNeural##ar-TN,ar-TN-HediNeural##ar-AE,ar-AE-FatimaNeural##ar-AE,ar-AE-HamdanNeural##ar-YE,ar-YE-MaryamNeural##ar-YE,ar-YE-SalehNeural##bn-BD,bn-BD-NabanitaNeural##bn-BD,bn-BD-PradeepNeural##bn-IN,bn-IN-TanishaaNeural New##bn-IN,bn-IN-BashkarNeural New##bg-BG,bg-BG-KalinaNeural##bg-BG,bg-BG-BorislavNeural##my-MM,my-MM-NilarNeural##my-MM,my-MM-ThihaNeural##ca-ES,ca-ES-AlbaNeural##ca-ES,ca-ES-JoanaNeural##ca-ES,ca-ES-EnricNeural##zh-HK,zh-HK-HiuGaaiNeural##zh-HK,zh-HK-HiuMaanNeural##zh-HK,zh-HK-WanLungNeural##zh-CN,zh-CN-XiaochenNeural##zh-CN,zh-CN-XiaohanNeural##zh-CN,zh-CN-XiaomoNeural##zh-CN,zh-CN-XiaoqiuNeural##zh-CN,zh-CN-XiaoruiNeural##zh-CN,zh-CN-XiaoshuangNeural##zh-CN,zh-CN-XiaoxiaoNeural##zh-CN,zh-CN-XiaoxuanNeural##zh-CN,zh-CN-XiaoyanNeural##zh-CN,zh-CN-XiaoyouNeural##zh-CN,zh-CN-YunxiNeural##zh-CN,zh-CN-YunyangNeural##zh-CN,zh-CN-YunyeNeural##zh-TW,zh-TW-HsiaoChenNeural##zh-TW,zh-TW-HsiaoYuNeural##zh-TW,zh-TW-YunJheNeural##hr-HR,hr-HR-GabrijelaNeural##hr-HR,hr-HR-SreckoNeural##cs-CZ,cs-CZ-VlastaNeural##cs-CZ,cs-CZ-AntoninNeural##da-DK,da-DK-ChristelNeural##da-DK,da-DK-JeppeNeural##nl-BE,nl-BE-DenaNeural##nl-BE,nl-BE-ArnaudNeural##nl-NL,nl-NL-ColetteNeural##nl-NL,nl-NL-FennaNeural##nl-NL,nl-NL-MaartenNeural##en-AU,en-AU-NatashaNeural##en-AU,en-AU-WilliamNeural##en-CA,en-CA-ClaraNeural##en-CA,en-CA-LiamNeural##en-HK,en-HK-YanNeural##en-HK,en-HK-SamNeural##en-IN,en-IN-NeerjaNeural##en-IN,en-IN-PrabhatNeural##en-IE,en-IE-EmilyNeural##en-IE,en-IE-ConnorNeural##en-KE,en-KE-AsiliaNeural##en-KE,en-KE-ChilembaNeural##en-NZ,en-NZ-MollyNeural##en-NZ,en-NZ-MitchellNeural##en-NG,en-NG-EzinneNeural##en-NG,en-NG-AbeoNeural##en-PH,en-PH-RosaNeural##en-PH,en-PH-JamesNeural##en-SG,en-SG-LunaNeural##en-SG,en-SG-WayneNeural##en-ZA,en-ZA-LeahNeural##en-ZA,en-ZA-LukeNeural##en-TZ,en-TZ-ImaniNeural##en-TZ,en-TZ-ElimuNeural##en-GB,en-GB-LibbyNeural##en-GB,en-GB-SoniaNeural##en-GB,en-GB-RyanNeural##en-US,en-US-AmberNeural##en-US,en-US-AriaNeural##en-US,en-US-AshleyNeural##en-US,en-US-CoraNeural##en-US,en-US-ElizabethNeural##en-US,en-US-JennyNeural##en-US,en-US-MichelleNeural##en-US,en-US-MonicaNeural##en-US,en-US-SaraNeural##en-US,en-US-AnaNeural##en-US,en-US-BrandonNeural##en-US,en-US-ChristopherNeural##en-US,en-US-EricNeural##en-US,en-US-GuyNeural##en-US,en-US-JacobNeural##et-EE,et-EE-AnuNeural##et-EE,et-EE-KertNeural##fil-PH,fil-PH-BlessicaNeural##fil-PH,fil-PH-AngeloNeural##fi-FI,fi-FI-NooraNeural##fi-FI,fi-FI-SelmaNeural##fi-FI,fi-FI-HarriNeural##fr-BE,fr-BE-CharlineNeural##fr-BE,fr-BE-GerardNeural##fr-CA,fr-CA-SylvieNeural##fr-CA,fr-CA-AntoineNeural##fr-CA,fr-CA-JeanNeural##fr-FR,fr-FR-DeniseNeural##fr-FR,fr-FR-HenriNeural##fr-CH,fr-CH-ArianeNeural##fr-CH,fr-CH-FabriceNeural##gl-ES,gl-ES-SabelaNeural##gl-ES,gl-ES-RoiNeural##de-AT,de-AT-IngridNeural##de-AT,de-AT-JonasNeural##de-DE,de-DE-KatjaNeural##de-DE,de-DE-ConradNeural##de-CH,de-CH-LeniNeural##de-CH,de-CH-JanNeural##el-GR,el-GR-AthinaNeural##el-GR,el-GR-NestorasNeural##gu-IN,gu-IN-DhwaniNeural##gu-IN,gu-IN-NiranjanNeural##he-IL,he-IL-HilaNeural##he-IL,he-IL-AvriNeural##hi-IN,hi-IN-SwaraNeural##hi-IN,hi-IN-MadhurNeural##hu-HU,hu-HU-NoemiNeural##hu-HU,hu-HU-TamasNeural##id-ID,id-ID-GadisNeural##id-ID,id-ID-ArdiNeural##ga-IE,ga-IE-OrlaNeural##ga-IE,ga-IE-ColmNeural##it-IT,it-IT-ElsaNeural##it-IT,it-IT-IsabellaNeural##it-IT,it-IT-DiegoNeural##ja-JP,ja-JP-NanamiNeural##ja-JP,ja-JP-KeitaNeural##jv-ID,jv-ID-SitiNeural##jv-ID,jv-ID-DimasNeural##km-KH,km-KH-SreymomNeural##km-KH,km-KH-PisethNeural##ko-KR,ko-KR-SunHiNeural##ko-KR,ko-KR-InJoonNeural##lv-LV,lv-LV-EveritaNeural##lv-LV,lv-LV-NilsNeural##lt-LT,lt-LT-OnaNeural##lt-LT,lt-LT-LeonasNeural##mk-MK,mk-MK-MarijaNeural  ##mk-MK,mk-MK-AleksandarNeural  ##ms-MY,ms-MY-YasminNeural##ms-MY,ms-MY-OsmanNeural##ml-IN,ml-IN-SobhanaNeural  ##ml-IN,ml-IN-MidhunNeural  ##mt-MT,mt-MT-GraceNeural##mt-MT,mt-MT-JosephNeural##mr-IN,mr-IN-AarohiNeural##mr-IN,mr-IN-ManoharNeural##nb-NO,nb-NO-IselinNeural##nb-NO,nb-NO-PernilleNeural##nb-NO,nb-NO-FinnNeural##ps-AF,ps-AF-LatifaNeural  ##ps-AF,ps-AF-GulNawazNeural  ##fa-IR,fa-IR-DilaraNeural##fa-IR,fa-IR-FaridNeural##pl-PL,pl-PL-AgnieszkaNeural##pl-PL,pl-PL-ZofiaNeural##pl-PL,pl-PL-MarekNeural##pt-BR,pt-BR-FranciscaNeural##pt-BR,pt-BR-AntonioNeural##pt-PT,pt-PT-FernandaNeural##pt-PT,pt-PT-RaquelNeural##pt-PT,pt-PT-DuarteNeural##ro-RO,ro-RO-AlinaNeural##ro-RO,ro-RO-EmilNeural##ru-RU,ru-RU-DariyaNeural##ru-RU,ru-RU-SvetlanaNeural##ru-RU,ru-RU-DmitryNeural##sr-RS,sr-RS-SophieNeural##sr-RS,sr-RS-NicholasNeural##si-LK,si-LK-ThiliniNeural##si-LK,si-LK-SameeraNeural##sk-SK,sk-SK-ViktoriaNeural##sk-SK,sk-SK-LukasNeural##sl-SI,sl-SI-PetraNeural##sl-SI,sl-SI-RokNeural##so-SO,so-SO-UbaxNeural##so-SO,so-SO-MuuseNeural##es-AR,es-AR-ElenaNeural##es-AR,es-AR-TomasNeural##es-BO,es-BO-SofiaNeural##es-BO,es-BO-MarceloNeural##es-CL,es-CL-CatalinaNeural##es-CL,es-CL-LorenzoNeural##es-CO,es-CO-SalomeNeural##es-CO,es-CO-GonzaloNeural##es-CR,es-CR-MariaNeural##es-CR,es-CR-JuanNeural##es-CU,es-CU-BelkysNeural##es-CU,es-CU-ManuelNeural##es-DO,es-DO-RamonaNeural##es-DO,es-DO-EmilioNeural##es-EC,es-EC-AndreaNeural##es-EC,es-EC-LuisNeural##es-SV,es-SV-LorenaNeural##es-SV,es-SV-RodrigoNeural##es-GQ,es-GQ-TeresaNeural##es-GQ,es-GQ-JavierNeural##es-GT,es-GT-MartaNeural##es-GT,es-GT-AndresNeural##es-HN,es-HN-KarlaNeural##es-HN,es-HN-CarlosNeural##es-MX,es-MX-DaliaNeural##es-MX,es-MX-JorgeNeural##es-NI,es-NI-YolandaNeural##es-NI,es-NI-FedericoNeural##es-PA,es-PA-MargaritaNeural##es-PA,es-PA-RobertoNeural##es-PY,es-PY-TaniaNeural##es-PY,es-PY-MarioNeural##es-PE,es-PE-CamilaNeural##es-PE,es-PE-AlexNeural##es-PR,es-PR-KarinaNeural##es-PR,es-PR-VictorNeural##es-ES,es-ES-ElviraNeural##es-ES,es-ES-AlvaroNeural##es-UY,es-UY-ValentinaNeural##es-UY,es-UY-MateoNeural##es-US,es-US-PalomaNeural##es-US,es-US-AlonsoNeural##es-VE,es-VE-PaolaNeural##es-VE,es-VE-SebastianNeural##su-ID,su-ID-TutiNeural##su-ID,su-ID-JajangNeural##sw-KE,sw-KE-ZuriNeural##sw-KE,sw-KE-RafikiNeural##sw-TZ,sw-TZ-RehemaNeural##sw-TZ,sw-TZ-DaudiNeural##sv-SE,sv-SE-HilleviNeural##sv-SE,sv-SE-SofieNeural##sv-SE,sv-SE-MattiasNeural##ta-IN,ta-IN-PallaviNeural##ta-IN,ta-IN-ValluvarNeural##ta-SG,ta-SG-VenbaNeural##ta-SG,ta-SG-AnbuNeural##ta-LK,ta-LK-SaranyaNeural##ta-LK,ta-LK-KumarNeural##te-IN,te-IN-ShrutiNeural##te-IN,te-IN-MohanNeural##th-TH,th-TH-AcharaNeural##th-TH,th-TH-PremwadeeNeural##th-TH,th-TH-NiwatNeural##tr-TR,tr-TR-EmelNeural##tr-TR,tr-TR-AhmetNeural##uk-UA,uk-UA-PolinaNeural##uk-UA,uk-UA-OstapNeural##ur-IN,ur-IN-GulNeural##ur-IN,ur-IN-SalmanNeural##ur-PK,ur-PK-UzmaNeural##ur-PK,ur-PK-AsadNeural##uz-UZ,uz-UZ-MadinaNeural##uz-UZ,uz-UZ-SardorNeural##vi-VN,vi-VN-HoaiMyNeural##vi-VN,vi-VN-NamMinhNeural##cy-GB,cy-GB-NiaNeural##cy-GB,cy-GB-AledNeural##zu-ZA,zu-ZA-ThandoNeural##zu-ZA,zu-ZA-ThembaNeural`

       var arr = defaultLangs.split("##");
       arr.forEach(x=>{
           var itemArr = x.split(",");
           langs_dict[itemArr[0].toLowerCase()] = itemArr[1];
       });
   }

  return langs_dict;
}

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

        let lang = request.query['text'];

        if(lang == null){
            lang = "en-us";
        }else{
           lang = lang.toLowerCase();
        }

        if (txt == null) {
            throw `Invalid text: ${txt}`;
        }

        var voiceName = "en-US-AmberNeural";

        var langsDic = getLangs();
        if(langsDic.has(lang)){
            voiceName = langsDic.get(lang);
        }

        //zh-CN-XiaoxiaoNeural
        let ssml =`<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${lang}">
        <voice name="${voiceName}"> 
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