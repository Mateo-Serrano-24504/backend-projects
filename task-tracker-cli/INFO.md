# Task tracker project

### Requirements

* `Node.JS` (v22.14.0 LTS)
* `npm` (v10.8.1)

### How to run

Once you have cloned the repository, as indicated in [the main README file](../README.md), execute the following commands to start the execution of the Task Tracker CLI:

```bash
cd task-tracker-cli
npm start
```

If everything is fine, you will see a prompt like this:

```bash
task-cli
```

### Commands

Through the command line interface, it will be possible to perform some operations on the task tracker. If you want to look at the list of commands from your terminal, you can execute the following:

```bash
task-cli help
```

Every task is given a random and unique ID when added to the tracker, and its status is set to 'todo' by default.

The following is an example provided at [roadmap.sh](https://roadmap.sh/backend/projects):

```
# Adding a new task
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Marking a task as in progress or done
task-cli mark-in-progress 1
task-cli mark-done 1

# Listing all tasks
task-cli list

# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
```