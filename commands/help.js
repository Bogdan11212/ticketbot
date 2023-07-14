const Discord = require('discord.js')
const { QuickDB } = require('quick.db')

module.exports = {
    name: 'help',
    description: 'Посмотреть команды сервера',
    options: [],
    async execute(interaction) {
      
    let embed = new Discord.EmbedBuilder()
    .setColor("Green")
    .setAuthor({ name: `Доступные команды:` }) 
    .setDescription(`**📋  Информация** \n\n */help* \n ┗ Покажет весь список команд, доступный вызвавшему участнику. \n\n */clan_info* \n ┗ Покажет всю информацию о клане. \n\n */server_info* \n ┗ Покажет информацию о сервере. \n\n\n **🛡️  Модерирование** \n\n */ban* \n ┗ Бан участника. \n\n */kick* \n ┗ Кик участника. \n\n */mute* \n ┗ Мут участника. \n\n */unban* \n ┗ Снимает бан с участника. \n\n */unmute* \n ┗ Снимает мут у участника. \n\n */clear* \n ┗ Чистит указанное кол-во сообщений в чате. \n\n\n **🏆  Рейтинг**  \n\n */rank* \n ┗ Покажет участнику его уровень. \n\n\n **🎵  Музыка** \n\n */play* \n ┗ Включает музыку. \n\n */stop* \n ┗ Ставит на паузу музыку. \n\n */skip* \n ┗ Скапает музыку. \n\n */volume* \n ┗ Настраивает громкость. \n\n\n ** :coin: Экономика** `)                                                    
    

    await interaction.reply({ embeds: [embed], ephemeral: false });

      
  },
};