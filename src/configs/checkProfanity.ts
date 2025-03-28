import leoProfanity from "leo-profanity";

leoProfanity.loadDictionary();
const checkProfanity = (value) => {
  if (!value) return null;

  const words = value.split(/\s+/);
  const badWords = words.filter((word) => leoProfanity.check(word));

  if (badWords.length > 0) {
    return `Please remove the inappropriate words: ${badWords.join(", ")}`;
  }

  return null;
};
export default checkProfanity;
