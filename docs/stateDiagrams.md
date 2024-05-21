# Vending Machine state diagram

Features : 
- [Accept Coins](https://github.com/guyroyse/vending-machine-kata?tab=readme-ov-file#accept-coins)
- [Select Product](https://github.com/guyroyse/vending-machine-kata?tab=readme-ov-file#select-product)

```mermaid
stateDiagram-v2
  [*] --> IDLE
  state isValidCoin <<choice>> 
  state hasEnoughtMoney <<choice>>

  IDLE --> isValidCoin: insert coin
  COIN_INSERTED --> isValidCoin: insert coin

  isValidCoin --> IDLE: if coin is invalid
  isValidCoin --> COIN_INSERTED : if coin valid

  COIN_INSERTED --> hasEnoughtMoney: select product
  hasEnoughtMoney --> PRODUCT_SELECTED: enought money
  hasEnoughtMoney --> COIN_INSERTED: not enought money
```

