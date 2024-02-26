import openai from "./config/openai.js";
import readlineSync from "readline-sync";
import colors from "colors";

const main = async () => {
    console.log(colors.bold.green("welcome to the chatbot-ai"));
    console.log(colors.bold.green("You can start chatting with the bot"));

    const chatHistory = [];

    while (true) {
        const userInput = readlineSync.question(colors.red("you: "));

        try {
            const messages = chatHistory.map(([role, content]) => ({ role, content }));
            messages.push({ role: "user", content: userInput });

            const chatCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
            });

            const response = chatCompletion.choices[0].message.content;

            if (userInput.toLocaleLowerCase() === "exit") {
                console.log(colors.green("Bot: " + colors.white(response)));
                return;
            }
            console.log(colors.green("Bot: " + colors.white(response)));

            chatHistory.push(["user", userInput]);
            chatHistory.push(["assistant", response]);
        } catch (error) {
            console.error(colors.bold.red(error));
        }
    }
};
main();
