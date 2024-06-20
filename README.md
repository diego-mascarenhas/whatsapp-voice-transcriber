# Voice Transcriber

![Voice Transcriber Banner](https://github.com/diego-mascarenhas/whatsapp-voice-transcriber/raw/main/assets/banner.jpg)

## Overview

**Voice Transcriber** is a convenient and efficient app designed to transcribe voice messages sent via WhatsApp into text. With our app, you can easily forward an audio message to the designated contact in the app, and it will quickly convert the voice message into readable text.

## Key Features

- **Voice to Text Conversion**: Effortlessly transcribe your WhatsApp voice messages into text.
- **Easy Forwarding**: Simply forward the voice message to the app's contact, and receive the transcription in no time.
- **Accurate Transcriptions**: High-quality and accurate text transcriptions of your audio messages.
- **User-Friendly Interface**: Intuitive and easy-to-use interface, making it accessible for everyone.

## Development

## Clone the repository

```sh
git clone git@github.com:diego-mascarenhas/whatsapp-voice-transcriber.git
cd whatsapp-voice-transcriber
```

## Configure environment variables

```sh
cp .env.example .env
vi .env

MYSQL_DB_HOST=your-database-host
MYSQL_DB_USER=your-database-user
MYSQL_DB_PASSWORD=your-database-password
MYSQL_DB_NAME=your-database-name
MYSQL_DB_PORT=3306

OPENAI_API_KEY=your-openai-api-key
EVENT_TOKEN=your-event-token

PORT=4000
```
If you do not have a MySQL server or need assistance setting one up, please contact us at [info@revisionalpha.es](mailto:info@revisionalpha.es). We are here to help you get started and ensure everything runs smoothly.

## Install dependencies

```sh
npm install
```

## Start the server

```sh
npm start
```

Once the development server is started you should be able to reach the demo page (eg. `http://localhost:4000`)

## Privacy Policy

At **Voice Transcriber**, we take your privacy seriously. We do not store any conversations or transcriptions. All voice messages and transcriptions are processed securely and immediately deleted after transcription. Your data is safe with us.

## How to Use

1. Forward the WhatsApp voice message you want to transcribe to the app's contact.
2. Receive the transcribed text message back in seconds.
3. Enjoy hassle-free transcription without worrying about privacy concerns.

## Contributing

Thank you for considering contributing to **Voice Transcriber!**

## Security Vulnerabilities

If you discover a security vulnerability within **Voice Transcriber**, please send an e-mail to Diego Mascarenhas Goytía via [diego.mascarenhas@icloud.com](mailto:diego.mascarenhas@icloud.com). All security vulnerabilities will be promptly addressed.

## License

The **Voice Transcriber** is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).