# Practical Microservices Workshop

Get Hands-on with Event Sourcing and CQRS

## Machine Setup

Follow the instructions at [https://github.com/SuchSoftware/practical-microservices](https://github.com/SuchSoftware/practical-microservices)

## Slides

Go through the slides up until "Let's Build It!"

## Start the databases and make sure we can view them

* `docker-compose rm -sf`
* `docker-compose up`
* View Data DB: postgres://postgres@localhost:5432/practical_microservices
* Message Store: postgres://postgres@localhost:5433/message_store

## Step 1: Writing a message

`git checkout step-01`

1. Open `exercises/01-write-a-message.js`
2. If you try to run it, it will go boom!  So run it and watch the boom.
3. Uncomment line 22
4. Talk about the fields in the message
5. SLIDE - anatomy of a message
6. Ask class to do part 2 (Did anyone pick a fun message type?)

## Step 2: Exploring the Project Layout

`git checkout step-02`

1. Lots of dependency injection

## Step 3: Handling Our First Message (the `Transcode` command)

`git checkout step-03`

Exercise step-003/001
Show src/move-file-component/index.js - we’re receiving the message store now
Show src/config.js - We’re passing the message store now
Back to src/move-file-component/index.js - Show the moveFile function
Show that the handler key name matches the message type we’re handling
Live code the solution


In the project root
mkdir tmp
Recycling Messages
Git checkout step-004

Exercise step-004/001
What is different about this exercise?
Could this ever happen?  Crash. Redeployment.
How the message store code stores position
We don’t want to reprocess messages.  (Process vs. handle)
Anyone know what we’re missing? (idempotence)
Slides on Idempotence and projections

Projecting
Same step

Exercise step-004/002
Let’s fill out the projection
Projections use keys that match the message types as well.  What message type do I need.

  Moved (file, moved) {
    return {
      ...file,
      fileId: moved.data.fileId,
      source: moved.data.source,
      destination: moved.data.destination,
      isMoved: true
    }
  }

Adding the projection to the handler
Git checkout step-005

Notice in src/move-files-component/index.js that we’re requiring the projection
Show src/move-files-component/projection.js - We need to flesh out this file. Does the projection already exist somewhere?
Show `project` function in src/message-store/read.js
Show it being used in index.  Note that the handler is now async.
Code!  Move the projection over, see how it only gets written once.

Adding concurrency protection
Git checkout step-006

No exercise
Explain concurrency and how the idempotence check won’t work.
Show use of expected version
We won’t do a lot with concurrency because we only have 4 hours.  But, when you get to that point, expectedVersion is your friend.
From this point on, we’ll just assume no-concurrency
“Transcoding” videos

Git checkout step-007

We’re setting aside the move-file component now
Group codes this whole component.  Given a projection with an $init property and a component file with the handler somewhat filled out
Exercise step-007/ 001-handle-transcode-command.js
Fill out projection and rest of handler

Orchestrating components

Git checkout step-008

The catalog component needs to get the other 2 to do work
The projection is already filled out
The catalog component will drive the process off of its own events.  It shouldn’t rely on other streams for its own state
Get a Catalog command transformed into a Received event
Handling Received and telling move-file to move the file
Git checkout step-009

Respond to our own event
Make sure to set the origin stream name
Use the video’s id for the stream so that idempotence works
We expect to see more than 1 command.  Why?  Why does it not matter?
Handling move-file Moved event
Git checkout step-010

Filter on origin stream name
If it’s one of ours, idempotently record it
Exercise step-010/001

Handling internal Moved event

Git checkout step-011

This one will be the most challenging one yet
Exercise

Handling Transcoded from transcode-component
Git checkout step-012

We got the Transcoded event back from transcode-component
Make sure it’s ours
We’ll just walk through code already done because we did basically the same thing with moving the file

Handling Internal transcoded event
Git checkout step-013

Again just walk through the committed code because it doesn’t do something new

Subscribing to the message store

Git checkout step-014

Just plunk the subscriptions in place
The streamName is the category we’re subscribing to.  To handle commands, we subscribe to the :command stream


Touring the application changes

Git checkout step-015

Keeping it simple.  Anyone can upload a video.  Can’t foresee any problem with that!
Videos are named after their id.  Can’t foresee any problems with that!
Notice that the Application’s job here is to just get the command to the message store
That’s all it has available at the moment
That’s why the view video route has the interstitial
Notice that the reads are now just like any other HTTP handler you’ve work with before.  What we’ve done is decouple our write model from our read model


Aggregating video publishing

Git checkout step-016

It’s just a component, but we call them out as aggregators to make the distinction
The query needs to be idempotent.  Upserting gives us that.
