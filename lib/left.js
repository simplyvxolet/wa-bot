const fs = require('fs-extra')

module.exports = left = async (vf, event) => {
    //console.log(event.action)
    const left = JSON.parse(fs.readFileSync('./lib/database/left.json'))
    const isLeft = left.includes(event.chat)
    try {
        if (event.action == 'remove' && isLeft) {
            const gChat = await vf.getChatById(event.chat)
            const pChat = await vf.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pepe = await vf.getProfilePicFromServer(event.who)
            const capt = `Babayy @${event.who.replace('@c.us', '')}\nSyukron, beban grup *${name}* berkurang 1`
            if (pepe == '' || pepe == undefined) pepe = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU'
                await vf.sendFileFromUrl(event.chat, pepe, 'profile.jpg', capt)
            }
    } catch (err) {
        console.log(err)
    }
}