# Episode-06 | Scheduling Cron Job

## What is Cron
The cron utility is used for running scripts and commands at regular intervals, and at specific times and dates. Cron is an automation tool, so anything that you run on a regular basis can likely be switched over to a cron job. If you wanted to make regular daily backups, or restart a service once a week, cron can do that.

## Feature that we built
Everyday, at 8 AM morning send all requests that a user received on last day. More features that can you build like a sending mails to user to wish new year or their birthdays or any other special occasion.

## Cron API
To schedule crone job, I use NPM module [**Node Cron**](https://www.npmjs.com/package/node-cron). The node-cron module is tiny task scheduler in pure JavaScript for node.js based on GNU crontab. To install it hit the command:
```bash
npm i node-cron
```
- Node Cron provide `cron.schedule()` API to schedule your tasks. `cron.schedule()` take 2 parameters: "Cron Sting" and a "Callback function". Follow the syntax to schedule:
```js
import cron from 'node-cron';

cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});
```

### Cron String
It a pattern that represent the interval of a task. Folloeing the syntax of it:
```
# ┌────────────── second (optional)
# │ ┌──────────── minute
# │ │ ┌────────── hour
# │ │ │ ┌──────── day of month
# │ │ │ │ ┌────── month
# │ │ │ │ │ ┌──── day of week
# │ │ │ │ │ │
# │ │ │ │ │ │
# * * * * * *
```
### Allowed values
| field	| value |
| --- | --- |
| second |	0-59 |
| minute |	0-59 |
| hour |	0-23 |
| day of month |	1-31 |
| month |	1-12 (or names) |
| day of week |	0-7 (or names, 0 or 7 are sunday) |

- You can Experiment with with cron sting on [**Crontab Guru**](https://crontab.guru/);
- Here also, I use [**date-fns**](https://www.npmjs.com/package/date-fns) npm package to handle date.

## Implementation
Create a file `utils/cronjob.js`and write the code that mentiones above.
- Calculate yesterday date, also start and end time of yesterday;
```js
yesterday = subDays(new Date(), 1);
startYesterday = startOfDay(yesterday);
endYesterday = endOfDay(yesterday);
```
- Find all pending requests by filter `status: "interested"` and also `createdAt` with `startYesterday` and `endYesterday`.  
- Populate `toUserId` and `fromUserId` to get emails.
- List all email in set and send email itereatively by AWS SES.

### Problem
- If you have thousands of connection required milk you have thousands of females and this way is not good to stand emails it blocks out for when it is synchronous way.
- The best way is use AWS SES bulk send email or you can set your own queue mechanism.
- There is Package [**Bee-Queue**](https://www.npmjs.com/package/bee-queue) that provide queue mechanism that doesn't block your code.

---

[**Previous**](../S03%20Episode%205/README.md) | [**Next**](../S03%20Episode%207/README.md)