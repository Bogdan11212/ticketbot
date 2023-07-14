const Discord = require('discord.js')
const { QuickDB } = require('quick.db')

module.exports = {
    name: 'shop',
    description: 'Открыть магазин сервера',
    options: [],
    async execute(interaction) {

    const items = await db.get(`items_${interaction.guild.id}`)
    if(items == 0) await db.add(`items_${interaction.guild.id}`, 1)


      const things = await db.all().filter(i => i.ID.startsWith(`shop_${interaction.guild.id}`))
    console.log(things)
      if(!things[0]) return interaction.reply({ content: 'В магазине сервера нет никаких предметов!', ephemeral: true})

       const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `${interaction.guild.name} — Магазин`, iconURL: `${interaction.member.displayAvatarURL({ dynamic: true})}` })
        .setColor("Orange")
        .setTimestamp()

      let content = "";
      let i = 0

      while (i < items) {
          embed.addFields({ name: `${things[i].data.name}`, value: `Стоимость: **${things[i].data.price}** :coin:\n${things[i].data.description}`})
          i++;
      }


      await interaction.reply({
        embeds: [embed],
      });
  },
};