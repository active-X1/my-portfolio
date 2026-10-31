/**
 * Extra things the assistant may say about Cyrus, on top of what it already reads from the
 * site's own data (projects, technologies, about text, journey, contact details).
 *
 * Add facts in plain sentences. Only add things that are true and that you are happy for
 * anyone to read. The assistant is told to say it does not know anything not written here or
 * on the site, and to give your email and phone number instead.
 */
/**
 * Used only on the server to work out Cyrus's current age. The assistant is told to share his
 * age, not the exact date. Remove this line (and the age rule in src/lib/assistant.ts) to stop sharing it.
 */
export const birthDate = "2009-05-15";

export const personalFacts: string[] = [
  // "Cyrus is based in ...",
  // "Cyrus is currently studying ...",
];

/** Exact answers to questions you expect. The assistant treats these as the source of truth. */
export const faq: { question: string; answer: string }[] = [
  // { question: "Is Cyrus available for freelance work?", answer: "..." },
];
