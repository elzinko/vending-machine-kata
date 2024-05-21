Feature: Accept coins in vending machine

  Scenario: Rejecting invalid coins
    Given the vending machine is powered on
    When an invalid coin "PENNY" is inserted
    Then the display should show "INSERT COIN"
    Then the current balance should be 0
    Then the coin should be returned

