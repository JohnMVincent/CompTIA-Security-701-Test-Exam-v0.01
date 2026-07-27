"use strict";
// BASE CODE
/* =====================================================
   CompTIA Security+ Practice Exam Engine

   The complete 180-question bank remains unchanged
   inside questions.js.
   ===================================================== */

const EXAM_QUESTION_COUNT = 90;
const EXAM_TIME_SECONDS = 90 * 60;
const MAX_HISTORY_ITEMS = 10;

const STORAGE_KEYS = {
  settings: "securityPlusCommittedSettings",
  progress: "securityPlusExamProgress",
  history: "securityPlusAttemptHistory",
  recentQuestions: "securityPlusRecentQuestions",
};

const DEFAULT_SETTINGS = {
  mode: "study",
  shuffleQuestions: true,
  shuffleAnswers: true,
  timerEnabled: false,
};

const DOMAIN_NAMES = [
  "1.0 General Security Concepts",
  "2.0 Threats, Vulnerabilities, and Mitigations",
  "3.0 Security Architecture",
  "4.0 Security Operations",
  "5.0 Security Program Management and Oversight",
];

const DOMAIN_QUESTION_COUNTS = {
  "1.0 General Security Concepts": 11,
  "2.0 Threats, Vulnerabilities, and Mitigations": 20,
  "3.0 Security Architecture": 16,
  "4.0 Security Operations": 25,
  "5.0 Security Program Management and Oversight": 18,
};

/* =====================================================
   DOM references
   ===================================================== */

const examToolbar = document.querySelector("#exam-toolbar");

const settingsToggleButton = document.querySelector("#settings-toggle-button");

const settingsPanel = document.querySelector("#settings-panel");

const toolbarStatus = document.querySelector("#toolbar-status");

const pendingSettingsBadge = document.querySelector("#pending-settings-badge");

const modeSelect = document.querySelector("#mode-select");

const shuffleQuestionsCheckbox = document.querySelector(
  "#shuffle-questions-checkbox",
);

const shuffleAnswersCheckbox = document.querySelector(
  "#shuffle-answers-checkbox",
);

const timerCheckbox = document.querySelector("#timer-checkbox");

const modeDescription = document.querySelector("#mode-description");

const commitSettingsButton = document.querySelector("#commit-settings-button");

const revertSettingsButton = document.querySelector("#revert-settings-button");

const settingsFeedback = document.querySelector("#settings-feedback");

const startButton = document.querySelector("#start-button");

const resumeButton = document.querySelector("#resume-button");

const discardSavedButton = document.querySelector("#discard-saved-button");

const welcomeScreen = document.querySelector("#welcome-screen");

const savedExamSummary = document.querySelector("#saved-exam-summary");

const resumeDescription = document.querySelector("#resume-description");

const examScreen = document.querySelector("#exam-screen");

const progressText = document.querySelector("#progress");

const examProgress = document.querySelector("#exam-progress");

const timerText = document.querySelector("#timer");

const timerWarning = document.querySelector("#timer-warning");

const answeredCount = document.querySelector("#answered-count");

const flaggedCount = document.querySelector("#flagged-count");

const toggleNavigatorButton = document.querySelector(
  "#toggle-navigator-button",
);

const questionNavigator = document.querySelector("#question-navigator");

const questionDomain = document.querySelector("#question-domain");

const questionText = document.querySelector("#question-text");

const answerForm = document.querySelector("#answer-form");

const answerOptions = document.querySelector("#answer-options");

const submitAnswerButton = document.querySelector("#submit-answer-button");

const feedback = document.querySelector("#feedback");

const previousButton = document.querySelector("#previous-button");

const flagButton = document.querySelector("#flag-button");

const nextButton = document.querySelector("#next-button");

const finishButton = document.querySelector("#finish-button");

const resultsScreen = document.querySelector("#results-screen");

const scoreText = document.querySelector("#score-text");

const timeUsedText = document.querySelector("#time-used-text");

const resultMessage = document.querySelector("#result-message");

const weakDomainPanel = document.querySelector("#weak-domain-panel");

const weakDomainText = document.querySelector("#weak-domain-text");

const domainScoreList = document.querySelector("#domain-score-list");

const reviewMissedButton = document.querySelector("#review-missed-button");

const reviewAllButton = document.querySelector("#review-all-button");

const retryMissedButton = document.querySelector("#retry-missed-button");

const newExamButton = document.querySelector("#new-exam-button");

const attemptHistory = document.querySelector("#attempt-history");

const clearHistoryButton = document.querySelector("#clear-history-button");

const reviewScreen = document.querySelector("#review-screen");

const reviewTitle = document.querySelector("#review-title");

const reviewList = document.querySelector("#review-list");

const backToResultsButton = document.querySelector("#back-to-results-button");

const submitDialog = document.querySelector("#submit-dialog");

const submitSummary = document.querySelector("#submit-summary");

const commitSettingsDialog = document.querySelector("#commit-settings-dialog");

const clearHistoryDialog = document.querySelector("#clear-history-dialog");

/* =====================================================
   Application state
   ===================================================== */

let committedSettings = loadCommittedSettings();

let pendingSettings = {
  ...committedSettings,
};

let activeExamSettings = null;

let normalizedQuestionBank = [];
let examQuestions = [];
let userAnswers = [];

let currentQuestionIndex = 0;
let examStartedAt = null;
let examFinished = false;
let currentResult = null;

let timeRemaining = EXAM_TIME_SECONDS;
let timerInterval = null;
let lastTimerWarning = null;

/* =====================================================
   Local-storage helpers
   ===================================================== */

function loadJSON(key, fallbackValue) {
  try {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
      return fallbackValue;
    }

    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`Unable to read ${key}:`, error);

    return fallbackValue;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Unable to save ${key}:`, error);
  }
}

function removeStoredValue(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Unable to remove ${key}:`, error);
  }
}

function loadCommittedSettings() {
  const storedSettings = loadJSON(STORAGE_KEYS.settings, DEFAULT_SETTINGS);

  return {
    ...DEFAULT_SETTINGS,
    ...storedSettings,
  };
}

/* =====================================================
   General helpers
   ===================================================== */

function shuffleArray(array) {
  for (let index = array.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  }

  return array;
}

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds);

  const minutes = Math.floor(safeSeconds / 60);

  const seconds = safeSeconds % 60;

  return `${minutes}:` + String(seconds).padStart(2, "0");
}

function formatDuration(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds);

  const hours = Math.floor(safeSeconds / 3600);

  const minutes = Math.floor((safeSeconds % 3600) / 60);

  const seconds = safeSeconds % 60;

  if (hours > 0) {
    return `${hours}h ` + `${minutes}m ` + `${seconds}s`;
  }

  return `${minutes}m ${seconds}s`;
}

function openDialog(dialogElement) {
  if (typeof dialogElement.showModal === "function") {
    dialogElement.showModal();
    return;
  }

  dialogElement.setAttribute("open", "");
}

function closeDialog(dialogElement) {
  if (typeof dialogElement.close === "function") {
    dialogElement.close();
    return;
  }

  dialogElement.removeAttribute("open");
}

function isExamActive() {
  return examQuestions.length > 0 && !examFinished;
}

/* =====================================================
   Question-bank preparation
   ===================================================== */

