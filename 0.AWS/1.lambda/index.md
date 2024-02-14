## cold start
a "cold start" refers to the initial invocation of a function when there is no existing container (execution environment) available to handle the request.
Each time a Lambda function is triggered, AWS may need to create a new container to execute the function code.

1. Keep Functions Warm:

Schedule periodic invocations of your Lambda function to keep containers warm using cloud watch.

2. Optimize Package Size:

Smaller deployment packages lead to faster startup times. Try to minimize the size of your Lambda deployment package by excluding unnecessary dependencies or files.

3. Optimize Initialization Code:

If your function has complex initialization logic, consider optimizing it to reduce startup time

4. Choose a Larger Memory Size: