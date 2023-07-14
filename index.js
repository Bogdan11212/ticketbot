const fs = require('node:fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandType } = require('discord.js');

const config = require('./config.js');
const keep_alive = require('./keep_alive.js')

const path = require('node:path');
const { Client, ActionRowBuilder, ChannelType, ModalBuilder, SelectMenuBuilder, ButtonBuilder, TextInputBuilder, Collection, Events, GatewayIntentBits, REST, Routes, AuditLogEvent, EmbedBuilder, Partials, PermissionsBitField, PermissionFlagsBits } = require('discord.js');

global.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
partials: [Partials.Channel] });

global.db = require('quick.db')

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const data = []



for (const file of commandFiles) {
  const commandfile = require(`./commands/${file}`);
  client.commands.set(commandfile.name, commandfile);
  data.push({
    name: commandfile.name,
    description: commandfile.description,
    options: commandfile.options
  })
}











//логи консоли      
console.log(config.token);
console.log(config.voiceEditChannelId);
console.log(config.guildId);
console.log(config.voiceCreateChannelId);
console.log(config.voiceCategoryId);









client.once(Events.ClientReady, async (c, interaction) => {
		console.log(`
22222222222222222222222222222222X2222222222222222222222222222222222222222222222222222
22222222222222222222222222222Xi      :XX222222222222222222222222222222222222222222222
222222222222222222222222X ;3X2222222X22X5  X2X222222222222222222222222222222222222222
22222222222222222222X   : ,S:52222X222222X2XX X22222222222222222222222222222222222222
22222222222222223  s3XX 2X222222222X23s 3222222r 5X2222222222222222222222222222222222
2222222222222X  32  .2rXX22222222222222X;X X22222  2X22222222222222222222222222222222
22222222222X .X23  X22222222222222252225i2s3X 2X222 52X222222222222222222222222222222
22222222X2  222rX5X22X22222222222222X 2222X2,rX:32253 2222222222222222222222222222222
222222X2r 222Xs23 2222XXX222222222222XX,2X33X2 3X5X222 r22222222222222222222222222222
22222X2 ,X22222X 2X222XXXX22222222222222 X3i5223 3X222X3 2222222222222222222222222222
222222 X22222222S222222i3222s222222222222i525 32Xr 322222 XX2222222222222222222222222
222XX :2222222XXXX22222 322XXX2222222222223X225X XX 322222 ;X222222222222222222222222
222X3 222222X22 2222222 X22223i222222222222X:2 ,2 22s X222XXs222222222222222222222222
22XX 2X222222XX X2X2222 r2222XX X222222222223 3  X 2X2 2222X2 X2222222222222222222222
222  2222222XX3 2222222r X223X22,XX2222222222333,X2.22X 2X222X,2X22222222222222222222
22X X2222222X2is22222223 32X2 3X2 XX2222222222,33s22 222352XX2X 222222222222222222222
22S 3222222222,22222222X X222 2 22S32222222XiX2iX i 2 222X 23S2X X2222222222222222222
22 .X222222222 22222222X  222 22 XXs 2222222X,222X   Xi2XXX 23322 2222222222222222222
22 s2222222222,S222222X23 3XX 23   XX 2222X2X2s22XiS  2s2222 3,3X2 X22222222222222222
22 SX222222222s;222222X22 2 2 ,3XXX2i; :X r222X X2X.3  :s2X2X 33,XX X2222222222222222
22::2222X222X23 Xs2222222X i3 22222532   X S 3s2 ,2s3X3  222X2 3X3XXX2222222222222222
225 X22Xi222X2X 2,2222222XXXs22222 25X532:  5X3 : 3  3r3  2X22X ,X 2 3222222222222222
223 X222 X22222 2,sX222222X  22;3     XXX22  X325X522    S 222X2 3: 2 222222222222222
222 X22X2X22X2XXX2X 222222XX 23    SXX 5222223XX2Xr,    2   22X22 r  X 22222222222222
222iS2222 X2222223222X225X22S;  , 2 :2222222222225  X X23   33 323    32X222222222222
222X X222s222222.5r2 2225sX22   2S3X 222222222222, iSS22.    2X s23 s 3r2222222222222
2222 22222S2222X2S 3XX2222,22X 2  X5s222222222222X X 323      XX XX2:, r3222222222222
222XX32222 322222XXs2 322XXr2XX 22S;2222222222222X  X22       XX  23  5X3 32222222222
222X2 22223 X22222S 3X X2X23;223XXXX2222222222222222223        X3sX222223 3X222222222
222222,X222S XXX22 X 23 X2223X2,r222222222222222222222s        S2X2255     X222222222
222222X.22222,33S2X3 SXXXXX22X 32 5;X2222222222222,X2X2       ,22222 3  X   s22222222
222222X X222X X2:X2s2 22 X2222 2X 232222222222222XX2Xs      XX2X,:  Xr2XX   222222222
222222XX X2X23 r3s 2 siX2 Xs2X2 X3 3r22222222222X2X2      2222   2 S X 3X    ;X222222
22222222S 22XX3 X3; XS 3XX : 2X2 33iX 2SXX222225 2X    ;2X22  2s  X3  S322X2222 22222
222222222 ;X2XXX      X X22  3X23 :.i. 322XXX2 2XX2 iX252223  23r.X2X2222222X r222222
2222222222  53223 .  s 3 XXX   XX3 ;:s X32222XXXX22i 222222XXX2222222XS :3X2222222222
2222222222 X X XX2        X332  2XX  3X   3XX3X.222X3 X222222222X  iXX222222222222222
222222222XS   3 s22        2X;,  2X2   33XS   iX:222X3 X32X222 X522222222222222222222
2222222222X 325r  XX  3  s, 3X    X23   ,2XXX5X2 22,;2  32X33X23 22222222222222222222
2222222222i2X222 3X   .   X  33 r  S2X   3,2 32XX3,253XX222222222X2222222222222222222
222222222222222222222X525232 ; X3 5  5X    S X222 , ;:2222222222 32222222222222222222
2222222222222222222222222222X32. 3 X225  2i  3222  3X222222222X3 X2222222222222222222
2222222222222222222222222222222223222222222X2 s222 2233222222222 X2222222222222222222
2222222222222222222222222222222222222222222222:S22iS.322222352 32X2222222222222222222
222222222222222222222222222222222222222222222222.X 335225r    22222222222222222222222
2222222222222222222222222222222222222222222222222 ;;s2.3X2233222222222222222222222222
2222222222X3333333   32222222222222222222223333X22222222S   222223  s2222222222222222
222222222X       :   32X3333X2333223332233.    r22333332i   333X23  r333X222222222222
222222222X   33333   3;      ;l  3S   3S  ;2   r3       3       ;3        22222222222
222222222X       3   3   хх   3           22   r    2332i   2r   3  r23   22222222222
222222222X   32223   3;      ;23    X    222   rX       i   2r   3  r23   22222222222
2222222222222222222222222222222222222222222222222222222222222222222222222222222222222
222222222222222222222222222222222 Бот успешно # ${c.user.discriminator} 22222222222222222222222222222222
2222222222222222222222222222222222222222222222222222222222222222222222222222222222222
  `)














  


  




  
	client.guilds.cache.get(config.guildId)?.commands.set(data);

    const exampleEmbeda = new EmbedBuilder()
  .setColor('Orange')
  .setAuthor({ name: `Управление приватным голосовым каналом`})
  .setImage("https://media.discordapp.net/attachments/1076450292041789550/1115729045469016216/-_1.png?width=675&height=675")
  await client.channels.cache.get(config.voiceEditChannelId).send({ 
    embeds: [exampleEmbeda],
    components: [new ActionRowBuilder()
          .addComponents(new ButtonBuilder()
            .setStyle(2)
            .setEmoji('✏️')
            .setCustomId('rename')
            .setDisabled(false))
          .addComponents(new ButtonBuilder()
            .setStyle(2)
            .setEmoji('🔒')
            .setCustomId('lock')
            .setDisabled(false))
          .addComponents(new ButtonBuilder()
            .setStyle(2)
            .setEmoji('👥')
            .setCustomId('limit')
            .setDisabled(false))
        ], })

  client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  if (interaction.customId == 'rename') {
    const voices = await db.get(`user_${interaction.member.id}.voices`)
    if(!voices && voices == null && voices == undefined) await db.set(`user_${interaction.member.id}.voices`, 0)

    if(voices <= 0) {
      return interaction.reply({ content: 'У вас нет приватного голосового канала!', ephemeral: true})
    }

          const voicerename = new ModalBuilder()
            .setCustomId('voicerename')
            .setTitle('Изменение названия канала');
          voicerename.addComponents(new ActionRowBuilder()
            .addComponents(new TextInputBuilder()
              .setCustomId('voicerename_name')
              .setLabel("Новое название для голосового канала")
              .setStyle('Paragraph')
              .setRequired(true)
            ));
          await interaction.showModal(voicerename);

      client.on('interactionCreate', async (interaction, message) => {
      if (!interaction.isModalSubmit()) return;
      if (interaction.customId == 'voicerename') {
        if(interaction.fields.getTextInputValue(`voicerename_name`).length > 13) return interaction.reply({ content: 'Название приватного голосового канала не может быть больше 13-ти символов!', ephemeral: true})
        const iddvoice = await db.get(`user_${interaction.member.id}.idvoice`)
        let channnnn = client.channels.cache.get(iddvoice)
        channnnn.setName(interaction.fields.getTextInputValue(`voicerename_name`))

        await interaction.reply({ content: 'Название приватного голосового канала было изменено!', ephemeral: true}).catch(error => {
  if (error.code !== 40060) {
    console.log('Ой-ой! Ошибочка!');
  }
});
      }
    })

  }

  if (interaction.customId == 'lock') {
    const voices = await db.get(`user_${interaction.member.id}.voices`)
    if(!voices && voices == null && voices == undefined) await db.set(`user_${interaction.member.id}.voices`, 0)

    if(voices <= 0) {
      return interaction.reply({ content: 'У Вас нет приватного голосового канала!', ephemeral: true})
    }

    const voicelock = await db.get(`user_${interaction.member.id}.voicelock`)
    if(!voicelock && voicelock == null && voicelock == undefined) await db.set(`user_${interaction.member.id}.voicelock`, 0)

    const voicelocka = await db.get(`user_${interaction.member.id}.voicelock`)

    if(voicelocka == 0) {
      const iddvoice = await db.get(`user_${interaction.member.id}.idvoice`)
      let channnnn = client.channels.cache.get(iddvoice)
      channnnn.permissionOverwrites.edit(channnnn.guild.roles.everyone, { ViewChannel: false });

      await db.set(`user_${interaction.member.id}.voicelock`, 1)
      await interaction.reply({ content: 'Приватный голосовой канал закрыт!', ephemeral: true}).catch(error => {
  if (error.code !== 40060) {
    console.log('Ой-ой! Ошибочка!');
  }
});
    }

    if(voicelocka == 1) {
      const iddvoice = await db.get(`user_${interaction.member.id}.idvoice`)
      let channnnn = client.channels.cache.get(iddvoice)
      channnnn.permissionOverwrites.edit(channnnn.guild.roles.everyone, { ViewChannel: true });

      await db.set(`user_${interaction.member.id}.voicelock`, 0)
      await interaction.reply({ content: 'Приватный голосовой канал открыт!', ephemeral: true}).catch(error => {
  if (error.code !== 40060) {
    console.log('Ой-ой! Ошибочка!');
  }
});
    }

  }

  if (interaction.customId == 'limit') {
    const voices = await db.get(`user_${interaction.member.id}.voices`)
    if(!voices && voices == null && voices == undefined) await db.set(`user_${interaction.member.id}.voices`, 0)

    if(voices <= 0) {
      return interaction.reply({ content: 'У Вас нет приватного голосового канала!', ephemeral: true})
    }

          const voicelimit = new ModalBuilder()
            .setCustomId('voicelimit')
            .setTitle('Изменение лимита канала');
          voicelimit.addComponents(new ActionRowBuilder()
            .addComponents(new TextInputBuilder()
              .setCustomId('voicelimit_limit')
              .setLabel("Новый лимит для голосового канала")
              .setPlaceholder(`Можно указать до 99 пользователей!`)
              .setStyle('Short')
              .setRequired(true)
            ));
          await interaction.showModal(voicelimit);

      client.on('interactionCreate', async (interaction, message) => {
      if (!interaction.isModalSubmit()) return;
      if (interaction.customId == 'voicelimit') {
        if(interaction.fields.getTextInputValue(`voicelimit_limit`) > 99) {
          return interaction.reply({ content: 'Можно указать до 99 пользователей!', ephemeral: true})
        }
        const iddvoice = await db.get(`user_${interaction.member.id}.idvoice`)
        let channnnn = client.channels.cache.get(iddvoice)
        channnnn.setUserLimit(interaction.fields.getTextInputValue(`voicelimit_limit`))

        await interaction.reply({ content: 'Лимит приватного голосового канала был изменен!', ephemeral: true}).catch(error => {
  if (error.code !== 40060) {
    console.log('Ой-ой! Ошибочка!');
  }
});
      }
    })

  }
})
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand()) return;
  if (!client.commands.has(interaction.commandName)) return;
  try {
   await client.commands.get(interaction.commandName).execute(interaction);
  } catch (error) {
    console.log(error)
    return interaction.reply({
      content: 'Произошла ошибка!',
      ephemeral: true
    });
  }
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  let newUserChannel = newState.channel;
  let oldUserChannel = oldState.channel;
  if (oldUserChannel === null && newUserChannel !== null) {
    if(newUserChannel.id === config.voiceCreateChannelId) {

const voices = await db.get(`user_${newState.member.user.id}.voices`)
if(!voices && voices == null && voices == undefined) await db.set(`user_${newState.member.user.id}.voices`, 0)

if(voices >= 1) {
  const idvoice = await db.get(`user_${newState.member.user.id}.idvoice`)
  return newState.member.voice.setChannel(idvoice).catch(async(e) => await db.set(`user_${newState.member.user.id}.voices`, 0))
}

await db.add(`user_${newState.member.user.id}.voices`, 1)

const voicesa = await db.get(`user_${newState.member.user.id}.voices`)
console.log(voicesa)

const idvoice = await db.get(`user_${newState.member.user.id}.idvoice`)
if(!idvoice && idvoice == null && idvoice == undefined) await db.set(`user_${newState.member.user.id}.idvoice`, 0)

global.newChannel = await newState.guild.channels.create({
  name: `Комната ${newState.member.user.username}`,
  type: ChannelType.GuildVoice,
  parent: newState.channel.parent,
  permissionOverwrites: [
    {
      id: newState.member.user.id,
      allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.MuteMembers, PermissionsBitField.Flags.DeafenMembers],
    },
  ],
});
await newState.member.voice.setChannel(newChannel);
await db.set(`user_${newState.member.user.id}.idvoice`, newChannel.id)

const idvoicea = await db.get(`user_${newState.member.user.id}.idvoice`)

const ownervoice = await db.get(`user_${idvoicea}.ownervoice`)
if(!ownervoice && ownervoice == null && ownervoice == undefined) await db.set(`user_${idvoicea}.ownervoice`, 0)
await db.set(`user_${idvoicea}.ownervoice`, newState.member.user.id)

    }
    } else if (oldUserChannel !== null && newUserChannel === null) {
          if(oldUserChannel.parent.id === config.voiceCategoryId) {
        if(oldUserChannel != config.voiceCreateChannelId) {
        if(oldUserChannel.members?.size == 0) {
          let ownervoicea = await db.get(`user_${oldUserChannel.id}.ownervoice`)
          let voicesmember = await db.get(`user_${ownervoicea}.voices`)
          await db.set(`user_${ownervoicea}.voices`, 0)
          oldUserChannel.delete()
        }
        }
      }
    }
});

client.login(process.env.token);