function getDomainByOriginalIndex(index) {
  if (index <= 10) {
    return DOMAIN_NAMES[0];
  }

  if (index <= 30) {
    return DOMAIN_NAMES[1];
  }

  if (index <= 46) {
    return DOMAIN_NAMES[2];
  }

  if (index <= 71) {
    return DOMAIN_NAMES[3];
  }

  return DOMAIN_NAMES[4];
}

function normalizeQuestionBank() {
  if (!Array.isArray(questions)) {
    throw new Error(
      "The questions array could not be found. " +
        "Confirm questions.js loads before script.js.",
    );
  }

  normalizedQuestionBank = questions.map(function (question, originalIndex) {
    return {
      ...question,

      originalIndex: originalIndex,

      domain: question.domain || getDomainByOriginalIndex(originalIndex),
    };
  });
}

function cloneQuestion(question) {
  return {
    ...question,
    options: [...question.options],
  };
}

function shuffleQuestionOptions(question) {
  const optionRecords = question.options.map(function (option, optionIndex) {
    return {
      text: option,

      isCorrect: optionIndex === question.answer,
    };
  });

  shuffleArray(optionRecords);

  return {
    ...question,

    options: optionRecords.map(function (record) {
      return record.text;
    }),

    answer: optionRecords.findIndex(function (record) {
      return record.isCorrect;
    }),
  };
}

/* =====================================================
   Settings toolbar
   ===================================================== */

function readPendingSettingsFromControls() {
  pendingSettings = {
    mode: modeSelect.value,

    shuffleQuestions: shuffleQuestionsCheckbox.checked,

    shuffleAnswers: shuffleAnswersCheckbox.checked,

    timerEnabled: timerCheckbox.checked,
  };
}

function writeSettingsToControls(settings) {
  modeSelect.value = settings.mode;

  shuffleQuestionsCheckbox.checked = settings.shuffleQuestions;

  shuffleAnswersCheckbox.checked = settings.shuffleAnswers;

  timerCheckbox.checked = settings.timerEnabled;

  updateModeDescription();
}

function settingsAreDifferent() {
  return JSON.stringify(pendingSettings) !== JSON.stringify(committedSettings);
}

function updateModeDescription() {
  if (modeSelect.value === "study") {
    modeDescription.textContent =
      "Study Mode shows the correct " +
      "answer and explanation after " +
      "each submitted question.";

    return;
  }

  modeDescription.textContent =
    "Exam Mode saves answers without " +
    "revealing the correct response " +
    "until the exam is submitted.";
}

function updatePendingSettingsState() {
  readPendingSettingsFromControls();

  const hasPendingChanges = settingsAreDifferent();

  pendingSettingsBadge.hidden = !hasPendingChanges;

  commitSettingsButton.disabled = !hasPendingChanges;

  revertSettingsButton.disabled = !hasPendingChanges;

  if (hasPendingChanges) {
    settingsFeedback.textContent =
      "Settings changed. Commit them " + "when ready.";
  } else {
    settingsFeedback.textContent = "";
  }
}

function toggleSettingsPanel() {
  const willOpen = settingsPanel.hidden;

  settingsPanel.hidden = !willOpen;

  settingsToggleButton.setAttribute("aria-expanded", String(willOpen));

  settingsToggleButton.textContent = willOpen ? "Close Settings" : "Settings";
}

function revertPendingSettings() {
  pendingSettings = {
    ...committedSettings,
  };

  writeSettingsToControls(committedSettings);

  updatePendingSettingsState();

  settingsFeedback.textContent = "Pending changes were reverted.";
}

function applyPendingSettings() {
  committedSettings = {
    ...pendingSettings,
  };

  saveJSON(STORAGE_KEYS.settings, committedSettings);

  updatePendingSettingsState();

  settingsFeedback.textContent = "Settings committed for the " + "next exam.";
}

function requestSettingsCommit() {
  if (!settingsAreDifferent()) {
    return;
  }

  if (isExamActive()) {
    openDialog(commitSettingsDialog);

    return;
  }

  applyPendingSettings();
}

/* =====================================================
   Question selection
   ===================================================== */

function getRecentlyUsedQuestionIndexes() {
  const storedIndexes = loadJSON(STORAGE_KEYS.recentQuestions, []);

  if (!Array.isArray(storedIndexes)) {
    return [];
  }

  return storedIndexes.filter(Number.isInteger);
}

function saveRecentlyUsedQuestionIndexes(questionSet) {
  const indexes = questionSet.map(function (question) {
    return question.originalIndex;
  });

  saveJSON(STORAGE_KEYS.recentQuestions, indexes);
}

function selectDomainBalancedQuestions() {
  const recentlyUsedIndexes = new Set(getRecentlyUsedQuestionIndexes());

  const selectedQuestions = [];

  DOMAIN_NAMES.forEach(function (domainName) {
    const requiredCount = DOMAIN_QUESTION_COUNTS[domainName];

    const domainPool = normalizedQuestionBank
      .filter(function (question) {
        return question.domain === domainName;
      })
      .map(cloneQuestion);

    const unseenQuestions = domainPool.filter(function (question) {
      return !recentlyUsedIndexes.has(question.originalIndex);
    });

    const previouslySeenQuestions = domainPool.filter(function (question) {
      return recentlyUsedIndexes.has(question.originalIndex);
    });

    shuffleArray(unseenQuestions);

    shuffleArray(previouslySeenQuestions);

    const combinedPool = [...unseenQuestions, ...previouslySeenQuestions];

    selectedQuestions.push(...combinedPool.slice(0, requiredCount));
  });

  if (selectedQuestions.length !== EXAM_QUESTION_COUNT) {
    throw new Error(
      `Expected ${EXAM_QUESTION_COUNT} ` +
        "questions but selected " +
        `${selectedQuestions.length}. ` +
        "Check the domain labels and " +
        "question counts.",
    );
  }

  if (committedSettings.shuffleQuestions) {
    shuffleArray(selectedQuestions);
  } else {
    selectedQuestions.sort(function (firstQuestion, secondQuestion) {
      return firstQuestion.originalIndex - secondQuestion.originalIndex;
    });
  }

  return selectedQuestions;
}

function prepareQuestionSet(questionSet, settings) {
  return questionSet.map(function (question) {
    const clonedQuestion = cloneQuestion(question);

    if (settings.shuffleAnswers) {
      return shuffleQuestionOptions(clonedQuestion);
    }

    return clonedQuestion;
  });
}

/* =====================================================
   Saved-exam progress
   ===================================================== */

let examDeadline = null;

function createBlankAnswerRecord() {
  return {
    selectedAnswer: null,
    submitted: false,
    flagged: false
  };
}

function getElapsedExamSeconds() {
  if (!examStartedAt) {
    return 0;
  }

  return Math.max(
    0,
    Math.floor(
      (Date.now() - examStartedAt) /
      1000
    )
  );
}

function getSavedExamProgress() {
  return loadJSON(
    STORAGE_KEYS.progress,
    null
  );
}

function savedProgressIsValid(
  savedProgress
) {
  if (
    !savedProgress ||
    typeof savedProgress !== "object"
  ) {
    return false;
  }

  if (
    !Array.isArray(
      savedProgress.examQuestions
    ) ||
    savedProgress.examQuestions.length === 0
  ) {
    return false;
  }

  if (
    !Array.isArray(
      savedProgress.userAnswers
    ) ||
    savedProgress.userAnswers.length !==
      savedProgress.examQuestions.length
  ) {
    return false;
  }

  if (
    !savedProgress.activeExamSettings ||
    typeof savedProgress.activeExamSettings !==
      "object"
  ) {
    return false;
  }

  return true;
}

