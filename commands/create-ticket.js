const Discord = require('discord.js')
const { QuickDB } = require('quick.db')

module.exports = {
    name: 'create-ticket',
    description: 'Отправить сообщение с созданием тикета',
    options: [{
        name: 'channel',
        type: Discord.ApplicationCommandOptionType.Channel,
      description: 'Канал для сообщения с созданием тикета',
      required: true
  }],
    async execute(interaction) {

    const channel = interaction.options.getChannel('channel');

    let manager = await db.get(`${interaction.guild.id}_managers-ticket`);
    let loggs = await db.get(`${interaction.guild.id}_logs-channel`);

  const error = new Discord.EmbedBuilder()
  .setColor('Red')
  .setAuthor({ name: 'Произошла ошибка!' })
  .setTimestamp()
   if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator) && interaction.guild.ownerId !== interaction.user.id) {
      error.setDescription(`Вам не хватает прав на **Администратор**!`)
      return interaction.reply({ embeds: [error], epheremal: true })
    }
    if(!manager && manager == null & manager == undefined) {
      error.setDescription(`Не указана роль для управления тикетами!\nУкажите её, используя \`/managers-ticket\``)
      return interaction.reply({ embeds: [error], epheremal: true })
    }
    if (channel.type != Discord.ChannelType.GuildText) {
      error.setDescription(`Нельзя выбрать голосовой канал для создания тикетов!`)
      return interaction.reply({ embeds: [error], epheremal: true })
     }

try {

    let emb = new Discord.EmbedBuilder()
      .setColor("#2f3136")
      .setTitle("Открыть тикет")
      .setDescription(
       "Нажмите кнопку ниже для создания тикета"
      );

    let row = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
        .setCustomId("open_ticket")
        .setLabel("Открыть тикет")
        .setEmoji("✉️")
        .setStyle("Primary")
    );

    channel.send({embeds: [emb],components: [row],})

client.on('interactionCreate', async interaction => {
    if (interaction.customId == 'open_ticket') {

      global.chan = await interaction.guild.channels.create({
          parent: null,
          name: `ticket-${interaction.member.id}`,
          topic: `Тикет, созданный ${interaction.user.tag}`,
          permissionOverwrites: [
            {
              id: interaction.user.id,
              allow: [Discord.PermissionsBitField.Flags.ReadMessageHistory, Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.AttachFiles],
            },
            {
              id: manager,
              allow: [Discord.PermissionsBitField.Flags.ReadMessageHistory, Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.AttachFiles],
            },
            {
              id: interaction.guild.roles.everyone,
              deny: [Discord.PermissionsBitField.Flags.ViewChannel],
            },
          ],
          type: Discord.ChannelType.GuildText,
        })

    let emba = new Discord.EmbedBuilder()
      .setColor("#2f3136")
      .setTitle("Тикет был успешно создан")
      .setDescription(
       "Опишите всю суть проблемы. Поддержка скоро ответит..."
      );

    let row = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
        .setCustomId("close_ticket")
        .setLabel("Закрыть тикет")
        .setEmoji("🔐")
        .setStyle("Danger")
    );

    await chan.send({embeds: [emba],components: [row]})

        await interaction.reply({ content: `Тикет был успешно создан (<#${chan.id}>)!`, ephemeral: true })

if(loggs && loggs != undefined && loggs != null) {
  const ticketon = new Discord.EmbedBuilder()
  .setColor('Green')
  .setDescription(`**Тикет был создан!**`)
  .addFields(
    { name: 'Тикет', value: `<#${chan.id}> (${chan.id})`, inline: true },
    { name: 'Создал', value: `<@${interaction.member.id}> (${interaction.member.id})`, inline: true },
  )
  .setTimestamp()
    await client.channels.cache.get(loggs).send({ embeds: [ticketon] })
  }
    }

    if (interaction.customId == 'close_ticket') {
        await interaction.reply({content:'Тикет был закрыт!'})

if(loggs && loggs != undefined && loggs != null) {
  const ticketoff = new Discord.EmbedBuilder()
  .setColor('Red')
  .setDescription(`**Тикет был закрыт!**`)
  .addFields(
    { name: 'Тикет', value: `<#${chan.id}> (${chan.id})`, inline: true },
    { name: 'Закрыл', value: `<@${interaction.user.id}> (${interaction.user.id})`, inline: true },
  )
  .setTimestamp()
    await client.channels.cache.get(loggs).send({ embeds: [ticketoff] })
  }

        await interaction.channel.delete()
    }
})
  

} catch(e) { console.log(e)}
  },
};