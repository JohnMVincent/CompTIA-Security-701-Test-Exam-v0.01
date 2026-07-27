# CompTIA Security+ SY0-701 Practice Exam

A browser-based practice exam designed to help users study for the CompTIA Security+ SY0-701 certification exam.

The website creates a 90-question practice exam from a larger 180-question bank and provides both study-focused and exam-style testing options.

## Features

* 180-question Security+ practice bank
* Domain-balanced 90-question exams
* Study Mode with immediate feedback and explanations
* Exam Mode with results shown after submission
* Optional 90-minute timer
* Randomized question order
* Randomized answer-choice order
* Previous and next question navigation
* Numbered question navigator
* Flag questions for later review
* Automatic browser progress saving
* Resume an unfinished exam
* Confirmation before submitting an incomplete exam
* Domain-specific scoring
* Recommended review area based on the lowest domain score
* Review all questions or only missed questions
* Retry an exam using missed questions
* Recent-attempt history
* Keyboard controls for selecting answers and navigating
* Responsive dark-mode interface for desktop and mobile use
* Reduced-motion accessibility support

## Exam Toolbar

The compact toolbar allows users to change:

* Study or Exam Mode
* Question-order shuffling
* Answer-choice shuffling
* Timer settings

Changes remain pending until the user selects **Commit Changes**.

If settings are committed during an active test, the website asks for confirmation and warns that committing the changes will end the current exam.

## Keyboard Controls

* `1` through `4`: Select an answer
* `Enter`: Submit or save the selected answer
* `F`: Flag or unflag the current question
* `Left Arrow`: Previous question
* `Right Arrow`: Next question

## Project Files

```text
index.html
styles.css
questions.js
script.js
```

* `index.html` contains the website structure.
* `styles.css` contains the dark-mode interface and responsive styling.
* `questions.js` contains the Security+ question bank.
* `script.js` contains the exam logic, scoring, navigation, settings, saved progress, and review features.

## Running the Website

Open the project folder in Visual Studio Code and run `index.html` through the Live Server extension.

No external libraries, frameworks, account, or internet connection are required after the files are available locally.

## Future Development

The question bank will continue to be reviewed, corrected, expanded, and improved.

Future questions will include difficulty ratings from **1 through 5**:

1. Basic knowledge and terminology
2. Foundational concept application
3. Intermediate scenario analysis
4. Advanced troubleshooting and decision-making
5. Complex exam-style scenarios requiring careful comparison

Future versions may allow users to select a difficulty level, combine multiple difficulty levels, or generate adaptive exams based on previous performance.

## Disclaimer

This is an independent practice project and is NOT affiliated with OR endorsed by CompTIA in any capacity.

CompTIA, Security+, and related certification names are trademarks of their respective owner.
