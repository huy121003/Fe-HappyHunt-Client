import nlp from "compromise";

const phoneRegex =
  /((\+84|0)[1-9][0-9]{8})|(((\+84|0)[1-9][0-9]{1,2})[ -]?[0-9]{3}[ -]?[0-9]{3})/g;

export const checkText = (text: string) => {
  const doc = nlp(text);
  const phoneNumbers = doc.phoneNumbers().out("array");
  const phoneNumbersRegex = text.match(phoneRegex) || [];
  const emails = doc.emails().out("array");
  const urls = doc.urls().out("array");
  const message: string[] = [];
  if (phoneNumbers.length > 0 || phoneNumbersRegex.length > 0) {
    message.push("Please remove the phone numbers");
  }
  if (emails.length > 0) {
    message.push("Please remove the emails");
  }
  if (urls.length > 0) {
    message.push("Please remove the urls");
  }
  return message.join("\n");
};
