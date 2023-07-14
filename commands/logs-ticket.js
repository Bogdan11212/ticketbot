const Discord = require('discord.js')
const { QuickDB } = require('quick.db')

module.exports = {
    name: 'logs-ticket',
    description: 'Указать канал для логирования тикетов',
    options: [{
        name: 'logs-channel',
        type: Discord.ApplicationCommandOptionType.Channel,
        description: 'Канал',
        required: true,
    }],
    async execute(interaction) {

    const error = new Discord.EmbedBuilder()
      .setColor('Red')
      .setAuthor({ name: 'Произошла ошибка!' })
      .setTimestamp()
  if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator) && interaction.guild.ownerId !== interaction.user.id) {
      error.setDescription(`Вам не хватает прав на **Администратор**!`)
      return interaction.reply({ embeds: [error], epheremal: true })
  }

  const channel = interaction.options.getChannel('logs-channel');

  await db.set(`${interaction.guild.id}_logs-channel`, channel.id);

    let embed = new Discord.EmbedBuilder()
    .setColor("Green")
    .setAuthor({ name: `${interaction.guild.name} — Логирование тикетов` }) 
    .setDescription(`Канал для логирования тикетов был успешно изменен!`)
    .setTimestamp()
    await interaction.reply({ embeds: [embed], ephemeral: false });

  },
};