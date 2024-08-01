Authentication using service accounts in Google Cloud works by providing an identity for a service, instead of for a user. This allows you to control the access of different services to different resources.

Here's a brief explanation of how it works:

- A service account is first created on Google Cloud associated with your project.
- You assign certain roles or permissions to this service account. For example, you might give it permission to upload Docker images to your Google Artifact Registry.
- Google Cloud then provides a JSON key file after creating the service account. This JSON file is used to authenticate the service account when making service requests.
- You use this JSON key file to authenticate your service account with `gcloud`, which is Google's command-line tool for managing resources on Google Cloud.

To authenticate the build service and upload a completed Docker image to your Artifact Registry, you would generally follow these steps:

1. **Create a Service Account:** Through the Google Cloud Console, create a service account and assign it roles that allow access to Artifact Registry. 

2. **Download JSON Key File:** Download the JSON key file associated with the service account.

3. **Set Path to JSON Key File:** In your build service, provide the path to this JSON key file. If you're using Google Cloud Build, it has built-in support for using Service Accounts which makes it really easy to use and rotate keys.

4. **Activate Service Account:** Authenticate the service account in your build environment. For instance, if you're using `gcloud`, you can do this with the command: `gcloud auth activate-service-account --key-file=KEY_FILE`, where `KEY_FILE` is the path to your service account JSON key file.

5. **Build Docker Image:** Build your Docker image as you normally would using your Dockerfile.

6. **Tag Docker Image:** Tag your Docker image using the format required for the Artifact Registry. The tag should look something like this: `us-central1-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE:tag`.

7. **Push Docker Image:** Push your Docker image to the Artifact Registry with the command: `docker push us-central1-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE:tag`.

To sum up, the service account JSON key file is extremely sensitive and should be handled carefully. It should not be publicly accessible. It's generally good practice to store these keys securely and use them only where required. In a CI/CD system it's common to securely inject them into your build environment just before they're required, and then discard them immediately afterwards.