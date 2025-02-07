# 2020 Hurricane Information Chatbot

An interactive chatbot that provides detailed information about hurricanes from the 2020 Atlantic hurricane season, powered by OpenAI's GPT-4.

## Features

- Real-time responses about 2020 hurricanes
- Information about storm categories, wind speeds, and dates
- Details about notable hurricanes including:
  - Hurricane Iota (Category 5, 160mph winds)
  - Hurricane Laura (Category 4, 150mph winds)
  - Hurricane Eta (Category 4, 150mph winds)
  - Hurricane Delta (Category 4, 145mph winds)
  - Hurricane Zeta (Category 2, 110mph winds)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hurricane-chatbot.git
   cd hurricane-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. The server will run on port 3000 by default (or your specified PORT in environment variables)

3. Send POST requests to `/api/chat` with your questions about 2020 hurricanes:
   ```bash
   curl -X POST http://localhost:3000/api/chat \
   -H "Content-Type: application/json" \
   -d '{"message": "Tell me about Hurricane Laura"}'
   ```

## API Endpoints

### POST /api/chat
Accepts JSON with a message field and returns hurricane information.

Example request body:
```json
{
    "message": "What was the strongest hurricane of 2020?"
}
```

## Data Coverage

The chatbot contains detailed information about all named storms from the 2020 Atlantic hurricane season, including:
- Storm names and dates
- Maximum sustained winds and gusts
- Storm categories
- Geographic tracking data

## Technologies Used

- Node.js
- Express.js
- OpenAI GPT-4 API
- dotenv for environment management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data sourced from official 2020 hurricane records
- Powered by OpenAI's GPT-4 language model
