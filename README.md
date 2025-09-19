# LumaUI E2E (Cypress + TypeScript)

End-to-end tests for **DemoQA** (https://demoqa.com) using **Cypress**, **TypeScript**, and **faker**.  
Covers navigation via menus only, **Dynamic Properties**, **Web Tables**, **Upload/Download**, and **Forms (Practice Form)**.

---

## Prerequisites
- **Node.js** 18+ (LTS recommended)  
- **npm** 8+ (comes with Node)  
- **Git** (to clone/pull/push)  
- A tiny image at `cypress/fixtures/sampleImage.jpg` (used by the Practice Form upload test)

---

## Install
```bash

git clone https://github.com/brunfeijo/lumaUI.git
cd lumaUI
npm install

## All Specs
npx cypress run

## All specs with Mochawesome Report
npm run test:with-report

## Interactive runner (GUI)
npx cypress open