function saveExamProgress() {
  if (!isExamActive()) {
    return;
  }

  const savedProgress = {
    version: 1,

    examQuestions:
      examQuestions,

    userAnswers:
      userAnswers,

    currentQuestionIndex:
      currentQuestionIndex,

    activeExamSettings:
      activeExamSettings,

    timeRemaining:
      timeRemaining,

    elapsedSeconds:
      getElapsedExamSeconds(),

    savedAt:
      new Date().toISOString()
  };

  saveJSON(
    STORAGE_KEYS.progress,
    savedProgress
  );

  refreshSavedExamAvailability();
}

function removeSavedExamProgress() {
  removeStoredValue(
    STORAGE_KEYS.progress
  );

  refreshSavedExamAvailability();
}

function refreshSavedExamAvailability() {
  const savedProgress =
    getSavedExamProgress();

  const hasSavedExam =
    savedProgressIsValid(
      savedProgress
    );

  const shouldShowResume =
    hasSavedExam &&
    !isExamActive();

  resumeButton.hidden =
    !shouldShowResume;

  discardSavedButton.hidden =
    !shouldShowResume;

  savedExamSummary.hidden =
    !shouldShowResume;

  if (!hasSavedExam) {
    resumeDescription.textContent =
      "No saved exam is available.";

    return;
  }

  const savedQuestionNumber =
    Math.min(
      savedProgress.currentQuestionIndex +
        1,
      savedProgress.examQuestions.length
    );

  const answeredQuestions =
    savedProgress.userAnswers.filter(
      function (answerRecord) {
        return (
          Number.isInteger(
            answerRecord.selectedAnswer
          )
        );
      }
    ).length;

  resumeDescription.textContent =
    `Question ${savedQuestionNumber} of ` +
    `${savedProgress.examQuestions.length}. ` +
    `${answeredQuestions} questions answered.`;
}

function discardSavedExam() {
  removeSavedExamProgress();

  settingsFeedback.textContent =
    "The saved exam was discarded.";
}

/* =====================================================
   Screen and toolbar state
   ===================================================== */

function hideMainScreens() {
  welcomeScreen.hidden = true;
  examScreen.hidden = true;
  resultsScreen.hidden = true;
  reviewScreen.hidden = true;
}

function showWelcomeScreen() {
  hideMainScreens();

  welcomeScreen.hidden = false;

  updateToolbarState();
  refreshSavedExamAvailability();
}

function showActiveExamScreen() {
  hideMainScreens();

  examScreen.hidden = false;

  updateToolbarState();
}

function showResultsScreen() {
  hideMainScreens();

  resultsScreen.hidden = false;

  updateToolbarState();
}

function showReviewScreen() {
  hideMainScreens();

  reviewScreen.hidden = false;

  updateToolbarState();
}

function updateToolbarState() {
  if (isExamActive()) {
    toolbarStatus.textContent =
      `Exam active: question ` +
      `${currentQuestionIndex + 1} of ` +
      `${examQuestions.length}.`;

    startButton.disabled = true;
    resumeButton.hidden = true;
    discardSavedButton.hidden = true;

    return;
  }

  startButton.disabled = false;

  if (examFinished && currentResult) {
    toolbarStatus.textContent =
      "The most recent exam has been completed.";
  } else {
    toolbarStatus.textContent =
      "No exam is currently active.";
  }

  refreshSavedExamAvailability();
}

/* =====================================================
   Starting and resuming exams
   ===================================================== */

function initializeAnswerRecords(
  questionCount
) {
  return Array.from(
    {
      length: questionCount
    },
    createBlankAnswerRecord
  );
}

function beginExamWithQuestions(
  questionSet,
  settings,
  options = {}
) {
  clearExamTimer();

  activeExamSettings = {
    ...settings
  };

  examQuestions =
    prepareQuestionSet(
      questionSet,
      activeExamSettings
    );

  userAnswers =
    initializeAnswerRecords(
      examQuestions.length
    );

  currentQuestionIndex = 0;
  examFinished = false;
  currentResult = null;

  timeRemaining =
    activeExamSettings.timerEnabled
      ? EXAM_TIME_SECONDS
      : EXAM_TIME_SECONDS;

  examStartedAt = Date.now();

  if (
    activeExamSettings.timerEnabled
  ) {
    examDeadline =
      Date.now() +
      timeRemaining * 1000;
  } else {
    examDeadline = null;
  }

  lastTimerWarning = null;

  if (
    options.saveRecentQuestions ===
    true
  ) {
    saveRecentlyUsedQuestionIndexes(
      examQuestions
    );
  }

  removeStoredValue(
    STORAGE_KEYS.progress
  );

  showActiveExamScreen();
  displayCurrentQuestion();

  if (
    activeExamSettings.timerEnabled
  ) {
    startExamTimer();
  } else {
    timerText.hidden = true;
    timerWarning.textContent = "";
  }

  saveExamProgress();
}

function startNewExam() {
  const selectedQuestions =
    selectDomainBalancedQuestions();

  beginExamWithQuestions(
    selectedQuestions,
    committedSettings,
    {
      saveRecentQuestions: true
    }
  );
}

function resumeSavedExam() {
  const savedProgress =
    getSavedExamProgress();

  if (
    !savedProgressIsValid(
      savedProgress
    )
  ) {
    settingsFeedback.textContent =
      "The saved exam could not be loaded.";

    removeSavedExamProgress();
    return;
  }

  clearExamTimer();

  examQuestions =
    savedProgress.examQuestions.map(
      cloneQuestion
    );

  userAnswers =
    savedProgress.userAnswers.map(
      function (answerRecord) {
        return {
          selectedAnswer:
            Number.isInteger(
              answerRecord.selectedAnswer
            )
              ? answerRecord.selectedAnswer
              : null,

          submitted:
            Boolean(
              answerRecord.submitted
            ),

          flagged:
            Boolean(
              answerRecord.flagged
            )
        };
      }
    );

  activeExamSettings = {
    ...DEFAULT_SETTINGS,
    ...savedProgress.activeExamSettings
  };

  currentQuestionIndex =
    Math.min(
      Math.max(
        Number(
          savedProgress.currentQuestionIndex
        ) || 0,
        0
      ),
      examQuestions.length - 1
    );

  timeRemaining =
    Number.isFinite(
      savedProgress.timeRemaining
    )
      ? Math.max(
          0,
          Math.floor(
            savedProgress.timeRemaining
          )
        )
      : EXAM_TIME_SECONDS;

  const savedElapsedSeconds =
    Number.isFinite(
      savedProgress.elapsedSeconds
    )
      ? Math.max(
          0,
          Math.floor(
            savedProgress.elapsedSeconds
          )
        )
      : 0;

  examStartedAt =
    Date.now() -
    savedElapsedSeconds * 1000;

  examFinished = false;
  currentResult = null;
  lastTimerWarning = null;

  if (
    activeExamSettings.timerEnabled
  ) {
    examDeadline =
      Date.now() +
      timeRemaining * 1000;
  } else {
    examDeadline = null;
  }

  showActiveExamScreen();
  displayCurrentQuestion();

  if (
    activeExamSettings.timerEnabled
  ) {
    startExamTimer();
  } else {
    timerText.hidden = true;
    timerWarning.textContent = "";
  }

  saveExamProgress();
}

