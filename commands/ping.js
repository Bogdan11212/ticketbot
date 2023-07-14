const Discord = require('discord.js')
const { QuickDB } = require('quick.db')

module.exports = {
    name: 'ping',
    description: 'Пинг бота',
    options: [],
    async execute(interaction) {
        await interaction.reply('Мой пинг: ${client.ws.ping} мс.');
    },
}; 
