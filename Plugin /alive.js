const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "🎈",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // System status message
        const status = `╭━━〔 *BOOM-MD* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *⏳Uptime*:  ${runtime(process.uptime())} 
┃◈┃• *📟 Ram usage*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃◈┃• *⚙️ HostName*: ${os.hostname()}
┃◈┃• *👨‍💻 Owner*: MR NETHUM OFC
┃◈┃• *🧬 Version*: V1 BETA
┃◈└───────────┈⊷
╰──────────────┈⊷

   programing.𝐢𝐦 𝐚𝐥𝐢𝐯𝐞 𝐧𝐨𝐰. 

  https://whatsapp.com/channel/0029Vb5uBooJENxuVRMt6o0x/468

> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ɴᴇᴛʜᴜ ᴏꜰᴄ`;

        // Voice message URL (PTT voice message)
        const voiceUrl = 'https://files.catbox.moe/678eav.mp4';

        // 1. Send PTT Voice First (With Channel View Link)
        const voiceMessage = await conn.sendMessage(from, {
            audio: { url: voiceUrl },
            mimetype: 'audio/mpeg',
            ptt: true, // Send as voice message (PTT)
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363357105376275@g.us@newsletter',
                    newsletterName: 'ᴍʀ ɴᴇᴛʜᴜ ᴏꜰᴄ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Wait for 2 seconds before sending image + text
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 2. Send Image + Caption After Voice
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/u7tkq9.jpg` }, // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363357105376275@g.us@newsletter',
                    newsletterName: 'ᴍʀ ɴᴇᴛʜᴜ ᴏꜰᴄ',
                    serverMessageId: 143
                }
            }
        }, { quoted: voiceMessage });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
