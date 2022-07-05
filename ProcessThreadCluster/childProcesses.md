Launching a new child process with any of the child_process methods that do NOT end in Sync does not block your event loop. There's a momentary amount of execution time to command the OS to launch the new process and then it returns and you are back to your own event loop, independent of whatever the child process is doing.

- A "child process" is a new "process". That's not a thread in your process. It's a whole new process.

- Each process has it's OWN main thread. So, the new child process you start has it's own separate thread in it's own process, completely independent from the parent.