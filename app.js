require('dotenv').config()

const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
    EVENTS
} = require("@bot-whatsapp/bot");

const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MySQLAdapter = require('@bot-whatsapp/database/mysql')
const { handlerAI } = require("./utils/utils");
const ServerAPI = require('./http');

const MYSQL_DB_HOST = process.env.MYSQL_DB_HOST;
const MYSQL_DB_USER = process.env.MYSQL_DB_USER;
const MYSQL_DB_PASSWORD = process.env.MYSQL_DB_PASSWORD;
const MYSQL_DB_NAME = process.env.MYSQL_DB_NAME;
const MYSQL_DB_PORT = process.env.MYSQL_DB_PORT;

const flowTranscriber = addKeyword(EVENTS.VOICE_NOTE).addAction(
    async (ctx, ctxFn) => {
        //console.log("🤖 voz a texto....");
        const text = await handlerAI(ctx);
        //console.log(`🤖 Fin voz a texto....[TEXT]: ${text}`);

        ctxFn.flowDynamic(`🗣️ Voice Transcriber\n\n ✍️ ${text}`);
    }
);

const main = async () => {
    const adapterDB = new MySQLAdapter({
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,
        database: MYSQL_DB_NAME,
        password: MYSQL_DB_PASSWORD,
        port: MYSQL_DB_PORT,
    });

    const adapterFlow = createFlow([
        flowTranscriber
    ]);

    const adapterProvider = createProvider(BaileysProvider);

    const httpServer = new ServerAPI(adapterProvider, adapterDB)

    const configBot = {
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    }

    createBot(configBot);

    httpServer.start()
};

main();
