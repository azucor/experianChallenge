import {test, expect} from "@playwright/test"

test('challenge tc', async ({ page }) => {
await page.goto('https://surveyrc.taxcreditco.com/automation-challenge');

const fname = "abraham";
const lname = "challenge";
const fullName = fname + " " + lname;

// First page steps
await page.waitForLoadState("domcontentloaded");
await page.locator("//div[@data-question-id-text='VoterFirstName']/div/input").fill(fname);
await page.locator("//div[@data-question-id-text='VoterLastName']/div/input").fill(lname);
await page.locator("//div[@data-question-id-text='VoterEmail']/div/input").fill("mychallenge@example.com");
await page.locator("//div[@data-question-id-text='VoterAddressLine1']/div/input").fill("Test street 123");
await page.locator("//div[@data-question-id-text='VoterCity']/div/input").fill("Mexico city");
await page.locator("//div[@data-question-id-text='VoterPostalCode']/div/input").fill("25000");

const nextButton = await page.locator("//input[@id='SurveyControl_SurveySubmit']")
await nextButton.click();

//Second Page steps
await page.waitForLoadState("domcontentloaded");
const buttons = await page.$$("//label[text()='No']");
for(const button of buttons){
await button.click();
}
await nextButton.click();

//Third page steps
await page.waitForLoadState("domcontentloaded");
const nameConfirmElement = await page.locator("//div[@data-question-id-text='NameConfirmation']/div/input");
const nameConfirmationText = await  nameConfirmElement?.inputValue();

expect(nameConfirmationText).toEqual(fullName);
await nextButton.click();

//Fourth page steps
await page.waitForLoadState("domcontentloaded");
const url = page.url();
expect(url).toContain('https://www.experian.com/employer-services');
});