class APIUtils {
    // this is just a precondition data setup
    constructor(apiContext, loginpayload)  // parameters
    {
        this.apiContext = apiContext;
        this.loginpayload = loginpayload;
    }

    async gettoken()   // method name
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginpayload
            })
        //expect(loginResponse.ok()).toBeTruthy();

        const loginResponseJson = await loginResponse.json();  // return the JSON representation of response body
        const token = loginResponseJson.token;
        console.log(token);
        return token;

    }

    async CreateOrder(orderPayload) {
        let response = {};  // dummy object or Javascript object
        response.token = this.gettoken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization': ''+response.token,   //  this refers to current class.in this current class call the method of gettoken
                    'Content-Type': 'application/json'
                },
            })
        const orderResponsejson = await orderResponse.json();
        console.log(orderResponsejson);
        // (orderResponsejson.orders)? if this is true then it will fetch the 0th array
        const orderId = (orderResponsejson.orders)? orderResponsejson.orders[0]: 0;
        response.orderId = orderId;   // first it dummy object then we added the property just mousehover response
        return response;  //it holds orderid & token

    };


}

module.exports = { APIUtils };