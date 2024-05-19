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

Here is the feature that was added : 

```
1 - Feature : Accept Coins

As a vendor
I want a vending machine that accepts coins
So that I can collect money from the customer
```

Here I started with the Coin domain.
Then I started to define [VendingMachineService](./src/domain/services/VendingMachineService.ts) using TDD.
I had to create CoinValue and CoinType so that I could create better interface.
I also used jest as a framework for unit test for speed dev purpose.
I put tests inside a dedicated folder for separation of concern purpose.
