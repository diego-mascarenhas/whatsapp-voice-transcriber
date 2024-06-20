const { addKeyword } = require("@bot-whatsapp/bot");
/**
 * FLujo Inteligente (va a ser activado por una intencion de una persona o por palabra clave)
 * Flujo de bienvenida
 */
module.exports = addKeyword('soporte', { sensitive: true })
    .addAction(async (_, { state, flowDynamic }) => {
        const currentState = state.getMyState()
        return flowDynamic(`Hola soy Lucio del área de soporte técnico...`)
    })
