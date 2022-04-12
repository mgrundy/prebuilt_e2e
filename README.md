# HI HI HI !!!

This toyset of e2e tests runs on node and webdriverio. I tried to structure it in reasonably neat and organized fashion.

I created a lightweight API interface (in the test/library directory) to do setup and teardown tasks like creating a room,
setting the appropriate privacy setting, and creating access tokens. There are some extra functions in there for things like
cleaning up all the rooms in case your teardown function doesn't clean up (cough cough).

I gave multiremote a shot, after I built up most of the framing. I thought it
would be good to have a control / test scaffolding browser session that could
open up a room as the leader and let a user join or answer door knocking while
the test runner asserted on different apects of the other end of the
connection. Ultimately, I haven't used it before and needed more time to get it
working than was prudent for a project like
this.

## Installing

To install clone up the repo:

`git clone https://github.com/mgrundy/prebuilt_e2e.git`

The repo includeds a shell script `setup.sh`. Setup requires that you have `nodenv` installed.
Don't worry, I check and make sure it's there. So run:

`bash setup.sh`

If everything completes without an error: Hooray! On to adding your api key. If it failed, then I've failed
you and I'm very sorry. Send me the error and I should be able to suss it out.

## Configuring API key
Well, I certainly didn't want to commit my api key to github. Edit up the file `test/config/config.json` and put
your API key and domain name in the proper spots.

## Run some tests
You've made it this far, hopefully without table flips, let's run the tests! From the repo directory run

`npx wdio`

If everything passed you'll get a report at the end of that littany of output that looks like this:
```
 "spec" Reporter:
------------------------------------------------------------------
[chrome 100.0.4896.75 mac os x #0-1] Running: chrome (v100.0.4896.75) on mac os x
[chrome 100.0.4896.75 mac os x #0-1] Session ID: 238b6930732ebdadd3d17e94e9016fc4
[chrome 100.0.4896.75 mac os x #0-1]
[chrome 100.0.4896.75 mac os x #0-1] » /test/specs/joinroom.js
[chrome 100.0.4896.75 mac os x #0-1] Happy path video call
[chrome 100.0.4896.75 mac os x #0-1]    ✓ should join and leave public room
[chrome 100.0.4896.75 mac os x #0-1]
[chrome 100.0.4896.75 mac os x #0-1] 1 passing (5s)
------------------------------------------------------------------
[chrome 100.0.4896.75 mac os x #0-0] Running: chrome (v100.0.4896.75) on mac os x
[chrome 100.0.4896.75 mac os x #0-0] Session ID: ef661bf9849581773e9ded8d6c38c8f3
[chrome 100.0.4896.75 mac os x #0-0]
[chrome 100.0.4896.75 mac os x #0-0] » /test/specs/joinprivate.js
[chrome 100.0.4896.75 mac os x #0-0] Leader joining meeting with token
[chrome 100.0.4896.75 mac os x #0-0]    ✓ should join and leave public room
[chrome 100.0.4896.75 mac os x #0-0]
[chrome 100.0.4896.75 mac os x #0-0] 1 passing (5.7s)


Spec Files:	 2 passed, 2 total (100% completed) in 00:00:08
```

If you'd like to force a fail, an interesting one is to edit the file `test/specs/joinprivate.js` 
and take `, token` out of the function call on line 27. You'll now get a report with the failure:
```
 "spec" Reporter:
------------------------------------------------------------------
[chrome 100.0.4896.75 mac os x #0-1] Running: chrome (v100.0.4896.75) on mac os x
[chrome 100.0.4896.75 mac os x #0-1] Session ID: 0903e8cb3850cbba7512efe56a2bc41a
[chrome 100.0.4896.75 mac os x #0-1]
[chrome 100.0.4896.75 mac os x #0-1] » /test/specs/joinroom.js
[chrome 100.0.4896.75 mac os x #0-1] Happy path video call
[chrome 100.0.4896.75 mac os x #0-1]    ✓ should join and leave public room
[chrome 100.0.4896.75 mac os x #0-1]
[chrome 100.0.4896.75 mac os x #0-1] 1 passing (4.8s)
------------------------------------------------------------------
[chrome 100.0.4896.75 mac os x #0-0] Running: chrome (v100.0.4896.75) on mac os x
[chrome 100.0.4896.75 mac os x #0-0] Session ID: 2df67d748ed83f140ecd8094e6c75151
[chrome 100.0.4896.75 mac os x #0-0]
[chrome 100.0.4896.75 mac os x #0-0] » /test/specs/joinprivate.js
[chrome 100.0.4896.75 mac os x #0-0] Leader joining meeting with token
[chrome 100.0.4896.75 mac os x #0-0]    ✖ should join and leave public room
[chrome 100.0.4896.75 mac os x #0-0]
[chrome 100.0.4896.75 mac os x #0-0] 1 failing (12.7s)
[chrome 100.0.4896.75 mac os x #0-0]
[chrome 100.0.4896.75 mac os x #0-0] 1) Leader joining meeting with token should join and leave public room
[chrome 100.0.4896.75 mac os x #0-0] Can't call click on element with selector ".robots-btn-join" because element wasn't found
[chrome 100.0.4896.75 mac os x #0-0] Error: Can't call click on element with selector ".robots-btn-join" because element wasn't found
[chrome 100.0.4896.75 mac os x #0-0]     at Context.<anonymous> (/Users/grund/repos/dailyco/test/specs/joinprivate.js:32:5)


Spec Files:	 1 passed, 1 failed, 2 total (100% completed) in 00:00:15
```
