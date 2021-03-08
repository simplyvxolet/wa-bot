const fs = require('fs-extra')
	
module.exports = welcome = async (vf, event) => {
	const welkom = JSON.parse(fs.readFileSync('./lib/database/welcome.json'))
	const isWelkom = welkom.includes(event.chat)
    try {
        if (event.action == 'add' && isWelkom) {
            const gChat = await vf.getChatById(event.chat)
            const pChat = await vf.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pepe = await vf.getProfilePicFromServer(event.who)
            const capt = `Halo @${event.who.replace('@c.us', '')} 👋\nSelamat datang di *Grup ${name}*\n═══════════════════\nSelamat bergabung dan juga semoga betah disini.\n═══════════════════\n`
            if (pepe == '' || pepe == undefined) pepe = 'https://i.ibb.co/DthYrSB/a256bae0f5ed.jpg'
                await vf.sendFileFromUrl(event.chat, pepe, 'profile.jpg', capt)
            }
        } catch (err) {
            console.log(err)
        }
        }