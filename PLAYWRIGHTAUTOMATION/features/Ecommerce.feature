Feature: Ecommerce validations
@Regression
  Scenario Outline: Placing the Order
  Given a login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
    When Add "Zara coat 3" to Cart
    Then Verify "Zara coat 3" is displayed in the Cart
    When Enter valid details and place the Order
    Then Verify order in present in the OrderHistory

   
  @Validation
  Scenario Outline: Placing the Order
  Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    |   username       |    |   password   |
    |anshika@gmail.com |    |Iamking@000   |
    |hello@123.com     |    |Iamhello@12   |

    
     