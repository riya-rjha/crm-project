1. Set up google auth
2. Make routes to send customers & orders dummy data
3. Make a campaign history UI component showing (for user that logins)
    ○ List of past campaigns 
    ○ Delivery stats (sent, failed, audience size) 
    ○ Most recent campaign at the top 
4. Make filter page where all customers are shown as audience segments, use input and search bar
5. Add audience segments with conditions and in audience selection or segment selection page, all these segments will be shown in a drop down and then on selecting from there, the user will be able to send personalized message


Remaining:
1. Google auth
2. Implement vendor API to calculate success & failure percentage for customerIDs.length and send to campaign, vendor API will be another route and controller which will be a third party app to calculate success & failure random values (DONE)

Implement a delivery receipt api, with route /receipt, in that u will have customerID, customer name, campaign id that was passed to it, message that it had and then use AI gemini API to tweak the message according to the name of customer & expenditure, activeDays and visits. That will also have delivery status for that customer. So for every customer, calculate status sent or failed using Mathematical logic.

Then on stats page, use the receipt API to see chart of all customers and success and fail for all. (DONE)

3. Statistics Page using Chart.js to show passed and failed
4. Send personalized message -> AI Integration of message or send message, and when message is sent to campaign route, implement a personalized message generation for every customer in customers routes based on the overall message, and that customer will have that personalized message
5. Create a page of Personalized Campaigns and on that show customer and customer details along with the personalized message sent to that customer if for that customer, a message exists meaning that customer has been included in some campaign or the other
(DONE)