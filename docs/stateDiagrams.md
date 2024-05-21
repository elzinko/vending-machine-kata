# Vending Machine state diagram

Features : 
- [Accept Coins](https://github.com/guyroyse/vending-machine-kata?tab=readme-ov-file#accept-coins)
- [Select Product](https://github.com/guyroyse/vending-machine-kata?tab=readme-ov-file#select-product)
- [Make Change](https://github.com/guyroyse/vending-machine-kata?tab=readme-ov-file#make-change)

```mermaid
stateDiagram-v2
  [*] --> IDLE
  state isValidCoin <<choice>>
  state hasEnoughMoney <<choice>>
  state changeRequired <<choice>>

  IDLE --> isValidCoin: insert coin
  note left of IDLE: Display "INSERT COIN"

  isValidCoin --> IDLE: coin invalid
  isValidCoin --> COIN_INSERTED: coin valid

  COIN_INSERTED --> isValidCoin: insert coin
  COIN_INSERTED --> IDLE: insert invalid coin
  note right of COIN_INSERTED: Display $BALANCE

  COIN_INSERTED --> hasEnoughMoney: select product

  hasEnoughMoney --> DISPENSE_PRODUCT: enough money
  note right of DISPENSE_PRODUCT: Display "THANK YOU"

  hasEnoughMoney --> COIN_INSERTED: not enough money
  note right of hasEnoughMoney
    not enought money -> Display $PRICE
  end note

  DISPENSE_PRODUCT --> changeRequired: make change
  changeRequired --> MAKE_CHANGE: change required
  changeRequired --> IDLE: no change required

  MAKE_CHANGE --> IDLE
  note right of MAKE_CHANGE: Display $CHANGE

```

