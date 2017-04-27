## Synopsis

The Sophity 6-Point Services Health Check is an online survey designed as a tool for leaders of professional services organizations to assess their team's consulting practices. It's less than 50 questions, phrased as agree-disagree statements, and culminates by calculating and displaying scores across 6 question topics.

## Code Example

The PHP creates the pages from components in /html.

The Javascript reads questions and metadata from files stored in /data, then writes questions to the screen using the existing HTML structure as a template.

On completion, the survey results are presented on a results page, and the user information is logged to a .csv file by a PHP script in /report.

Check it out at (http://samnolting.com/healthcheck). (For convenience, and as this is a sample of the real Health Check, an app I created in concert with a Rails developer and which will soon go live on http://sophity.com, the "enter_email" page is skipped and a dummy email replaces it in the example.)

## Motivation

The Health Check is a project for Sophity (http://sophity.com), a PSO consultancy specializing in improving time tracking and project management for SaaS PSOs.

It's also a chance for me to try out some ideas in frontend development!

## Deployment

Since the code reads from (and writes to!) local files, it needs to run on a server or your browser will keep it from working. You can upload the code to a Web server (see my version at http://samnolting.com/healthcheck), or you can download a local server environment like MAMP (https://www.mamp.info/en/).

MAMP:
  Install MAMP, drop the healthcheck folder into MAMP/htdocs, start the MAMP servers, and navigate to localhost:8888 (the default, but you can use any port you like).

WEB:
  FTP (or however you like to put files places) the healthcheck folder into your home directory, and browse to yoursite.com/healthcheck.

## Making Your Own Survey

If you want to try to make your own survey, you can change the text of the questions by altering the contents of healthcheck/data/hc_question_numbers_v2.0.csv and /healthcheck/data/hc_questions_v2.0.txt. To change the topic headers, you can fool with hc_topics_v2.0.txt. You'll need to make sure the IDs are sequential and that the number of lines in hc_question_numbers match the number of lines in hc_questions.

Have fun! If you have questions drop me a line at sam@samnolting.com.

## License

This code is copyright (c)2017 Sam Nolting. All content and PSO knowledge is copyright (c)2017 Sophity LLC.
