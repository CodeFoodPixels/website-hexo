---
title: Projects
date: 2017-11-12 18:32:39
---
Outside of work I have a number of open source projects that I maintain and develop.

## promise-mysql
[promise-mysql](https://github.com/lukeb-uk/node-promise-mysql) is a Node module that wraps the mysql Node module in promises. This means that you can use promise chains or async/await instead of callbacks.

## tapshot
[tapshot](https://github.com/lukeb-uk/tapshot) is a Node module that helps with snapshot testing when you are using tools like [tap](https://www.npmjs.com/package/tap) and [tape](https://www.npmjs.com/package/tape). Tapshot can be used to test any serializable object. It was inspired by [Jest's snapshot testing](https://facebook.github.io/jest/docs/en/snapshot-testing.html).

This was an interesting project to work on as I had to ensure that it was well tested and worked exactly how it should.

## jscad-includify
[jscad-includify](https://github.com/lukeb-uk/jscad-includify) is a Node module that builds the includes for a [JSCAD](https://openjscad.org/) project into one file. This is useful when you want to distribute a utility library or when you want to release a project as a single file.

It can be used as a CLI tool or can be used as a module within a Node script.

I enjoyed working on this project as it was my first try at building something using an AST.

## Woodhouse
[Woodhouse](https://github.com/Woodhouse) is a modular chatbot written in JavaScript, running on Node.js. It is designed to be able to connect to multiple different interfaces (usually chat systems) and functionality is added through plugins.

I use this in my house to [control my lamps](https://www.youtube.com/watch?v=5YNmMdTzfaQ) and give me reminders. I have [automated my curtains](https://www.youtube.com/watch?v=Crudcsaheoc) using this system (but don't currently have that running) and have also added [voice control](https://www.youtube.com/watch?v=CQzn16TzZ0w).

In the future I hope to add more pieces of automation using Woodhouse, as well as generally learning more about virtual assistants.
