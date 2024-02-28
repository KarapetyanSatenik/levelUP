- All environments used in pipelines must have a Microsoft Dataverse database.
- You must have a Power Platform administrator or Dataverse system administrator role to install the pipelines application.
- All target environments used in a pipeline must be enabled as Managed Environments.
- Managed Environments isn't required for the pipelines host or developer environments.

1. Development environment. This is where you’ll develop solutions. A pipeline can be run from within any development environments linked to it.
2. Target environment. The destination environment(s) a pipeline deploys to. For example, integration testing, UAT, production, etc.

You only need to install the deployment pipelines application in the host environment. You don't need to install it in other environments, such as development, QA or production environments that will be associated with your pipelines.