/* =====================================================
   Current-question rendering
   ===================================================== */

function getCurrentQuestion() {
  return examQuestions[
    currentQuestionIndex
  ];
}

function getCurrentAnswerRecord() {
  return userAnswers[
    currentQuestionIndex
  ];
}

function displayCurrentQuestion() {
  const currentQuestion =
    getCurrentQuestion();

  const answerRecord =
    getCurrentAnswerRecord();

  if (
    !currentQuestion ||
    !answerRecord
  ) {
    return;
  }

  questionDomain.textContent =
    currentQuestion.domain;

  questionText.textContent =
    currentQuestion.question;

  answerOptions.replaceChildren();

  currentQuestion.options.forEach(
    function (
      optionText,
      optionIndex
    ) {
      const answerLabel =
        document.createElement(
          "label"
        );

      answerLabel.className =
        "answer-option";

      const answerInput =
        document.createElement(
          "input"
        );

      answerInput.type = "radio";
      answerInput.name = "answer";
      answerInput.value =
        String(optionIndex);

      answerInput.checked =
        answerRecord.selectedAnswer ===
        optionIndex;

      const answerText =
        document.createElement(
          "span"
        );

      answerText.textContent =
        `${optionIndex + 1}. ` +
        optionText;

      const shouldLockStudyAnswer =
        activeExamSettings.mode ===
          "study" &&
        answerRecord.submitted;

      answerInput.disabled =
        shouldLockStudyAnswer;

      if (shouldLockStudyAnswer) {
        if (
          optionIndex ===
          currentQuestion.answer
        ) {
          answerLabel.classList.add(
            "correct-option"
          );
        }

        if (
          answerRecord.selectedAnswer ===
            optionIndex &&
          optionIndex !==
            currentQuestion.answer
        ) {
          answerLabel.classList.add(
            "incorrect-option"
          );
        }
      }

      answerInput.addEventListener(
        "change",
        function () {
          selectAnswer(optionIndex);
        }
      );

      answerLabel.append(
        answerInput,
        answerText
      );

      answerOptions.append(
        answerLabel
      );
    }
  );

  renderQuestionFeedback();
  updateQuestionControls();
  updateExamProgressDisplay();
  renderQuestionNavigator();
  updateExamCounts();

  saveExamProgress();
}

function selectAnswer(optionIndex) {
  const answerRecord =
    getCurrentAnswerRecord();

  if (!answerRecord) {
    return;
  }

  if (
    activeExamSettings.mode ===
      "study" &&
    answerRecord.submitted
  ) {
    return;
  }

  answerRecord.selectedAnswer =
    optionIndex;

  if (
    activeExamSettings.mode ===
    "exam"
  ) {
    answerRecord.submitted = true;
  }

  renderQuestionFeedback();
  updateQuestionControls();
  renderQuestionNavigator();
  updateExamCounts();

  saveExamProgress();
}

function renderQuestionFeedback() {
  const currentQuestion =
    getCurrentQuestion();

  const answerRecord =
    getCurrentAnswerRecord();

  feedback.textContent = "";

  feedback.classList.remove(
    "correct-feedback",
    "incorrect-feedback"
  );

  if (
    activeExamSettings.mode ===
    "exam"
  ) {
    if (
      Number.isInteger(
        answerRecord.selectedAnswer
      )
    ) {
      feedback.textContent =
        "Answer saved. You may change it " +
        "before submitting the exam.";
    }

    return;
  }

  if (!answerRecord.submitted) {
    return;
  }

  if (
    answerRecord.selectedAnswer ===
    currentQuestion.answer
  ) {
    feedback.classList.add(
      "correct-feedback"
    );

    feedback.textContent =
      `Correct. ` +
      currentQuestion.explanation;

    return;
  }

  feedback.classList.add(
    "incorrect-feedback"
  );

  const correctAnswerText =
    currentQuestion.options[
      currentQuestion.answer
    ];

  feedback.textContent =
    `Incorrect. The correct answer is ` +
    `"${correctAnswerText}". ` +
    currentQuestion.explanation;
}

function submitCurrentAnswer() {
  const answerRecord =
    getCurrentAnswerRecord();

  if (
    !Number.isInteger(
      answerRecord.selectedAnswer
    )
  ) {
    feedback.classList.remove(
      "correct-feedback"
    );

    feedback.classList.add(
      "incorrect-feedback"
    );

    feedback.textContent =
      "Select an answer before submitting.";

    return;
  }

  answerRecord.submitted = true;

  displayCurrentQuestion();
}

/* =====================================================
   Question controls and navigation
   ===================================================== */

function updateQuestionControls() {
  const answerRecord =
    getCurrentAnswerRecord();

  previousButton.disabled =
    currentQuestionIndex === 0;

  nextButton.disabled =
    currentQuestionIndex ===
    examQuestions.length - 1;

  if (
    activeExamSettings.mode ===
    "study"
  ) {
    submitAnswerButton.textContent =
      answerRecord.submitted
        ? "Answer Submitted"
        : "Submit Answer";

    submitAnswerButton.disabled =
      answerRecord.submitted;
  } else {
    submitAnswerButton.textContent =
      "Save Answer";

    submitAnswerButton.disabled =
      !Number.isInteger(
        answerRecord.selectedAnswer
      );
  }

  flagButton.classList.toggle(
    "flagged",
    answerRecord.flagged
  );

  flagButton.setAttribute(
    "aria-pressed",
    String(answerRecord.flagged)
  );

  flagButton.textContent =
    answerRecord.flagged
      ? "Remove Flag"
      : "Flag for Review";
}

function updateExamProgressDisplay() {
  const questionNumber =
    currentQuestionIndex + 1;

  progressText.textContent =
    `Question ${questionNumber} of ` +
    `${examQuestions.length}`;

  examProgress.value =
    questionNumber;

  examProgress.max =
    examQuestions.length;
}

function updateExamCounts() {
  const totalAnswered =
    userAnswers.filter(
      function (answerRecord) {
        return Number.isInteger(
          answerRecord.selectedAnswer
        );
      }
    ).length;

  const totalFlagged =
    userAnswers.filter(
      function (answerRecord) {
        return answerRecord.flagged;
      }
    ).length;

  answeredCount.textContent =
    String(totalAnswered);

  flaggedCount.textContent =
    String(totalFlagged);
}

function renderQuestionNavigator() {
  questionNavigator.replaceChildren();

  examQuestions.forEach(
    function (
      question,
      questionIndex
    ) {
      const navigatorButton =
        document.createElement(
          "button"
        );

      navigatorButton.type =
        "button";

      navigatorButton.className =
        "navigator-button";

      navigatorButton.textContent =
        String(questionIndex + 1);

      navigatorButton.setAttribute(
        "aria-label",
        `Go to question ` +
        `${questionIndex + 1}`
      );

      const answerRecord =
        userAnswers[questionIndex];

      if (
        questionIndex ===
        currentQuestionIndex
      ) {
        navigatorButton.classList.add(
          "current-question"
        );

        navigatorButton.setAttribute(
          "aria-current",
          "step"
        );
      }

      if (
        Number.isInteger(
          answerRecord.selectedAnswer
        )
      ) {
        navigatorButton.classList.add(
          "answered-question"
        );
      }

      if (answerRecord.flagged) {
        navigatorButton.classList.add(
          "flagged-question"
        );
      }

      navigatorButton.addEventListener(
        "click",
        function () {
          goToQuestion(
            questionIndex
          );
        }
      );

      questionNavigator.append(
        navigatorButton
      );
    }
  );
}

