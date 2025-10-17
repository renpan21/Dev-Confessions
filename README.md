<h1 align="center">Dev Confessions</h1>

<p align="center">
  A fun, beginner-friendly open-source project where developers share their funniest, most relatable coding mistakes and experiences anonymously!
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License: MIT">
  </a>
  <a href="https://github.com/renpan21/dev-confessions/issues">
    <img src="https://img.shields.io/github/issues/renpan21/dev-confessions" alt="Issues">
  </a>
  <a href="https://github.com/renpan21/dev-confessions/pulls">
    <img src="https://img.shields.io/github/issues-pr/renpan21/dev-confessions" alt="Pull Requests">
  </a>
  <a href="https://github.com/renpan21/dev-confessions/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/renpan21/dev-confessions" alt="Contributors">
  </a>
  <img src="https://img.shields.io/badge/status-open--source-blue" alt="Open Source">
  <img src="https://img.shields.io/badge/good%20first%20issue-welcome-yellow" alt="Good First Issue">
</p>

---

##  About

We all break things sometimes might as well laugh about it and learn from it together.
This project is a lightweight **HTML + JS static site** that displays developer confessions stored in a simple JSON file.

Perfect for:

* Junior developers
* Fresh grads
* First time open source contributors

---


## How to Contribute

1. **Fork** this repository
2. Add your confession to `data/confessions.json`
3. Follow the **ID format** (see below)
4. Commit your change with a [Conventional Commit](#-conventional-commits)
5. **Open a Pull Request**

---

## Confession ID Convention

Each confession must have a unique ID following this pattern:

### Example:

```json
"id": "conf-20251018-006"
```

**Format explanation:**

* **YYYYMMDD** → Date of contribution
* **XXX** → Incremental 3-digit number (ex., 001, 002, 003...)

**Good:** `conf-20251017-006`
**Bad:** `c6`, `conf6`

This ensures no duplicate IDs when multiple contributors add entries at once.

---

## Conventional Commits

We follow the [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) standard.

### Format

```
<type>(optional scope): <description>
```

### Common Types

| Type     | Description                              |
| -------- | ---------------------------------------- |
| feat     | Add a new confession or feature         |
| fix      | Fix a typo or small issue                |
| docs     | Documentation updates                    |
| style    | UI or formatting changes                 |
| refactor | Code cleanup or reorganization           |
| chore    | Maintenance, config, or workflow updates |

### Examples

```
feat: add new confession about Friday deploy
fix: correct typo in README
docs: clarify ID naming convention
```

---

## Example JSON

```json
{
  "id": "conf-20251018-006",
  "date": "2025-10-17",
  "author": "anonymous",
  "content": "I used rm -rf. inside the wrong folder. Goodbye, project.",
  "tags": ["terminal", "funny"],
  "language": "en"
}
```

---

##  Tech Stack

*  HTML
* JavaScriptsss
* JSON
* 

---

##  Code of Conduct

Be kind, inclusive, and respectful.
We’re here to laugh **with**, not **at** other devs.
See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for full details.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

## Inspiration

This project exists to:

* Help beginners learn open source collaboration
* Encourage safe, fun storytelling for devs
* Laugh at our mistakes because we’ve all been there.

* Note: I want to give thanks to the vid that i see on TikTok saying to contribute in an open source repo but i can't find the video link so i can't add the credits here.

---

<p align="center">
  Star this repo if you enjoyed it! <br>
  Made by the Open Source Dev Community (Mostly Fresh Grads and New to Open Source Contribution)
</p>
