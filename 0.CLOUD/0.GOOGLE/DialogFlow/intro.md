With recent advancements in machine learning and natural language understanding, it has now become possible for humans and machines to have a conversation. This was previously a difficult problem to solve. Chatbots are now commonplace and are helping businesses with repetitive tasks such as taking orders or answering frequently asked questions. A chatbot might prove to be the perfect introduction to a business model to help provide some automation and let employees focus on more important aspects of a business.


## NLU
This is where natural language understanding, or NLU comes into the picture. NLU translates human language into computer language and vice versa. It is very similar to natural language processing, but encompasses a whole lot more to make sense of conversations that it has not been trained to understand. It's able to detect errors, spelling mistakes, and sentiments, which makes it the perfect technology to incorporate into Chatbox. NLU works with voice and text and can be thought of as machine learning. However a more accurate description is that machine learning helps to drive NLU.

## Dialogflow
Dialogflow leverages NLU and lets you provide conversational interfaces on top of your products and services. To provide a powerful natural language understanding engine to process and understand what your users are looking for. 
Dialogflow translates natural language into machine readable data using machine running models that are trained by examples that you provide.
Summary, dialogflow simplifies the process of building conversational experiences for Chatbox.

- Dialogflow is composed of a variety of components that make up the natural language understanding engine which helps us to build out great conversational experiences for users.

## Agent
It all begins with the Dialogflow agent, which can be thought of as the virtual agent that handles conversations with your users. 
You can think of the agent as the parent container that encompasses your entire chat bot or conversational application. Your agent contains intents, and these help to respond to user's requests.
This represents an entire application or conversational experience. An agent is similar to a human call center agent.
It is one of the first things we create when we build a chatbot application in Dialogflow.
At a high level, agents consist of settings such as language options, machine learning settings, and other settings that can control the behavior of the agent.


### intents - handling users requests
In dialogflow, the tool we use for understanding what users are seeing or requesting, is the intent, it helps a user with a specific request.
An agent can be composed of a few to even thousands of intents for conversational experiences that may contain many branches, twists, and turns. Intents and Dialogflow make it easy to align what users say to specific requests that you can address. 
For each intent, you normally have to provide dialogflow a few examples of how a user will communicate, or what they will say that will map to your intent or cause it to be invoked. You don't need to provide a whole lot of examples to get started. Just provide a few sample phrases, and this is enough to get things started. By providing a few examples, behind the scenes, dialogflow uses machine learning to understand the examples that are provided.

### entities - data extracted from requests 

The next major concept you will hear about is entities. These are essentially intent parameter types and they dictate how data from a user expression is extracted. In order to respond to a user's request, we need to be able to extract data and understand what is being asked when our intent handles the request. Entities allow us to get at those key bits of data like an appointment time a user is requesting, what service they are looking for, the type of room they're trying to book, et cetera.

In Dialogflow, entities are used to extract important information from what a user says to provide specific details that are needed by an agent to help service their request

## Context

Similarly in Dialogflow, context is also used in order to more accurately match intents. In essence, context enables you to control the flow of a conversation.

## Fulfillment  

connection to your backend services or API's when processing intent requests.
But when the intent is matched, then what? We know that an intent should return a response to a user which should answer their question or service their request.
Fulfillment is an important part of a Dialogflow ecosystem. Think of fulfillment as the code you want to write to interface with backend services to respond to a dynamic request.
When you enable fulfillment for an intent and that intent is matched, Dialogflow sends a request to your webhook service with information about the matched intent. More specifically, the request is a HTTP POST request to your webhook with a JSON object containing information about the matched intent. 

## Creating Dialogflow CX
when we create an Agent there is s one intent added by default, but we can configure that as well.