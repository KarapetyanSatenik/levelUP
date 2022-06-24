# What is the best Git branch strategy?

Git and other version control systems give software developers the power to track, manage, and organize their code.

Branches are primarily used as a means for teams to develop features giving them a separate workspace for their code. These branches are usually merged back to a master branch upon completion of work. In this way, features (and any bug and bug fixes) are kept apart from each other allowing you to fix mistakes more easily.

This means that branches protect the mainline of code and any changes made to any given branch don’t affect other developers.

A branching strategy, therefore, is the strategy that software development teams adopt when writing, merging and deploying code when using a version control system.

It is essentially a set of rules that developers can follow to stipulate how they interact with a shared codebase.
Such a strategy is necessary as it helps keep repositories organized to avoid errors in the application.

The whole purpose of DevOps is creating a fast workflow that would allow for the release of small batches of code. 
Branching strategy will help solve this issue so that developers can work together without stepping on each other’s toes. In other words, it enables teams to work in parallel to achieve faster releases and fewer conflicts by creating a clear process when making changes to source control.

As mentioned above, having a branching strategy is necessary to avoid conflicts when merging and to allow for the easier integration of changes into the master trunk.

## Git branching

Git branches allow developers to diverge from the main branch by creating separate branches to isolate code changes. The default branch in Git is the master branch. 
Git branching model is lightweight compared to other version control systems; this is why it’s so easy and cheap to create branches in Git, as the whole code doesn’t need to be copied to the branch creating a large amount of duplicate files, as opposed to other VCS tools.

## What are some common Git branching strategies?

- GitFlow
- GitHub Flow
- GitLab Flow
- Trunk-based development
