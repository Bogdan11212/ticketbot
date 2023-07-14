const Discord = require('discord.js')
const { QuickDB } = require('quick.db')

module.exports = {
    name: 'use',
    description: 'Использовать предмет',
    options: [{
        name: 'name',
        type: Discord.ApplicationCommandOptionType.String,
      description: 'Название предмета',
      required: true
  }],
    async execute(interaction) {

    const name = interaction.options.getString('name');

    const item = await db.get(`inventory_${interaction.guild.id}_${interaction.member.id}_${name}`)
    if(!item) return interaction.reply({ content: 'Предмет не найден!', epheremal: true})
      
    let inv = db.fetch(`items_${interaction.guild.id}_${interaction.member.id}`)
    if(!inv && inv == null && inv == undefined) await db.set(`items_${interaction.guild.id}_${interaction.member.id}`, 0)

    await db.subtract(`items_${interaction.guild.id}_${interaction.member.id}`, 1)

    await db.delete(`inventory_${interaction.guild.id}_${interaction.member.id}_${name}`)

    if(item.newaddrole) {
      interaction.member.roles.add(item.newaddrole)
    }

      const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `Успешно!` })
        .setColor("Green")
        .setDescription(`Предмет успешно использован!`)
        .setTimestamp()

      await interaction.reply({
        embeds: [embed],
      });
  },
};