function goToQuestion(questionIndex) {
  if (
    questionIndex < 0 ||
    questionIndex >=
      examQuestions.length
  ) {
    return;
  }

  currentQuestionIndex =
    questionIndex;

  displayCurrentQuestion();

  questionText.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function goToPreviousQuestion() {
  goToQuestion(
    currentQuestionIndex - 1
  );
}

function goToNextQuestion() {
  goToQuestion(
    currentQuestionIndex + 1
  );
}

function toggleCurrentQuestionFlag() {
  const answerRecord =
    getCurrentAnswerRecord();

  answerRecord.flagged =
    !answerRecord.flagged;

  updateQuestionControls();
  renderQuestionNavigator();
  updateExamCounts();

  saveExamProgress();
}

function toggleQuestionNavigator() {
  const willOpen =
    questionNavigator.hidden;

  questionNavigator.hidden =
    !willOpen;

  toggleNavigatorButton.setAttribute(
    "aria-expanded",
    String(willOpen)
  );

  toggleNavigatorButton.textContent =
    willOpen
      ? "Hide Question Navigator"
      : "Show Question Navigator";
}
/* =====================================================
   Exam timer
   ===================================================== */

function updateTimerDisplay() {
  if (
    !activeExamSettings ||
    !activeExamSettings.timerEnabled
  ) {
    timerText.hidden = true;
    timerWarning.textContent = "";

    return;
  }

  timerText.hidden = false;

  timerText.textContent =
    `Time Remaining: ` +
    formatTime(timeRemaining);

  timerText.classList.remove(
    "timer-warning",
    "timer-critical"
  );

  timerWarning.classList.remove(
    "critical"
  );

  if (timeRemaining <= 60) {
    timerText.classList.add(
      "timer-critical"
    );

    timerWarning.classList.add(
      "critical"
    );

    timerWarning.textContent =
      "One minute remains.";

    if (
      lastTimerWarning !== 60
    ) {
      lastTimerWarning = 60;
    }

    return;
  }

  if (timeRemaining <= 5 * 60) {
    timerText.classList.add(
      "timer-critical"
    );

    timerWarning.classList.add(
      "critical"
    );

    timerWarning.textContent =
      "Five minutes remain.";

    if (
      lastTimerWarning !== 300
    ) {
      lastTimerWarning = 300;
    }

    return;
  }

  if (timeRemaining <= 15 * 60) {
    timerText.classList.add(
      "timer-warning"
    );

    timerWarning.textContent =
      "Fifteen minutes remain.";

    if (
      lastTimerWarning !== 900
    ) {
      lastTimerWarning = 900;
    }

    return;
  }

  timerWarning.textContent = "";
}

function startExamTimer() {
  clearExamTimer();

  if (
    !activeExamSettings ||
    !activeExamSettings.timerEnabled
  ) {
    timerText.hidden = true;
    return;
  }

  if (!examDeadline) {
    examDeadline =
      Date.now() +
      timeRemaining * 1000;
  }

  updateTimerDisplay();

  timerInterval = window.setInterval(
    function () {
      timeRemaining = Math.max(
        0,
        Math.ceil(
          (
            examDeadline -
            Date.now()
          ) / 1000
        )
      );

      updateTimerDisplay();

      if (
        timeRemaining > 0 &&
        timeRemaining % 15 === 0
      ) {
        saveExamProgress();
      }

      if (timeRemaining <= 0) {
        clearExamTimer();

        finishExam(
          "timer-expired"
        );
      }
    },
    1000
  );
}

function clearExamTimer() {
  if (timerInterval !== null) {
    window.clearInterval(
      timerInterval
    );

    timerInterval = null;
  }
}

/* =====================================================
   Submission confirmation
   ===================================================== */

function countAnsweredQuestions() {
  return userAnswers.filter(
    function (answerRecord) {
      return Number.isInteger(
        answerRecord.selectedAnswer
      );
    }
  ).length;
}

function countFlaggedQuestions() {
  return userAnswers.filter(
    function (answerRecord) {
      return answerRecord.flagged;
    }
  ).length;
}

function requestExamSubmission() {
  if (!isExamActive()) {
    return;
  }

  const answered =
    countAnsweredQuestions();

  const unanswered =
    examQuestions.length -
    answered;

  const flagged =
    countFlaggedQuestions();

  submitSummary.textContent =
    `You have answered ${answered} of ` +
    `${examQuestions.length} questions. ` +
    `${unanswered} remain unanswered, and ` +
    `${flagged} are flagged for review.`;

  openDialog(submitDialog);
}

/* =====================================================
   Scoring and result calculations
   ===================================================== */

function createEmptyDomainResult(
  domainName
) {
  return {
    domain: domainName,
    correct: 0,
    answered: 0,
    total: 0,
    percentage: 0
  };
}

function calculateDomainResults() {
  const domainResults = {};

  DOMAIN_NAMES.forEach(function (
    domainName
  ) {
    domainResults[domainName] =
      createEmptyDomainResult(
        domainName
      );
  });

  examQuestions.forEach(function (
    question,
    questionIndex
  ) {
    const answerRecord =
      userAnswers[questionIndex];

    if (!domainResults[question.domain]) {
      domainResults[question.domain] =
        createEmptyDomainResult(
          question.domain
        );
    }

    const domainResult =
      domainResults[question.domain];

    domainResult.total += 1;

    if (
      Number.isInteger(
        answerRecord.selectedAnswer
      )
    ) {
      domainResult.answered += 1;
    }

    if (
      answerRecord.selectedAnswer ===
      question.answer
    ) {
      domainResult.correct += 1;
    }
  });

  return Object.values(
    domainResults
  )
    .filter(function (domainResult) {
      return domainResult.total > 0;
    })
    .map(function (domainResult) {
      return {
        ...domainResult,

        percentage:
          Math.round(
            (
              domainResult.correct /
              domainResult.total
            ) * 100
          )
      };
    });
}

function calculateExamResult(
  completionReason
) {
  let correctAnswers = 0;
  let answeredQuestions = 0;

  const missedQuestionIndexes = [];

  examQuestions.forEach(function (
    question,
    questionIndex
  ) {
    const answerRecord =
      userAnswers[questionIndex];

    const hasAnswer =
      Number.isInteger(
        answerRecord.selectedAnswer
      );

    if (hasAnswer) {
      answeredQuestions += 1;
    }

    const isCorrect =
      answerRecord.selectedAnswer ===
      question.answer;

    if (isCorrect) {
      correctAnswers += 1;
    } else {
      missedQuestionIndexes.push(
        questionIndex
      );
    }
  });

  const totalQuestions =
    examQuestions.length;

  const percentage =
    totalQuestions > 0
      ? Math.round(
          (
            correctAnswers /
            totalQuestions
          ) * 100
        )
      : 0;

  const elapsedSeconds =
    activeExamSettings.timerEnabled
      ? Math.min(
          EXAM_TIME_SECONDS,
          Math.max(
            0,
            EXAM_TIME_SECONDS -
            timeRemaining
          )
        )
      : getElapsedExamSeconds();

  return {
    completedAt:
      new Date().toISOString(),

    completionReason:
      completionReason,

    settings: {
      ...activeExamSettings
    },

    correctAnswers:
      correctAnswers,

    answeredQuestions:
      answeredQuestions,

    unansweredQuestions:
      totalQuestions -
      answeredQuestions,

    flaggedQuestions:
      countFlaggedQuestions(),

    totalQuestions:
      totalQuestions,

    percentage:
      percentage,

    elapsedSeconds:
      elapsedSeconds,

    missedQuestionIndexes:
      missedQuestionIndexes,

    domainResults:
      calculateDomainResults()
  };
}

/* =====================================================
   Completing an exam
   ===================================================== */

function getCompletionMessage(
  result
) {
  if (
    result.completionReason ===
    "timer-expired"
  ) {
    return (
      "Time expired, so the exam was " +
      "submitted automatically."
    );
  }

  if (
    result.completionReason ===
    "settings-change"
  ) {
    return (
      "The exam was ended so the new " +
      "settings could be committed."
    );
  }

  if (result.percentage >= 85) {
    return (
      "Excellent practice result. " +
      "Continue reviewing missed questions " +
      "rather than assuming the universe " +
      "has finally favored you."
    );
  }

  if (result.percentage >= 75) {
    return (
      "Solid practice result. Focus on the " +
      "lowest-scoring domain before the next " +
      "attempt."
    );
  }

  return (
    "This attempt identified several areas " +
    "that need additional review. Use the " +
    "missed-question retry before starting " +
    "another full exam."
  );
}

function finishExam(
  completionReason = "manual"
) {
  if (!isExamActive()) {
    return;
  }

  clearExamTimer();

  currentResult =
    calculateExamResult(
      completionReason
    );

  examFinished = true;

  removeSavedExamProgress();

  saveAttemptToHistory(
    currentResult
  );

  displayExamResults();

  showResultsScreen();
}

function displayExamResults() {
  if (!currentResult) {
    return;
  }

  scoreText.textContent =
    `Score: ` +
    `${currentResult.correctAnswers} of ` +
    `${currentResult.totalQuestions} ` +
    `(${currentResult.percentage}%).`;

  timeUsedText.textContent =
    `Time used: ` +
    formatDuration(
      currentResult.elapsedSeconds
    ) +
    `.`;

  resultMessage.textContent =
    getCompletionMessage(
      currentResult
    );

  displayDomainResults(
    currentResult.domainResults
  );

  displayWeakDomainRecommendation(
    currentResult.domainResults
  );

  const hasMissedQuestions =
    currentResult
      .missedQuestionIndexes
      .length > 0;

  reviewMissedButton.disabled =
    !hasMissedQuestions;

  retryMissedButton.disabled =
    !hasMissedQuestions;

  renderAttemptHistory();
}

/* =====================================================
   Domain results
   ===================================================== */

function displayDomainResults(
  domainResults
) {
  domainScoreList.replaceChildren();

  domainResults.forEach(function (
    domainResult
  ) {
    const domainCard =
      document.createElement(
        "article"
      );

    domainCard.className =
      "domain-score";

    const domainHeading =
      document.createElement(
        "strong"
      );

    domainHeading.textContent =
      domainResult.domain;

    const domainSummary =
      document.createElement(
        "p"
      );

    domainSummary.textContent =
      `${domainResult.correct} correct ` +
      `of ${domainResult.total} ` +
      `(${domainResult.percentage}%).`;

    const domainProgress =
      document.createElement(
        "progress"
      );

    domainProgress.value =
      domainResult.correct;

    domainProgress.max =
      domainResult.total;

    domainProgress.setAttribute(
      "aria-label",
      `${domainResult.domain}: ` +
      `${domainResult.percentage}%`
    );

    domainCard.append(
      domainHeading,
      domainSummary,
      domainProgress
    );

    domainScoreList.append(
      domainCard
    );
  });
}

function displayWeakDomainRecommendation(
  domainResults
) {
  if (
    !Array.isArray(domainResults) ||
    domainResults.length === 0
  ) {
    weakDomainPanel.hidden = true;
    return;
  }

  weakDomainPanel.hidden = false;

  const lowestPercentage =
    Math.min(
      ...domainResults.map(
        function (domainResult) {
          return (
            domainResult.percentage
          );
        }
      )
    );

  const weakestDomains =
    domainResults.filter(
      function (domainResult) {
        return (
          domainResult.percentage ===
          lowestPercentage
        );
      }
    );

  const weakestDomainNames =
    weakestDomains.map(
      function (domainResult) {
        return domainResult.domain;
      }
    );

  if (
    weakestDomainNames.length === 1
  ) {
    weakDomainText.textContent =
      `${weakestDomainNames[0]} was your ` +
      `lowest-scoring domain at ` +
      `${lowestPercentage}%. Review its ` +
      `missed questions first.`;

    return;
  }

  weakDomainText.textContent =
    `Your lowest-scoring domains were ` +
    `${weakestDomainNames.join(", ")} ` +
    `at ${lowestPercentage}%. Review the ` +
    `missed questions from these domains first.`;
}

/* =====================================================
   Attempt history
   ===================================================== */

function getAttemptHistory() {
  const storedHistory = loadJSON(
    STORAGE_KEYS.history,
    []
  );

  if (!Array.isArray(storedHistory)) {
    return [];
  }

  return storedHistory;
}

function createHistoryRecord(result) {
  return {
    completedAt:
      result.completedAt,

    percentage:
      result.percentage,

    correctAnswers:
      result.correctAnswers,

    totalQuestions:
      result.totalQuestions,

    elapsedSeconds:
      result.elapsedSeconds,

    mode:
      result.settings.mode,

    completionReason:
      result.completionReason,

    domainResults:
      result.domainResults
  };
}

function saveAttemptToHistory(result) {
  const history =
    getAttemptHistory();

  history.unshift(
    createHistoryRecord(result)
  );

  saveJSON(
    STORAGE_KEYS.history,
    history.slice(
      0,
      MAX_HISTORY_ITEMS
    )
  );
}

function getFriendlyModeName(mode) {
  return mode === "exam"
    ? "Exam Mode"
    : "Study Mode";
}

function getFriendlyCompletionReason(
  completionReason
) {
  if (
    completionReason ===
    "timer-expired"
  ) {
    return "Timer expired";
  }

  if (
    completionReason ===
    "settings-change"
  ) {
    return "Ended for settings";
  }

  return "Submitted";
}

function renderAttemptHistory() {
  attemptHistory.replaceChildren();

  const history =
    getAttemptHistory();

  if (history.length === 0) {
    const emptyMessage =
      document.createElement(
        "p"
      );

    emptyMessage.textContent =
      "No completed attempts are saved.";

    attemptHistory.append(
      emptyMessage
    );

    clearHistoryButton.disabled =
      true;

    return;
  }

  clearHistoryButton.disabled =
    false;

  history.forEach(function (
    historyRecord
  ) {
    const historyItem =
      document.createElement(
        "article"
      );

    historyItem.className =
      "history-item";

    const dateText =
      document.createElement(
        "p"
      );

    const completedDate =
      new Date(
        historyRecord.completedAt
      );

    dateText.textContent =
      completedDate.toLocaleString(
        "en-US",
        {
          dateStyle: "medium",
          timeStyle: "short"
        }
      );

    const scoreValue =
      document.createElement(
        "p"
      );

    scoreValue.textContent =
      `${historyRecord.percentage}%`;

    const modeValue =
      document.createElement(
        "p"
      );

    modeValue.textContent =
      getFriendlyModeName(
        historyRecord.mode
      );

    const durationValue =
      document.createElement(
        "p"
      );

    durationValue.textContent =
      formatDuration(
        historyRecord.elapsedSeconds
      );

    const reasonValue =
      document.createElement(
        "p"
      );

    reasonValue.textContent =
      getFriendlyCompletionReason(
        historyRecord.completionReason
      );

    historyItem.append(
      dateText,
      scoreValue,
      modeValue,
      durationValue,
      reasonValue
    );

    attemptHistory.append(
      historyItem
    );
  });
}

function requestHistoryClear() {
  if (
    getAttemptHistory().length === 0
  ) {
    return;
  }

  openDialog(
    clearHistoryDialog
  );
}

function clearAttemptHistory() {
  removeStoredValue(
    STORAGE_KEYS.history
  );

  renderAttemptHistory();
}
/* =====================================================
   Question review
   ===================================================== */

function createReviewItem(
  question,
  answerRecord,
  questionNumber
) {
  const reviewItem =
    document.createElement("article");

  reviewItem.className =
    "review-item";

  const heading =
    document.createElement("h3");

  heading.textContent =
    `Question ${questionNumber}`;

  const domainText =
    document.createElement("p");

  domainText.textContent =
    question.domain;

  const questionParagraph =
    document.createElement("p");

  const questionStrong =
    document.createElement("strong");

  questionStrong.textContent =
    question.question;

  questionParagraph.append(
    questionStrong
  );

  const userAnswerParagraph =
    document.createElement("p");

  const hasSelectedAnswer =
    Number.isInteger(
      answerRecord.selectedAnswer
    );

  const selectedAnswerText =
    hasSelectedAnswer
      ? question.options[
          answerRecord.selectedAnswer
        ]
      : "No answer selected";

  userAnswerParagraph.textContent =
    `Your answer: ${selectedAnswerText}`;

  const isCorrect =
    answerRecord.selectedAnswer ===
    question.answer;

  userAnswerParagraph.classList.add(
    isCorrect
      ? "correct-answer"
      : "incorrect-answer"
  );

  const correctAnswerParagraph =
    document.createElement("p");

  correctAnswerParagraph.textContent =
    `Correct answer: ` +
    question.options[
      question.answer
    ];

  correctAnswerParagraph.className =
    "correct-answer";

  const statusParagraph =
    document.createElement("p");

  if (isCorrect) {
    statusParagraph.textContent =
      "Result: Correct";

    statusParagraph.className =
      "correct-answer";
  } else if (!hasSelectedAnswer) {
    statusParagraph.textContent =
      "Result: Unanswered";

    statusParagraph.className =
      "incorrect-answer";
  } else {
    statusParagraph.textContent =
      "Result: Incorrect";

    statusParagraph.className =
      "incorrect-answer";
  }

  if (answerRecord.flagged) {
    statusParagraph.textContent +=
      " · Flagged for review";
  }

  const explanationDetails =
    document.createElement(
      "details"
    );

  explanationDetails.className =
    "review-explanation";

  const explanationSummary =
    document.createElement(
      "summary"
    );

  explanationSummary.textContent =
    "Show Explanation";

  const explanationParagraph =
    document.createElement("p");

  explanationParagraph.textContent =
    question.explanation;

  explanationDetails.addEventListener(
    "toggle",
    function () {
      explanationSummary.textContent =
        explanationDetails.open
          ? "Hide Explanation"
          : "Show Explanation";
    }
  );

  explanationDetails.append(
    explanationSummary,
    explanationParagraph
  );

  reviewItem.append(
    heading,
    domainText,
    questionParagraph,
    userAnswerParagraph,
    correctAnswerParagraph,
    statusParagraph,
    explanationDetails
  );

  return reviewItem;
}

function showQuestionReview(
  reviewType
) {
  if (!currentResult) {
    return;
  }

  reviewList.replaceChildren();

  let questionIndexes = [];

  if (reviewType === "missed") {
    questionIndexes = [
      ...currentResult
        .missedQuestionIndexes
    ];

    reviewTitle.textContent =
      "Missed Question Review";
  } else {
    questionIndexes =
      examQuestions.map(function (
        question,
        questionIndex
      ) {
        return questionIndex;
      });

    reviewTitle.textContent =
      "Complete Question Review";
  }

  if (questionIndexes.length === 0) {
    const emptyMessage =
      document.createElement("p");

    emptyMessage.textContent =
      "There are no questions to review.";

    reviewList.append(
      emptyMessage
    );
  } else {
    questionIndexes.forEach(
      function (questionIndex) {
        const reviewItem =
          createReviewItem(
            examQuestions[
              questionIndex
            ],
            userAnswers[
              questionIndex
            ],
            questionIndex + 1
          );

        reviewList.append(
          reviewItem
        );
      }
    );
  }

  showReviewScreen();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function returnToResults() {
  showResultsScreen();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* =====================================================
   Retry missed questions
   ===================================================== */

function retryMissedQuestions() {
  if (
    !currentResult ||
    currentResult
      .missedQuestionIndexes
      .length === 0
  ) {
    return;
  }

  const missedQuestions =
    currentResult
      .missedQuestionIndexes
      .map(function (
        questionIndex
      ) {
        return cloneQuestion(
          examQuestions[
            questionIndex
          ]
        );
      });

  if (
    committedSettings
      .shuffleQuestions
  ) {
    shuffleArray(
      missedQuestions
    );
  }

  beginExamWithQuestions(
    missedQuestions,
    committedSettings,
    {
      saveRecentQuestions: false
    }
  );
}

/* =====================================================
   Keyboard controls
   ===================================================== */

function shouldIgnoreKeyboardShortcut(
  event
) {
  const activeElement =
    document.activeElement;

  if (
    submitDialog.open ||
    commitSettingsDialog.open ||
    clearHistoryDialog.open
  ) {
    return true;
  }

  if (!isExamActive()) {
    return true;
  }

  if (!activeElement) {
    return false;
  }

  const tagName =
    activeElement.tagName;

  if (
    tagName === "SELECT" ||
    tagName === "TEXTAREA"
  ) {
    return true;
  }

  if (
    tagName === "INPUT" &&
    activeElement.type !== "radio"
  ) {
    return true;
  }

  if (
    activeElement.isContentEditable
  ) {
    return true;
  }

  return false;
}

function handleExamKeyboard(
  event
) {
  if (
    shouldIgnoreKeyboardShortcut(
      event
    )
  ) {
    return;
  }

  if (
    event.key >= "1" &&
    event.key <= "4"
  ) {
    const optionIndex =
      Number(event.key) - 1;

    const currentQuestion =
      getCurrentQuestion();

    if (
      optionIndex <
      currentQuestion.options.length
    ) {
      event.preventDefault();

      selectAnswer(optionIndex);

      displayCurrentQuestion();
    }

    return;
  }

  if (
    event.key === "f" ||
    event.key === "F"
  ) {
    event.preventDefault();

    toggleCurrentQuestionFlag();

    return;
  }

  if (event.key === "ArrowLeft") {
    if (
      currentQuestionIndex > 0
    ) {
      event.preventDefault();

      goToPreviousQuestion();
    }

    return;
  }

  if (event.key === "ArrowRight") {
    if (
      currentQuestionIndex <
      examQuestions.length - 1
    ) {
      event.preventDefault();

      goToNextQuestion();
    }

    return;
  }

  if (event.key === "Enter") {
    const activeElement =
      document.activeElement;

    if (
      activeElement &&
      activeElement.tagName ===
        "BUTTON"
    ) {
      return;
    }

    event.preventDefault();

    submitCurrentAnswer();
  }
}

/* =====================================================
   Dialog results
   ===================================================== */

function handleSubmitDialogClose() {
  if (
    submitDialog.returnValue ===
    "confirm"
  ) {
    finishExam("manual");
  }
}

function handleSettingsDialogClose() {
  if (
    commitSettingsDialog
      .returnValue !== "confirm"
  ) {
    settingsFeedback.textContent =
      "The current test was preserved. " +
      "Settings remain pending.";

    return;
  }

  if (isExamActive()) {
    finishExam(
      "settings-change"
    );
  }

  applyPendingSettings();

  settingsFeedback.textContent =
    "The changes were committed. " +
    "They will apply to the next test.";

  updateToolbarState();
}

function handleClearHistoryDialogClose() {
  if (
    clearHistoryDialog
      .returnValue === "confirm"
  ) {
    clearAttemptHistory();
  }
}

/* =====================================================
   Event listeners
   ===================================================== */

settingsToggleButton.addEventListener(
  "click",
  toggleSettingsPanel
);

modeSelect.addEventListener(
  "change",
  function () {
    updateModeDescription();
    updatePendingSettingsState();
  }
);

shuffleQuestionsCheckbox
  .addEventListener(
    "change",
    updatePendingSettingsState
  );

shuffleAnswersCheckbox
  .addEventListener(
    "change",
    updatePendingSettingsState
  );

timerCheckbox.addEventListener(
  "change",
  updatePendingSettingsState
);

commitSettingsButton
  .addEventListener(
    "click",
    requestSettingsCommit
  );

revertSettingsButton
  .addEventListener(
    "click",
    revertPendingSettings
  );

startButton.addEventListener(
  "click",
  startNewExam
);

resumeButton.addEventListener(
  "click",
  resumeSavedExam
);

discardSavedButton.addEventListener(
  "click",
  discardSavedExam
);

answerForm.addEventListener(
  "submit",
  function (event) {
    event.preventDefault();

    submitCurrentAnswer();
  }
);

previousButton.addEventListener(
  "click",
  goToPreviousQuestion
);

nextButton.addEventListener(
  "click",
  goToNextQuestion
);

flagButton.addEventListener(
  "click",
  toggleCurrentQuestionFlag
);

finishButton.addEventListener(
  "click",
  requestExamSubmission
);

toggleNavigatorButton
  .addEventListener(
    "click",
    toggleQuestionNavigator
  );

reviewMissedButton
  .addEventListener(
    "click",
    function () {
      showQuestionReview(
        "missed"
      );
    }
  );

reviewAllButton.addEventListener(
  "click",
  function () {
    showQuestionReview(
      "all"
    );
  }
);

retryMissedButton
  .addEventListener(
    "click",
    retryMissedQuestions
  );

newExamButton.addEventListener(
  "click",
  startNewExam
);

backToResultsButton
  .addEventListener(
    "click",
    returnToResults
  );

clearHistoryButton
  .addEventListener(
    "click",
    requestHistoryClear
  );

submitDialog.addEventListener(
  "close",
  handleSubmitDialogClose
);

commitSettingsDialog
  .addEventListener(
    "close",
    handleSettingsDialogClose
  );

clearHistoryDialog
  .addEventListener(
    "close",
    handleClearHistoryDialogClose
  );

document.addEventListener(
  "keydown",
  handleExamKeyboard
);

document.addEventListener(
  "visibilitychange",
  function () {
    if (
      document.hidden &&
      isExamActive()
    ) {
      saveExamProgress();
    }
  }
);

window.addEventListener(
  "beforeunload",
  function () {
    if (isExamActive()) {
      saveExamProgress();
    }
  }
);

/* =====================================================
   Application validation
   ===================================================== */

function validateQuestionBank() {
  if (
    !Array.isArray(
      normalizedQuestionBank
    )
  ) {
    throw new Error(
      "The normalized question bank " +
      "was not created."
    );
  }

  if (
    normalizedQuestionBank.length <
    EXAM_QUESTION_COUNT
  ) {
    throw new Error(
      `The question bank contains only ` +
      `${normalizedQuestionBank.length} ` +
      `questions. At least ` +
      `${EXAM_QUESTION_COUNT} are required.`
    );
  }

  normalizedQuestionBank.forEach(
    function (
      question,
      questionIndex
    ) {
      if (
        typeof question.question !==
        "string"
      ) {
        throw new Error(
          `Question ${questionIndex + 1} ` +
          "does not contain valid text."
        );
      }

      if (
        !Array.isArray(
          question.options
        ) ||
        question.options.length < 2
      ) {
        throw new Error(
          `Question ${questionIndex + 1} ` +
          "does not contain enough options."
        );
      }

      if (
        !Number.isInteger(
          question.answer
        ) ||
        question.answer < 0 ||
        question.answer >=
          question.options.length
      ) {
        throw new Error(
          `Question ${questionIndex + 1} ` +
          "contains an invalid answer index."
        );
      }

      if (
        typeof question.explanation !==
        "string"
      ) {
        throw new Error(
          `Question ${questionIndex + 1} ` +
          "does not contain an explanation."
        );
      }

      if (
        !DOMAIN_NAMES.includes(
          question.domain
        )
      ) {
        throw new Error(
          `Question ${questionIndex + 1} ` +
          `contains an unsupported domain: ` +
          `${question.domain}`
        );
      }
    }
  );

  DOMAIN_NAMES.forEach(function (
    domainName
  ) {
    const availableQuestions =
      normalizedQuestionBank.filter(
        function (question) {
          return (
            question.domain ===
            domainName
          );
        }
      ).length;

    const requiredQuestions =
      DOMAIN_QUESTION_COUNTS[
        domainName
      ];

    if (
      availableQuestions <
      requiredQuestions
    ) {
      throw new Error(
        `${domainName} contains only ` +
        `${availableQuestions} questions, ` +
        `but ${requiredQuestions} are required.`
      );
    }
  });
}

/* =====================================================
   Application startup
   ===================================================== */

function initializeApplication() {
  try {
    normalizeQuestionBank();
    validateQuestionBank();

    pendingSettings = {
      ...committedSettings
    };

    writeSettingsToControls(
      committedSettings
    );

    updatePendingSettingsState();
    updateModeDescription();

    renderAttemptHistory();
    showWelcomeScreen();

    questionNavigator.hidden = true;

    toggleNavigatorButton
      .setAttribute(
        "aria-expanded",
        "false"
      );

    console.info(
      `Loaded ` +
      `${normalizedQuestionBank.length} ` +
      `practice questions successfully.`
    );
  } catch (error) {
    console.error(error);

    hideMainScreens();

    welcomeScreen.hidden = false;

    welcomeScreen.replaceChildren();

    const errorHeading =
      document.createElement("h2");

    errorHeading.textContent =
      "Unable to Start the Exam";

    const errorMessage =
      document.createElement("p");

    errorMessage.textContent =
      error.message;

    const instructionMessage =
      document.createElement("p");

    instructionMessage.textContent =
      "Check questions.js for a missing " +
      "comma, bracket, quotation mark, " +
      "domain label, or answer index.";

    welcomeScreen.append(
      errorHeading,
      errorMessage,
      instructionMessage
    );

    startButton.disabled = true;
  }
}

initializeApplication();