const Discord = require('discord.js')
const { QuickDB } = require('quick.db')

module.exports = {
    name: 'managers-ticket',
    description: 'Указать роль для управления тикетами',
    options: [{
        name: 'managers-role',
        type: Discord.ApplicationCommandOptionType.Role,
        description: 'Роль',
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

  const role = interaction.options.getRole('managers-role')

  await db.set(`${interaction.guild.id}_managers-ticket`, role.id);
  
    let embed = new Discord.EmbedBuilder()
    .setColor("Green")
    .setAuthor({ name: `${interaction.guild.name} — Роль менеджера тикетами` }) 
    .setDescription(`Роль менеджера тикетами была успешно изменена!`)
    .setTimestamp()
    await interaction.reply({ embeds: [embed], ephemeral: false });

  },
};