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

## License

This code is copyright (c)2017 Sam Nolting. All content and PSO knowledge is copyright (c)2017 Sophity LLC.
