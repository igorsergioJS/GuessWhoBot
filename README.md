# Guess Who Bot 

A Discord bot for a guessing game where friends try to discover each other's hidden character identities through questions. Similar to the 'Guess Who' card game."

## Installation

Follow the steps below to set up and run the bot on your Discord server:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/igorsergioJS/GuessWhoBot.git
   ```

2. **Install dependencies:**

   Make sure you have Node.js installed on your system. If not, download it [here](https://nodejs.org/).

   In the repository folder you've cloned, execute the following command:

   ```bash
   npm install
   ```

3. **Configure the bot token:**

   - Create a file named `token.json` in the project's root folder.
   - Add your Discord bot token to the `token.json` file in the following format:

   ```json
   {
       "token": "YOUR_TOKEN_HERE"
   }
   ```

4. **Run the bot:**

   Back in the terminal, execute the following command to start the bot:

   ```bash
   guesswho.js
   ```

   Replace `guesswho.js` with the name of the file where your bot code is located.


## Usage

Here are some commands you can use with the bot:

- `!guesswho`: Creates random pairs of users in the server. You need to mention at least two users.

- `!atribuir "palavra"`: Assigns a word to a specific user from the previously created pair. Make sure to use the command correctly and mention the target user.

- `!verpalavras`: Shows words assigned by other users on the server, excluding the word assigned to you.

## License

This project is licensed under the [MIT License](LICENSE).

