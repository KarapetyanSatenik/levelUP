
## Why we use variables?

- We can save customers' responses in a bot conversation to variables and reuse them later in the conversation.
- We can use variables to create logical expressions that dynamically route the customer down different conversation paths. For example, save a customer's name in a variable called UserName, and the bot can address the customer by name as the conversation continues.

## Variable types

Variables we can divide into three groups
1. Topic variables
2. Global variables
3. System variables

- Topic variables can only be used in the topics in which they're created. And by default they are created in this mood.
- Global variables can be used in all topics. 
- System variables are created automatically with your bot. They're available in all topics.

Here are more important cases

- Variable's type is set the first time a value is assigned to it. After that, the type for that variable is fixed and it can't be assigned values of any other type. If we change variable type then we will have an error.
- Order of variables is determined from top to bottom of the authoring canvas. 
- Variables are automatically assigned a name when you create them. A best practice is to give your variables meaningful names to make their purpose clear to anyone else who must maintain your bot.
- You can set variables values by yourself

## Variable values

Variables can contain
1. String
2. Boolean
3. Number	
4. Table
5. Record	
6. DateTime
7. Choice
8. Blank

## Accessing variables

you can view all the variables in the variables panel, where you can see all of them that are available in the topic, control, make changes, rename, make it global, convert it from a global variable back to a topic variable.

#### "Issues"
It's possible that not all system variables are displayed when you want to set a variable's value in the system panel. You must access these hidden system variables by adding System. before the variable name. For example, to include the system variable User.DisplayName in a formula, you'd need to refer to it as System.User.DisplayName.


## Passing variables between topics

When you redirect one topic to another, you can pass the values of variables between the original topic and the destination topic. Passing variables between topics is especially useful when an earlier topic already collected information that a later topic needs. Your users will appreciate not having to answer the same questions again.

## Receive values from other topics

When you define a variable in a topic (for example, by inserting a question node), the user's answer to the questions is populated to the variable associated with that question. Since you already have the value, there's no reason to ask the question again. In these cases, you can define the variable as 
- Receive values from other topics.
This means when another topic redirects to this one, it can pass a variable into this variable and skip the question. The experience for the user talking to the copilot is seamless.


## Return values to original topics

When a topic asks a question or obtains a variable from an action in some other way, the variable can be returned to the original topic that redirected to it.

In this case, the variable also becomes part of the original topic and can be used like any other variable. This helps you construct the topic so that information the copilot obtains is available across topics, reducing the need for global variables. We'll discuss global variables in the next unit.


## Additional limits, conflicts, etc.

Here are some additional insights to consider regarding the use of variables:

1. **Limitations**: 

There might be a limit on the number of global variables you can create in a bot. But the exact number of global variables you can create in Copilot/Power Virtual Agents isn't specified in Microsoft's official documentation. The limits may vary based on factors like licensing and the complexity of the bot.

2. **Name Conflicts**: 

Avoid naming conflicts. Make sure that your variables have unique names, otherwise there might be cases where one variable gets confused with another.

3. **Data Privacy**:

Be mindful of sensitive data. Variables may contain sensitive user data, such as contact information or personal preferences. You need to ensure this data is handled in compliance with any applicable data protection laws and regulations.

4. **Performance Impact**:

Too many variables in a bot can theoretically impact performance, particularly if extensive computation or processing is involved.
Managing performance in a bot with many variables involves various strategies:

- Minimize Global Variables: Try to limit the use of global variables. Instead, use topic or local variables that are only active within specific topics where needed.
- Optimize Logic: Review your bot's conversation logic to ensure you're using variables efficiently. Remove unnecessary or redundant variables and try to simplify complex operations where possible.
- Clean Up Unused Variables: Regularly check and remove any unused variables. These can clutter the bot and hinder performance.
- Use External Services for Complex Tasks: For complex data processing tasks, consider integrating with external APIs or backend systems optimized for such tasks.
- Periodic Maintenance and Review: Conduct regular maintenance and quality checks to optimize variable usage and to ensure efficient performance.
- Evaluate Scalability Needs: As your bot grows, reassess the ways you use variables and consider restructuring if needed to ensure optimal performance at scale.

5. **Record Variables**: 
Record variables represent a set of fields which you can access individually. But these can't be created directly in the conversation; they are usually created as the result of an action.

6. **Dynamics 365 limit**: 
If your bot has a connection to a Dynamics 365 environment, the maximum number of variables you can have in a topic (including both variables created by Power Virtual Agents and those brought in by the connection to Dynamics 365) is 50.
