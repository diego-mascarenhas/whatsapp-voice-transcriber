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
const { textToVoice } = require("./services/eventlab");
const { init } = require('bot-ws-plugin-openai');
const ServerAPI = require('./http');

const MYSQL_DB_HOST = process.env.MYSQL_DB_HOST;
const MYSQL_DB_USER = process.env.MYSQL_DB_USER;
const MYSQL_DB_PASSWORD = process.env.MYSQL_DB_PASSWORD;
const MYSQL_DB_NAME = process.env.MYSQL_DB_NAME;
const MYSQL_DB_PORT = process.env.MYSQL_DB_PORT;

const welcomeFlow = require("./flows/welcome.flow");
const vendedorFlow = require('./flows/vendedor.flow')
const expertoFlow = require('./flows/experto.flow')
const pagarFlow = require('./flows/pagar.flow');

const employeesAddonConfig = {
    model: "gpt-3.5-turbo-16k",
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY,
};

const employeesAddon = init(employeesAddonConfig);

employeesAddon.employees([
    {
        name: "EMPLEADO_VENDEDOR",
        description:
            "Soy Cesar, el vendedor amable encargado de atentender si tienes intención de contratar nuestro servicio, mis respuestas son breves.",
        flow: vendedorFlow,
    },
    {
        name: "EMPLEADO_EXPERTO",
        description:
            "Mi nombre es Diego. Soy el engargado especializado en resolver tus dudas sobre nuestro chatbot conversacional. Este chatbot está diseñado para facilitar la automatización de ventas en tu negocio. Te proporcionaré respuestas concisas y directas para maximizar tu entendimiento.",
        flow: expertoFlow,
    },
    {
        name: "EMPLEADO_PAGAR",
        description:
            "Hola, mi nombre es Jorge, encargado de generar los links de pagos necesarios cuando un usuario quiera contratar el servicio.",
        flow: pagarFlow,
    },
    {
        name: "EMPLEADO_SOPORTE",
        description:
            "Mi nombre es Lucio. Soy del área de ayuda engargado de resolver temas técnicos. No suelo tener buen humor y te responderé el lenguaje técnico.",
        flow: expertoFlow,
    },
])

const flowConfirm = addKeyword('botones')
    .addAnswer('¿Confirmar solicitud?',
    {
        Buttons:[
            {
                body: 'Confirmar'
            },
            {
                body: 'Cancelar'
            }
        ]
    });

const flowVoice = addKeyword(EVENTS.VOICE_NOTE).addAction(
    async (ctx, ctxFn) => {
        await ctxFn.flowDynamic("Hemos solicitado lo siguiente:");
        console.log("🤖 voz a texto....");
        const text = await handlerAI(ctx);
        console.log(`🤖 Fin voz a texto....[TEXT]: ${text}`);

        const currentState = ctxFn.state.getMyState();
        const fullSentence = `${currentState?.answer ?? ""}. ${text}`;
        const { employee, answer } = await employeesAddon.determine(fullSentence);
        ctxFn.state.update({ answer });

        return ctxFn.flowDynamic(`${text}`);
    }
);

const flowTranscriber = addKeyword(EVENTS.VOICE_NOTE).addAction(
    async (ctx, ctxFn) => {
        console.log("🤖 voz a texto....");
        const text = await handlerAI(ctx);
        console.log(`🤖 Fin voz a texto....[TEXT]: ${text}`);

        ctxFn.flowDynamic(`🗣️ ✍️ ${text}`);
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
        //welcomeFlow,
        //vendedorFlow,
        //expertoFlow,
        //pagarFlow,
        //flowVoice,
        //flowConfirm
        flowTranscriber
    ]);

    const adapterProvider = createProvider(BaileysProvider);

    const httpServer = new ServerAPI(adapterProvider, adapterDB)

    const configBot = {
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    }

    const configExtra = {
        extensions: {
            employeesAddon
        }
    }

    createBot(configBot, configExtra);

    httpServer.start()
};

main();
