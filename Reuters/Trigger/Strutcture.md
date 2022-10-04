
So we have a release date monitor and we have polling trigger. When release date monitor finds a date that it's interested in, it will set up a polling trigger and polling trigger will run for some time and we'll check for values OK.

And whenever it's found the values or these period of time has expired, the polling trigger will be deleted.

- But but the the the issue is that when release date monitor has set up the polling trigger, it didn't set it up correctly.
OK. And then because it wasn't settled asset setup correctly, what so so setting up the trigger means creating the trigger itself here with unique trigger ID for this specific invocation and also setting up the schedule if you remember.
We are we using trigger APIs service and we were using a lab scheduler service.

So usually when we create schedule for trigger we create schedule with trigger ID.

So we have a ID property here.
When schedule is executed.
The request is going here into queue, then we have trigger orchestrator and using the ID. This orchestrator is pulling.
Pulling the record by by ID, it's pulling this specific parameters for this specific trigger, then when it has all the configuration, basically it's pulling all the configuration drops into topic based on trigger type.

It goes to the right queue the same way as we have in ODF. The same type of filtering happening here and then. So if it's for polling trigger, it will go in this to this queue and it will invoke Lambda function for this specific polling trigger with all the required configuration. 

- So basically schedule get configuration and invoke the logic. That's all the path we have. The problem that happened is that when release date monitor is set up the schedule it didn't set up the schedule correctly.

And it didn't set up the ID, so it was supposed to create the trigger instance, get the unique ID and then when it was setting up the schedule, it was supposed to put this idea inside the schedule and it didn't happen. So when the schedule was triggered, it went to queue.
It got here. This Lambda was trying to.
Get to get triggered by D there was a failure and now since there was a failure, this message that came to the Lambda, it wasn't processed and it came back to the queue.
And then it came again and again and again. It was looping here because we didn't have correct definitions on how many times we can retry the same message.
And if we didn't, if we don't have definition, you can read about parameters of SQS and if we didn't define the default is very very big. So this message is looping here and then it's triggered in few minutes I think and it's or 10 minutes another one is coming in to fetch the configuration and they start looping here.
We have hundreds of messages in this queue. The looping here because they are not able to be processed because this Lambda is trying to fetch, it's calling the trigger API. It's trying to fetch by ID from Dynamodb. The request is failing.
So all the messages are here now each time it's trying to get a configuration by ID, it's trying to invoke the trigger API.
Since entry is trying to invoke Trigger API.
Its goes food to validate token each time so that's why we had this huge spamming here.
And the.
And the we used all our quota on the authorizers. OK, so few things that we need to change. First of all in triggers infrastructure.

- 
In our case, when release date monitor defined that we need to execute polling trigger it it first created the instance of polling trigger in trigger rule table with all the rules related to identifier.