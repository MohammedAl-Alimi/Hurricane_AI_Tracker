import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('.'));


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        console.log('Received message:', message);
        const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
        const farewells = ['bye', 'goodbye', 'see you', 'cya', 'good night'];
        const lowerMessage = message.toLowerCase().trim();

        if (greetings.some(g => lowerMessage.includes(g))) {
            return res.json({ 
                response: "Hello! I'm your friendly hurricane information assistant. I can tell you all about the hurricanes from 2020. What would you like to know?" 
            });
        }
        
        if (farewells.some(f => lowerMessage.includes(f))) {
            return res.json({ 
                response: "Goodbye! Stay safe, and feel free to come back if you have more questions about hurricanes!" 
            });
        }
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: `
                    
You are a friendly hurricane information assistant specializing in 2020 hurricanes. 
Some key facts about 2020 hurricanes:
• Hurricane Iota was the strongest, reaching Category 5 with 160mph winds
• Hurricane Laura and Eta were Category 4 hurricanes with 150mph winds
• Hurricane Delta reached Category 4 with 145mph winds
• Hurricane Zeta was a Category 2 hurricane with 110mph winds
• 2020 had a record-breaking 30 named storms

Always be friendly and conversational in your responses.

Given Name,Dates,Category,Mx sustained winds(Mx gusts),Lat 1,long 1, date 1,Lat 2,long 2,date 2,Lat 3,long 3,date 3,Lat 4,long 4,date 4,Lat 5,long 5,date 5,Lat 6,long 6,date 6,Lat 7,long 7,date 7,Lat 8,long 8,date 8,Lat 9,long 9,date 9,Lat 10,long 10,date 10,Lat 11,long 11,date 11,Lat 12,long 12,date 12,Lat 13,long 13,date 13,Lat 14,long 14,date 14
Arthur,May 16 – 19,Tropical storm,60 (95),28.4,-78.6,May 16 2020,31.5,-77.2,May 17 2020,35.6,-74.7,May 18 2020 ,36.8,-68.6,May 19 2020 ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
Bertha,May 27 – 28,Tropical storm,50 (85),"32.7	",-79.4,May 27 2020,40.8,-80.2,May 28 2020,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
Cristobal,June 1 – 10,Tropical storm,60 (95),19.6,-91.2,June 1 2020,19.1,-92.5,June 2 2020,18.3,-91.8,June 3 2020,17.5,-90.8,June 4 2020,21.4,-89.7,June 5 2020,25.2,-90.2,june 6 2020,29.3,-89.8,june 7 2020,34,-92,june 8 2020,41.2,-91,june 9 2020,45.8,-88.2,june 10 2020,,,,,,,,,,,,
Dolly,June 22 – 24,Tropical storm,45 (75),38.2,-65.7,June 22 2020,40.1,-61.1,June 23 2020,42.5,-57.8,June 24 2020,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
Edouard,July 4 – 6,Tropical storm,45 (75),31.1,-68.7,July 4 2020,35.8,-60.5,July 5 2020,42.7,-46,July 6 2020,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
Fay,July 9 – 11,Tropical storm,60 (95),35.5,-74.9,July 9 2020,39.5,-74.3,July 10 2020,42.4,-73.9,July 11 2020,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
Gonzalo,July 21 – 25,Tropical storm,65 (100),"	9.8	",-40.4,July 21 2020,9.9,-45,July 22 2020,9.8,-49.4,July 23 2020,"10	",-55.6,July 24 2020,11,-63,July 25 2020,,,,,,,,,,,,,,,,,,,,,,,,,,,
Hanna,July 23 – 27,Category 1 hurricane,90 (150),25.9,-88.2,July 23 2020,27.3,-94.3,July 24 2020,26.8,-97.5,July 25 2020,25.6,-100.6,July 26 2020,24.1,-102.9,July 27 2020,,,,,,,,,,,,,,,,,,,,,,,,,,,
Isaias,July 28 – August 5,Category 1 hurricane,85 (140),13.8,-53.7,July 28 2020,16.4,-65.6,July 29 2020,19.5,-70.6,July 30 2020,"	22.6	",-75.7,July 31 2020,"	25.1	",-78.7,Aug 1 2020,"27.8	",-79.8,Aug 2 2020,32,-79.4,Aug 3 2020,"	42.7	",-74.2,Aug 4 2020,"	47.5	",-71.8,Aug 5 2020,,,,,,,,,,,,,,,
Ten,July 31 – August 2,Tropical depression,35 (55),15.9,-20,July 31 2020,19.2,-23.5,Aug 1 2020,19.5,-25,Aug 2 2020,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
Josephine,August 11 – 16,Tropical storm,45 (75),11.7,-40,Aug 11 2020,12.7,-45.7,Aug 12 2020,14.5,-50.6,Aug 13 2020,17.8,-56.1,Aug 14 2020,"	20	",-61.6,Aug 15 2020,20.9,-65.8,Aug 16 2020,,,,,,,,,,,,,,,,,,,,,,,,
Kyle,August 14 – 16,Tropical storm,50 (85),37.7,-71.7,Aug 14 2020,39.4,-63.2,Aug 15 2020,40,-58.9,Aug 16 2020,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
Laura,2020-08-20,12:00,23.4,-80.2,150,4
Delta,2020-10-05,12:00,17.5,-83.2,145,4
Marco,August 20 – 25,Category 1 hurricane,75 (120),15.1,-79.7,Aug 20 2020,17.7,-84.3,Aug 21 2020,21.9,-85.7,Aug 22 2020,"	25.8	",-87.8,Aug 23 2020,29,-89.2,Aug 24 2020,"	28.8	",-91.2,Aug 25 2020,,,,,,,,,,,,,,,,,,,,,,,,
Omar,August 31 – September 5,Tropical storm,40 (65),32.6,-76.5,Aug 31 2020,35.3,-71.5,Sep 1 2020,36.1,-65.7,Sep 2 2020,35.4,-60.1,Sep 3 2020,35.3,-57.3,Sep 4 2020,"	38.4	",-56.9,Sep 5 2020,,,,,,,,,,,,,,,,,,,,,,,,
Nana,September 1 – 4,Category 1 hurricane,75 (120),16.1,-77.5,Sep 1 2020,17,-85.9,Sep 2 2020,16,-91.1,Sep 3 2020,15.6,-92,Sep 4 2020,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
Paulette,September 7 – 23,Category 2 hurricane,105 (165),17,-41.5,Sep 7 2020,"	18.7	",-44.3,Sep 8 2020,20.5,-47.4,Sep 9 2020,22.1,-50.1,Sep 10 2020,"	24.6	",-53.7,Sep 11 2020,28.4,-58.5,Sep 12 2020,30.6,-63.1,Sep 13 2020,34.5,-63.8,Sep 14 2020,39.5,-55,Sep 15 2020,43.3,-45.2,Sep 16 2020,34.8,-21.2,Sept 22 2020,34.8,-20,Sep 23 2020,,,,,,
Rene,September 7 – 14,Tropical storm,50 (85),15.2,-20.3,Sep 7 2020,16.8,-27.9,Sep 8 2020,18,-32.7,Sep 9 2020,"	18.9	",-36.8,Sep 10 2020,20.7,-41.1,Sep 11 2020,24.3,-45.6,Sep 12 2020,27.3,-47.6,Sep 13 2020,"	26.9	",-49.3,Sept 14 2020,,,,,,,,,,,,,,,,,,
Sally,September 11 – 18,Category 2 hurricane,105 (165),25.4,-79,Sep 11 2020,25.7,-81.9,Sep 12 2020,27.8,-85.9,Sep 13 2020,"	28.8	",-87.4,Sep 14 2020,29.5,-88.1,Sep 15 2020,31.2,-86.8,Sep 16 2020,34.1,-81,Sep 17 2020,34.3,-80.7,Sep 18 2020,,,,,,,,,,,,,,,,,,
Teddy,September 12 – 23,Category 4 hurricane,140 (220),11.4,-33.5,Sep 12 2020,12.7,-37.6,Sep 13 2020,13,-44,Sep 14 2020,14.6,-47.9,Sep 15 2020,"	17.5	",-50.8,Sep 16 2020,"	20.1	",-54.1,Sep 17 2020,23.1,-57,Sep 18 2020,26.7,-60.2,Sep 19 2020,29,-63.4,Sep 20 2020,"	33.2	",-62,Sep 21 2020,41.1,-64.2,Sept 22 2020,"	48.6	",-59.6,Sep 23 2020,51,-57.3,Sep 24 2020,,,
Vicky,September 14 – 17,Tropical storm,50 (85),"	18.5	",-28.3,Sep 14 2020,"	21.2	",-32.1,Sep 15 2020,21.5,-35.7,Sep 16 2020,21.1,-39.1,Sep 17 2020,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
Beta,September 17 – 25,Tropical storm,60 (95),21.9,-94.3,Sep 17 2020,24.3,-93.1,Sep 18 2020,"	26.6	",-92.7,Sep 19 2020,27.7,-94,Sep 20 2020,28.2,-96.1,Sep 21 2020,29,-96.3,Sep 22 2020,30.5,-93.4,Sep 23  2020,33.4,-88,Sept 24 2020,"	34.3	",-86.3,Sep 25 2020,,,,,,,,,,,,,,,
Wilfred,September 18 – 21,Tropical storm,40 (65),11.9,-32.4,Sep 18 2020,"	14	",-39.2,Sep 19 2020,15.9,-45.8,Sep 20 2020,15.9,-47.4,Sep 21 2020,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
Alpha,September 18 – 19,Subtropical storm,50 (85),39.9,-9.3,Sep 18 2020,40.9,-6.9,Sep 19 2020,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
Gamma,October 2 – 6,Tropical storm,70 (110),18.1,-84.7,Oct 2 2020,"	20.7	",-87.7,Oct 3 2020,"	22.4	",-87.8,Oct 4 2020,22.1,-88.1,Oct 5 2020,"	21.6	",-88.4,Oct 6 2020,,,,,,,,,,,,,,,,,,,,,,,,,,,
Delta,October 4 – 12,Category 4 hurricane,145 (230),16.7,-76.6,Oct 4 2020,16.2,-79.4,Oct 5 2020,18.9,-84.1,Oct 6 2020,22.1,-89.5,Oct7 2020,24.8,-93.4,Oct 8 2020,29.8,-93.1,Oct 9 2020,33.7,-90,Oct 10 2020,35.4,-85.5,Oct 11 2020,34.5,-84.1,Oct 12 2020,,,,,,,,,,,,,,,
Epsilon,October 19 – 26,Category 3 hurricane,115 (185),25.8,-55.5,Oct 19 2020,27.9,-55.8,Oct 20 2020,29.6,-60,Oct 21 2020,31.9,-61.4,Oct 22 2020,35.5,-61.7,Oct 23 2020,"	39.4	",-58.2,Oct 24 2020,46.2,-44.3,Oct 25 2020,48.6,-38.8,Oct 26 2020,,,,,,,,,,,,,,,,,,
Zeta,October 24 – 29,Category 2 hurricane,110 (175),18.7,-83,Oct 24 2020,17.7,-83.4,Oct 25 2020,19.5,-86,Oct 26 2020,22.7,-90.3,Oct 27 2020,29.9,-90.2,Oct 28 2020,38.8,-75.3,Oct 29 2020,,,,,,,,,,,,,,,,,,,,,,,,
Eta,October 31 – November 13,Category 4 hurricane,150 (240),15,-73.2,Oct 31 2020,14.9,-78.9,Nov 1 2020,14.5,-82.3,Nov 2 2020,"	13.8	",-83.5,Nov 3 2020,13.9,-85.7,Nov 4 2020,15.7,-87.7,Nov 5 2020,17.3,-86.5,Nov 6 2020,20.4,-80.7,Nov 7 2020,23.9,-79.5,Nov 8 2020,23.7,-84.8,Nov 9 2020,23.2,-85.1,Nov 10 2020,27.3,-83.6,Nov 11 2020,31.6,-80.6,Nov 12 2020,33.3,-76.8,Nov 13 2020
Theta,November 10 – 15,Tropical storm,70 (110),28.8,-40.3,Nov 10 2020,"	30.5	",-31.9,Nov 11 2020,31.7,-27.4,Nov 12 2020,31.9,-22.6,Nov 13 2020,"	31.7	",-19.2,Nov 14 2020,31.5,-18.2,Nov 15 2020,,,,,,,,,,,,,,,,,,,,,,,,
Iota,November 13 – 18,Category 5 hurricane,160 (260),14.2,-74.3,Nov 13 2020,12.6,-76.5,Nov 14 2020,13.3,-79.3,Nov 15 2020,13.6,-82.7,Nov 16 2020,"	13.7	",-86.2,Nov 17 2020,13.8,-89.5,Nov 18 2020,,,,,,,,,,,,,,,,,,,,,,,,
`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            temperature: 0.7,
            max_tokens: 200
        });

        const answer = completion.choices[0].message.content;
        res.json({ response: answer.trim() });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Failed to get response',
            details: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 