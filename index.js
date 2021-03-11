const { create, vf } = require('@open-wa/wa-automate')
const { color, options } = require('./function')
const left = require('./lib/left')
const welcome = require('./lib/welcome')
const fs = require('fs-extra')
const HandleMsg = require('./HandleMsg')


const start = async (aruga = new aruga()) => {
    console.log(color('[URBAE BOT]', 'magenta'), color('URBAE BOT is now online!', 'aqua'))
    
    aruga.onStateChanged((state) => {
        console.log(color('-> [STATE]'), state)
        if (state === 'CONFLICT') aruga.forceRefocus()
        if (state === 'UNPAIRED') aruga.forceRefocus()
    })

    aruga.onAddedToGroup(async (chat) => {
        await aruga.sendText(chat.groupMetadata.id, 'Terima kasih sudah memasukkan bot kedalam grup kalian')
        await aruga.leaveGroup(chat.groupMetada.id)
    })
	
	aruga.onGlobalParticipantsChanged((async (heuh) => {
            await welcome(aruga, heuh) 
            left(aruga, heuh)
            }))

    aruga.onMessage((message) => {
        HandleMsg(aruga, message)
    })

    aruga.onIncomingCall(async (call) => {
        await aruga.sendText(call.peerJid, `Kamu telah menelpon BOT\nMaaf kamu akan diblockir!\nChat owner: wa.me/${ownerNumber} agar dibuka blok-nya!`)
        await aruga.contactBlock(call.peerJid)
            .then(() => console.log(`Seseorang menelpon BOT, dan telah diblokir. ID: ${call.peerJid}`))
    })
}
create(options(start))
    .then((aruga) => start(aruga))
    .catch((err) => console.error(err))