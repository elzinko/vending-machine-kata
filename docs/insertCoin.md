# Use Case: Insert Coin

```mermaid
sequenceDiagram
    participant Customer
    participant VendingMachine
    participant InsertCoinInterface
    participant InsertCoin
    participant VendingMachineService
    participant CurrencyConversionService
    participant DisplayStateMachine

    Customer->>VendingMachine: insertCoin(coin)
    VendingMachine->>InsertCoinInterface: insertCoin(coin)
    InsertCoinInterface->>InsertCoin: execute(coin)
    InsertCoin->>VendingMachineService: insertCoin(coin)
    VendingMachineService->>CurrencyConversionService: convertWeightToValue(coin.weight)
    CurrencyConversionService-->>VendingMachineService: coinValue
    VendingMachineService->>DisplayStateMachine: updateDisplay()
    DisplayStateMachine-->>VendingMachine: newDisplay
````

