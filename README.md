# Vending Machine Kata

Here is my Vending Machine Kata.

You will find here useful information on how the work was done.

## 1 - Initialization

First, let's start with some Typescript project initialization :

For this first commit, I had to update my "not so" old npm version :

```sh
npm install -g npm@10.7.0
```

Then, I added typescript to the dev dependencies, for transpilation :

```sh
npm i typescript --save-dev
```

Then I had to initialize a basic typescript [config file](./tsconfig.json) :

```sh
npx tsc --init
```

Finally, I created a new local git repository and its related [.gitignore](./.gitignore) file so that I can exclude unnecessary files from sources.


Also, I used Google Typescript Style for quick style guide, linter and automatic code correction bootstraping.

```sh
npm i gts --save-dev
npx gts init
```

Finally, I decided to follow **clean architecture** concepts for the project so that all the domain can stay appart from external / technical concerns.

## 2 - accept coins

Feature is defined [here](https://github.com/guyroyse/vending-machine-kata?tab=readme-ov-file#accept-coins)

- I defined the [Coin](./src/domain/models/Coin.ts) domain model.
- I defined [VendingMachineService](./src/domain/services/VendingMachineService.ts) using TDD.
- I had to define [CoinValue](./src/domain/models/Coin.ts) and [CoinType](./src/domain/models/Coin.ts).
- I used [jest](https://jestjs.io/fr/) as a framework for unit test for sake of dev speed.
- I put tests inside a dedicated folder for separation of concern purpose. First I tried inside each layer but I changed my mind.
- I created an interface for insertCoin use case, so that the adapters could be aware of it for implementation.
- I created a simple command cli.

You can start cli using :
```sh
npm run compile && npm run start
```

## 3 - select product

Feature is defined [here](https://github.com/guyroyse/vending-machine-kata?tab=readme-ov-file#make-change)

## 4 - Make change

Feature is defined [here](https://github.com/guyroyse/vending-machine-kata?tab=readme-ov-file#make-change)

## 5 - Return Coins

Feature is defined [here](https://github.com/guyroyse/vending-machine-kata?tab=readme-ov-file#return-coins)

## Improvments

Create list of action 

- [x] improve documentation state diagrams
- [ ] forgot BDD which was the main purpose if the kata 8/
- [ ] create a structured response using DTO
- [ ] create error code for client
- [ ] add rest doc
- [ ] better messages message separation
- [ ] create a vuejs 3 client
