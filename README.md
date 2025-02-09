<p align="center"><img src="https://docs.qawolf.com/img/logo_small.png" height="80" /></p>

<h1 align="center">QA Wolf</h1>

<h3 align="center">Create browser tests 10x faster</h3>

<p align="center">QA Wolf is a free and open source library to create <a href="https://github.com/microsoft/playwright">Playwright</a>/<a href="https://jestjs.io">Jest</a> browser tests and run them in CI</p>

<p align="center">
  <a href="http://badge.fury.io/js/qawolf"><img src="https://badge.fury.io/js/qawolf.svg" alt="npm version" /></a>
  <img src="https://github.com/qawolf/qawolf/workflows/Unit%20Tests/badge.svg" />
  <img src="https://github.com/qawolf/qawolf/workflows/Browsers%20Linux/badge.svg" />
  <img src="https://github.com/qawolf/qawolf/workflows/Browsers%20Windows/badge.svg" />
</p>

<p align="center">
    <a href="https://docs.qawolf.com/docs/install">🚀 Get Started</a> |
    <a href="https://docs.qawolf.com/docs/api/table_of_contents">📖 API</a> |
    <a href="https://gitter.im/qawolf/community">👋 Chat</a> |
    <a href="https://github.com/qawolf/qawolf/projects/4">🗺️ Roadmap</a>
</p>

<img src="https://storage.googleapis.com/docs.qawolf.com/website/create.gif">

<br/>

<ul>
<li><b>Skip writing boilerplate.</b> Your browser actions are converted to Playwright and Jest code.
</li>
<li><b>Built for stability.</b> Avoid flaky tests with automatic waiting and <a href="https://docs.qawolf.com/docs/use_custom_selectors#default-selector-logic">smart element selectors</a>.
</li>
<li><b>Test complex scenarios.</b> Test your application like a user. Use third party sites, multiple windows, and hot keys.
</li>
<li><b>Test across browsers.</b> Test your application on <a href="https://www.chromium.org/Home">Chromium</a>, <a href="https://www.mozilla.org/en-US/firefox/new">Firefox</a>, and <a href="https://webkit.org">WebKit</a>.
</li>
<li><b>Easy CI setup.</b> Run your tests in CI in parallel with one command, on push or on a schedule.
</li>
<li><b>Easy debugging.</b> Each test run in CI includes a video, GIF, and detailed logs.
</li>
</ul>
<p>We're working to build a world where browser testing is effortless. We hope you'll join us!</p>

## Table of Contents

- [🖥️ Install QA Wolf](#%EF%B8%8F-install-qa-wolf)
- [✅ Create a browser test](#-create-a-browser-test)
- [☁️ Set up CI](#%EF%B8%8F-set-up-ci)
- [🙋 Get Help](#-get-help)
- [📝 License](#-license)
- [🙏 Acknowledgments](#-acknowledgements)

<br/>

## 🖥️ Install QA Wolf

[Documentation](http://docs.qawolf.com/docs/install)

Install QA Wolf as a dev dependency with [`npm`](https://www.npmjs.com):

```bash
cd /my/awesome/project
npm install --save-dev qawolf
```

QA Wolf is tested against the [maintenance LTS](https://github.com/nodejs/Release#release-schedule) versions of Node, v10 and v12.

<br/>

## ✅ Create a browser test

[Documentation](http://docs.qawolf.com/docs/create_a_test)

Create a [Playwright](https://github.com/microsoft/playwright) and [Jest](https://jestjs.io/) test:

```bash
npx qawolf create url [name]
```

Edit your test code as it is created by opening `.qawolf/tests/myTestName.test.js`.

Run your test:

```bash
npx qawolf test [name]
```

<br/>

## ☁️ Set up CI

[Documentation](https://docs.qawolf.com/docs/run_tests_in_ci)

Set up CI to run and record your tests in parallel. Use the [video recording and detailed logs](https://docs.qawolf.com/docs/run_tests_in_ci#debug) to debug failures.

[<img align="center" height="20px" src="https://cdn.iconscout.com/icon/free/png-256/azure-190760.png" /> Azure](https://azure.microsoft.com/en-us/services/devops)

```bash
npx qawolf azure
```

[<img align="center" height="20px" src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Bitbucket-blue-logomark-only.svg" /> Bitbucket](https://bitbucket.org/product/features/pipelines)

```bash
npx qawolf bitbucket
```

[<img align="center" height="20px" src="https://cdn.iconscout.com/icon/free/png-256/circleci-283066.png" /> CircleCI](https://circleci.com/)

```bash
npx qawolf circleci
```

[<img align="center" height="20px" src="https://camo.githubusercontent.com/7710b43d0476b6f6d4b4b2865e35c108f69991f3/68747470733a2f2f7777772e69636f6e66696e6465722e636f6d2f646174612f69636f6e732f6f637469636f6e732f313032342f6d61726b2d6769746875622d3235362e706e67" /> GitHub](https://github.com/features/actions)

```bash
npx qawolf github
```

[🦊 GitLab](https://docs.gitlab.com/ee/ci)

```bash
npx qawolf gitlab
```

[🤵 Jenkins](https://jenkins.io)

```bash
npx qawolf jenkins
```

[Chat with us](https://gitter.im/qawolf/community) if you want to run QA Wolf somewhere else.

<br/>

## 🙋 Get Help

<p align="left">
    <a href="https://gitter.im/qawolf/community">👋 Chat</a> |
    <a href="mailto:jon@qawolf.com">📬 E-mail</a>
</p>

We want QA Wolf to work for you, so please reach out to get help!

<br/>

## 📝 License

QA Wolf is licensed under [BSD-3-Clause](https://github.com/qawolf/qawolf/blob/master/LICENSE.md).

<br/>

## 🙏 Acknowledgements

The DOM Recording artifact is using [@Yuyz0112](https://github.com/Yuyz0112)'s awesome [rrweb](https://github.com/rrweb-io/rrweb) library!
