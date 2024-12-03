# Evaluate News With NLP

This project is part of the Udacity Front End Web Developer Nanodegree program. It involves evaluating news articles using Natural Language Processing (NLP) to extract meaningful insights.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Branching and Merging](#branching-and-merging)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The goal of this project is to build a web application that allows users to submit a URL of a news article, which is then processed using NLP to provide sentiment analysis and other relevant information.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mohamedkbx/news-evaluate-nlp.git
   ```
2. Navigate to the project directory:
   ```bash
   cd news-evaluate-nlp
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm run build-dev
   ```
2. Open your browser and navigate to `http://localhost:8000`.

## Branching and Merging

We follow the Gitflow workflow for branching and merging:

1. **Feature Branches**: Each new feature should be developed in its own branch. Branch off from `develop`:
   ```bash
   git checkout -b feature/your-feature-name develop
   ```
2. **Merging**: Once the feature is complete, merge it back into `develop`:
   ```bash
   git checkout develop
   git merge feature/your-feature-name
   ```
3. **Release Branches**: When ready for a release, create a release branch from `develop`:
   ```bash
   git checkout -b release/v1.0.0 develop
   ```
4. **Hotfix Branches**: For critical fixes in production, create a hotfix branch from `main`:
   ```bash
   git checkout -b hotfix/your-hotfix-name main
   ```

## Testing

We use Jest for testing. To run tests:

```bash
npm run test
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
