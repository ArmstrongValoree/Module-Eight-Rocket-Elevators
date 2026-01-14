const mongoose = require('mongoose');
const Agent = require('../models/Agent');
require('dotenv').config();

const agentsData = [
  {"first_name":"Orlando","last_name":"Perez","email":"perez@rocketelevators.com","region":"North","rating":95,"fee":10000},
  {"first_name":"Brutus","last_name":"Konway","email":"brutus@rocketelevators.com","region":"North","rating":92,"fee":9000},
  {"first_name":"Bob","last_name":"Boberson","email":"bob@rocketelevators.com","region":"East","rating":85,"fee":10000},
  {"first_name":"John","last_name":"Johnson","email":"john@rocketelevators.com","region":"South","rating":75,"fee":8000},
  {"first_name":"Jeff","last_name":"Lebow","email":"carpet@rocketelevators.com","region":"North","rating":92,"fee":10000},
  {"first_name":"Elmar","last_name":"Fade","email":"elmar@rocketelevators.com","region":"South","rating":95,"fee":10000},
  {"first_name":"Zed","last_name":"Roles","email":"zebra@rocketelevators.com","region":"North","rating":100,"fee":4321},
  {"first_name":"Dee","last_name":"Omega","email":"omega@rocketelevators.com","region":"East","rating":78,"fee":7000},
  {"first_name":"Aaron","last_name":"De Silva","email":"aaron@rocketelevators.com","region":"East","rating":89,"fee":8900},
  {"first_name":"Brian","last_name":"Bossman","email":"papi@rocketelevators.com","region":"South","rating":100,"fee":10001},
  {"first_name":"Bob","last_name":"Robertson","email":"bob2@rocketelevators.com","region":"East","rating":85,"fee":10000},
  {"first_name":"George","last_name":"Cleese","email":"monty@rocketelevators.com","region":"South","rating":85,"fee":5000},
  {"first_name":"Tanim","last_name":"Homaini","email":"tanim@rocketelevators.com","region":"South","rating":96,"fee":10000},
  {"first_name":"Roger","last_name":"Babbel","email":"loons@rocketelevators.com","region":"North","rating":60,"fee":5000},
  {"first_name":"Zach","last_name":"Van Den Zilch","email":"zach@rocketelevators.com","region":"North","rating":70,"fee":6000},
  {"first_name":"Al","last_name":"Stein","email":"relative@rocketelevators.com","region":"South","rating":54,"fee":4000}
];

async function seedAgents() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB!');

    const existingAgents = await Agent.find();
    
    if (existingAgents.length > 0) {
      console.log(`ℹ️  ${existingAgents.length} agents already exist`);
      console.log('Existing agents:');
      existingAgents.forEach(agent => {
        console.log(`  - ${agent.first_name} ${agent.last_name} (${agent.region})`);
      });
    } else {
      console.log('📝 Inserting agents...');
      const result = await Agent.insertMany(agentsData);
      console.log(`✅ Successfully inserted ${result.length} agents!`);
      
      result.forEach(agent => {
        console.log(`  - ${agent.first_name} ${agent.last_name} (${agent.region}) - Rating: ${agent.rating}`);
      });
    }

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding agents:', error);
    process.exit(1);
  }
}

seedAgents();