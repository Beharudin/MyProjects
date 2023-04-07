console.log("Hello task");
import { Client, logger, Variables  } from "camunda-external-task-client-js";

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'creditScoreChecker'
client.subscribe("topicName", async function({ task, taskService }) {
  // Put your business logic
  const weather="good";
  const variables = new Variables().set('weather', weather);
  // complete the task
  await taskService.complete(task, variables);
});