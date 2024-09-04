import { Bot, session, Keyboard, InlineKeyboard } from "grammy";
import "dotenv/config";
import { hydrateFiles } from "@grammyjs/files";
import { create, ogg2mp3 } from "./ogg2mp3.js";
import { transcription, chat } from "./openia.js";
import { emojiParser } from "@grammyjs/emoji";
import { stickers, randomForSticker } from "./stickers.js"; // arr.length = 53 (0,52)
import fs from "fs/promises";
import path from "path";
import { tiPidor } from "./ti_pidor/tiPidor.js";
import { google } from "./googleai.js";
import { download } from "./downloader.js";
import { image } from "./image.js";
const __dirname = path.resolve();

const randomForSticker1 = () => {
  let rndm = Math.floor(Math.random() * (stickers.length - 1 - 0 + 1) + 0);
  return rndm;
};

const initialState = { messages: [] };

const bot = new Bot(process.env.BOT_TOKEN);
bot.api.config.use(hydrateFiles(bot.token));
bot.use(emojiParser());
bot.use(
  session({
    initialState,
  })
);

const myId = process.env.TELEGRAM_ID;
const systemMsg = "SYSTEM_LOG: ";

const messagesArr = [];

bot.api.setMyCommands([
  { command: "horoshiy_chelovek", description: "Доброта для чатика" },
  { command: "rjomba", description: "Навалить кринжа" },
  { command: "bitochek", description: "Я богат?" },
  { command: "id", description: "ID?" },
  { command: "start", description: "Toggle keybord" },
  { command: "game", description: "Play a game" },
]);
(async () => {
  bot.command("start", (ctx) => {
    const menuKeybord = new Keyboard()
      .text("/horoshiy_chelovek")
      .row()
      .text("/rjomba")
      .row()
      .text("/bitochek")
      .row()
      .resized()
      .oneTime();
    ctx.reply("Меню:", { reply_markup: menuKeybord });
  });

  // bot.command("game", async (ctx) => {
  //   const gameKeybord = new InlineKeyboard().webApp(
  //     "Start",
  //     "https://google.com/"
  //   );
  //   await ctx.reply("Запустить игру", {
  //     reply_markup: gameKeybord,
  //   });
  // });

  bot.command("horoshiy_chelovek", async (ctx) => {
    const winner = await tiPidor();

    await ctx.replyWithSticker(
      "CAACAgIAAxkBAAEDweFl3OAvMYiNITYtwl0tp5Hb7V4JagACyDgAAhTTwUjXeylHTbAOVjQE"
    );
    await ctx.reply("Давайте узнаем кто же тут horoshiy_chelovek");
    await ctx.replyWithSticker(
      "CAACAgIAAxkBAAEDtCdl2S9nDUrjEKP-liI6a4FSnZy45QAC9jMAAm2UwUgQhUn8tLq6OTQE"
    );
    setTimeout(async () => {
      ctx.reply(`@${winner} ты horoshiy_chelovek`);
      if (winner === "KobernikDmitriy") {
        await ctx.replyWithSticker(
          "CAACAgIAAxkBAAEDtCVl2S9IZFDoJ5BWRiAvK_JUc69phAACTDkAAhedwEg-oqO1eaAKGTQE"
        );
      }
      if (winner === "volosheen") {
        await ctx.replyWithSticker(
          "CAACAgIAAxkBAAEDtCtl2TD3P9KVtmLvJbF-A47GW6AF4wACmDAAAlEYwEh6eUiX8CR8RjQE"
        );
      }
      if (winner === "nakaleydorisun") {
        await ctx.replyWithSticker(
          "CAACAgIAAxkBAAEDtC1l2THATpgX74Uu3VMb8EvTkBwbzQACwzAAAmUywUhRnmQuBwTQUjQE"
        );
      }
      if (winner === "Space_191") {
        await ctx.replyWithSticker(
          "CAACAgIAAxkBAAEDtC9l2THtyNbrWaXlOOnpHPJU83F9vgAChTkAAkZHwEjev9eY_9wdkjQE"
        );
      }
      if (winner === "vaalltteer") {
        await ctx.replyWithSticker(
          "CAACAgIAAxkBAAEDtDFl2TIgJ2rLLu_SLHm4R52-kMHvpAACVjgAAkWwwEjI_BA_3ZV8KzQE"
        );
      }
      if (winner === "artfeefteen") {
        await ctx.replyWithSticker(
          "CAACAgIAAxkBAAEDtDNl2TJtC3xqvAt_hA52wnABc-RtzQACKTkAAgMvwEgLqyRhDYQ21jQE"
        );
      }
      if (winner === "underscorehyypia") {
        await ctx.replyWithSticker(
          "CAACAgIAAxkBAAEDtDVl2TKQzyNmiIhwXOPY1SwnIHeppwACyDgAAhTTwUjXeylHTbAOVjQE"
        );
      }
      if (winner === "max_trj") {
        await ctx.replyWithSticker(
          "CAACAgIAAxkBAAEDtDdl2TQ6sUG8g82_YCI4R6LK7QwipwACzxIAAloeqUgZVnSi_MembjQE"
        );
      }
      if (winner === "nastyatachka") {
        await ctx.replyWithSticker(
          "CAACAgIAAxkBAAEDtDll2TRmsbZhbGx7fBjqFIOm-WHoMgAC2zgAAuC1wEhMj1r9A9qNOTQE"
        );
      }
    }, 4000);
  });

  bot.command("rjomba", async (ctx) => {
    const rjombaKeybord = new InlineKeyboard().text("🥰").text("🤯").text("🫡");
    const chatGPT = await chat([
      {
        role: "user",
        content:
          "Напиши глупый анекдот доставщика льда Коберника, который приехал доставлять лед в солон массажа, где оказывают особую услугу",
      },
    ]);
    await ctx.reply(chatGPT.message.content, {
      reply_markup: rjombaKeybord,
      disable_notification: true,
    });
    // await ctx.replyWithSticker(
    //   "CAACAgIAAxkBAAED5dJl5hwuqvsz9Grv229ezbOBzIKpgAACQzgAAhn2wUi9VYfRPFL2wjQE",
    //   {
    //     disable_notification: true,
    //   }
    // );
  });

  bot.on("callback_query:data", async (ctx) => {
    await ctx.reply(ctx.callbackQuery.data);
  });

  bot.command("bitochek", async (ctx) => {
    // https://api.coinlore.net/api/ticker/?id=90
    await fetch("https://api.coinlore.net/api/ticker/?id=90")
      .then((response) => response.json())
      .then((data) => ctx.reply(data[0].price_usd));
  });

  bot.command("id", async (ctx) => {
    ctx.reply(`${ctx.from.first_name} твой ID ${ctx.from.id}`);
  });

  bot.on(":text", async (ctx) => {
    ctx.session ??= initialState;
    let userName = ctx.message.from.username;
    let userId = ctx.message.from.id;
    let userMessage = ctx.message.text;
    let messageId = ctx.message.message_id;
    let firstName = ctx.message.from.first_name;
    let userData = `User ${userName}: ${ctx.message.text} \n`;

    if (userMessage.toLocaleLowerCase().includes("окей гугл")) {
      console.log(userMessage, "мы попали в условие окей гугл");
      const answer = await google(userMessage);
      await ctx.reply(`Google Gemini: ${answer}`);
    }

    if (userMessage.toLowerCase().includes("вальтер")) {
      ctx.react("🥰");
      // ctx.replyWithSticker(
      //   "CAACAgIAAxkBAAEDwnpl3RlBhwV2SONzQqAM21cCh2UVfQACBjUAAvcqwUiYwe-y_e0TETQE"
      // );
    }
    if (
      userMessage.includes("@nuetovoiceBot") ||
      (ctx.message.chat.type === "private" && !userMessage.includes("/pidor"))
    ) {
      console.log(`User ${userName}: ${userData}`);
      await bot.api.sendMessage(
        myId,
        `${systemMsg}${userName} отправил текстовое сообщение боту: ${userMessage}`
      );
      fs.appendFile(`./logs/${userName}.txt`, userData, function (error, data) {
        if (error) {
          return console.log(error);
        }
      });

      // const messages = [{ role: "user", content: ctx.message.text }];
      ctx.session.messages.push({ role: "user", content: ctx.message.text });
      const chatGPT = await chat(ctx.session.messages);
      console.log(ctx.session.messages, "!!!!!ТО ЧТО ОТПРАВЯЕТСЯ В chat()!!!");

      let firstSymbol = chatGPT.message.content.charAt(0).toLowerCase();
      let rest = chatGPT.message.content.slice(1);
      let chatGPTAnswer = firstSymbol + rest;

      await ctx.reply(`${firstName}, ${chatGPTAnswer}`, {
        reply_parameters: { message_id: ctx.message.message_id },
      });
      ctx.session.messages.push({
        role: "assistant",
        content: chatGPT.message.content,
      });
      console.log(ctx.session);
      let chatGPTData = `Chat GPT: ${chatGPT.message.content} \n`;
      fs.appendFile(
        `./logs/${userName}.txt`,
        chatGPTData,
        function (error, data) {
          if (error) {
            return console.log(error);
          }
        }
      );
      console.log("Chat GPT: ", chatGPT.message.content);
    } else return;
  });

  // bot.on(":sticker", async (ctx) => {
  //   let random = randomForSticker();
  //   let sticketToSend = stickers[random];
  //   if (stickers.includes(sticketToSend)) {
  //     ctx.replyWithSticker(sticketToSend);
  //   } else {
  //     ctx.reply(`не будет стикера`);
  //   }
  // });

  bot.on(":voice", async (ctx) => {
    try {
      const file = await ctx.getFile();
      const userId = await ctx.message.from.id;
      const userName = await ctx.message.from.username;
      const oggFileUrl = await file.getUrl(); // нативный метод
      await bot.api.sendMessage(userId, "`Перевожу...:`", {
        parse_mode: "MarkdownV2",
      });
      const oggFilePath = await create(oggFileUrl, userId, userName);
      const mp3FilePath = await ogg2mp3(oggFilePath, userId, userName);
      const userMessage = await transcription(mp3FilePath); // выключаем

      // await bot.api.sendMessage(userId, "`Перевод временно отключен`", {
      //   parse_mode: "MarkdownV2",
      // });

      await bot.api.sendMessage(userId, `${userName}: ${userMessage}`); // выключаем
      const messages = [{ role: "user", content: userMessage }];
      const chatGPT = await chat(messages);
      await ctx.reply(chatGPT.message.content);
      const chatGPTMessage = chatGPT.message.content;
      fs.appendFile(
        `./logs/${userName}.txt`,
        `${userName}: ${userMessage} \n`,
        function (error, data) {
          if (error) {
            return console.log(error);
          }
        }
      );
      fs.appendFile(
        `./logs/${userName}.txt`,
        `Chat GPT: ${chatGPTMessage} \n`,
        function (error, data) {
          if (error) {
            return console.log(error);
          }
        }
      );

      await bot.api.sendMessage(
        myId,
        `${systemMsg}Пользователь ${userName} с id:${userId} отправил голосовое сообщение сообщение: ${userMessage}`
      );

      let newMessage = {
        id: userId,
        userName,
        content: userMessage, // выключаем
        time: new Date().toISOString(),
      };
      messagesArr.push(newMessage);
      console.log(messagesArr);
    } catch (e) {
      console.log("Voice error", e.message);
    }
  });

  // bot.on("message:photo", async (ctx) => {
  //   if (ctx.message.caption) {
  //     try {
  //       const file = await ctx.getFile();
  //       const userId = ctx.message.from.id;
  //       const userName = ctx.message.from.username;
  //       const prompt = ctx.message.caption;
  //       const context =
  //         "и расскажи на сколько Путин молодец и как Слава его уважает";
  //       if (prompt) console.log(prompt);
  //       const imgFileUrl = await file.getUrl(); // нативный метод
  //       const raandomId = Math.random();
  //       const imgFilePath = await download(
  //         imgFileUrl,
  //         userId,
  //         userName,
  //         raandomId
  //       );
  //       const reply = await image(
  //         `/Users/air/Desktop/coding/botAPI/img/${userId}_${userName}_${raandomId}.png`,
  //         prompt + context
  //       );
  //       await ctx.reply(reply, {
  //         reply_parameters: { message_id: ctx.message.message_id },
  //       });
  //     } catch (e) {
  //       console.log("Image error", e.message);
  //       await ctx.reply("что-то пошло не так, отправь фотку еще раз :(", {
  //         reply_parameters: { message_id: ctx.message.message_id },
  //       });
  //     }
  //   } else return;
  // });
})();

bot.start(
  { allowed_updates: ["chat_member", "message", "callback_query"] },
  () => {
    ctx.session = initialState;
    console.log("Bot started");
  }
);
