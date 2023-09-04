const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./token.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,

    ] ,
});

client.once('ready', () => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
});


const userWords = new Map();
const userPair = new Map();

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!guesswho')) {
        const mentionedUsers = message.mentions.users;

        if (mentionedUsers.size < 2) {
            message.channel.send('Você precisa mencionar pelo menos dois usuários.');
            return;
        }

        const usersArray = Array.from(mentionedUsers.values());
        const pairings = [];

        const shuffleUsersArray = shuffleArray(usersArray);

        for(let i = 0; i < shuffleUsersArray.length;i++)
        {
            if(i != (shuffleUsersArray.length) - 1)
            {
                const user1 = shuffleUsersArray[i];
                const user2 = shuffleUsersArray[i + 1];

                user1.send(`Seu par para o Guess Who é: ${user2.tag}`)
                pairings.push(`${user1.tag} recebeu ${user2.tag}`);
                userPair.set(user1.tag,user2.tag);


                // Limpa as palavras atribuídas pelos usuários anteriores para o usuário atual.
                userWords.set(user1.id, '');
            }
            else
            {
                const user1 = shuffleUsersArray[i]
                const user2 = shuffleUsersArray[0];

                user1.send(`Seu par para o Guess Who é: ${user2.tag}`)
                pairings.push(`${user1.tag} recebeu ${user2.tag}`);
                userPair.set(user1.tag,user2.tag);

                userWords.set(user1.id, '');
            }
        }

    }
    else if (message.content.startsWith('!atribuir')) {
        const user = message.author;
        const parts = message.content.split(' ');

        if (parts.length !== 2) {
            user.send('Comando incorreto. Use !atribuir palavra.');
            return;
        }

        const senderPair = userPair.get(user.tag);

        if (!senderPair) {
            user.send('Você não tem um par no Guess Who.');
            return;
        }

        const word = parts[1];

        const targetUser = client.users.cache.find((u) => u.tag === senderPair);

        if (!targetUser) {
            user.send('Usuário alvo não encontrado.');
            return;
        }

        if (!userWords.has(targetUser.id)) {
            user.send('Usuário alvo inválido.');
            return;
        }

        // Atribui a palavra ao usuário alvo.
        userWords.set(targetUser.id, word);

        // Envia uma mensagem informando a atribuição diretamente para o usuário que a enviou.
        user.send(`Você atribuiu a palavra "${word}" a ${targetUser.tag}`);

        message.delete();
    }

    else if (message.content.startsWith('!verpalavras')) {
        const user = message.author;
        const words = [];

        // Coleta as palavras atribuídas por outros usuários, exceto a palavra atribuída ao usuário atual.
        userWords.forEach((word, userId) => {
            if (userId !== user.id) {
                words.push(`${client.users.cache.get(userId).tag}: "${word}"`);
            }
        });

        if (words.length === 0) {
            user.send('Nenhuma palavra atribuída por outros usuários.');
        } else {
            user.send(`Palavras atribuídas por outros usuários:\n${words.join('\n')}`);
        }
    }
});

function shuffleArray(array) {
    const shuffled = [...array]; // Cria uma cópia do array para não modificá-lo diretamente.
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

client.login(token);