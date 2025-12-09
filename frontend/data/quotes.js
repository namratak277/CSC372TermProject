// Local motivational quotes - no external API needed
export const quotes = [
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    content: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    content: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    content: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  {
    content: "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.",
    author: "Roy T. Bennett"
  },
  {
    content: "I learned that courage was not the absence of fear, but the triumph over it.",
    author: "Nelson Mandela"
  },
  {
    content: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    content: "Your limitation—it's only your imagination.",
    author: "Unknown"
  },
  {
    content: "Great things never come from comfort zones.",
    author: "Unknown"
  },
  {
    content: "Dream it. Wish it. Do it.",
    author: "Unknown"
  },
  {
    content: "Success doesn't just find you. You have to go out and get it.",
    author: "Unknown"
  },
  {
    content: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown"
  },
  {
    content: "Dream bigger. Do bigger.",
    author: "Unknown"
  },
  {
    content: "Don't stop when you're tired. Stop when you're done.",
    author: "Unknown"
  },
  {
    content: "Wake up with determination. Go to bed with satisfaction.",
    author: "Unknown"
  },
  {
    content: "Do something today that your future self will thank you for.",
    author: "Unknown"
  },
  {
    content: "Little things make big days.",
    author: "Unknown"
  },
  {
    content: "It's going to be hard, but hard does not mean impossible.",
    author: "Unknown"
  },
  {
    content: "Don't wait for opportunity. Create it.",
    author: "Unknown"
  },
  {
    content: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
    author: "Unknown"
  },
  {
    content: "The key to success is to focus on goals, not obstacles.",
    author: "Unknown"
  },
  {
    content: "Dream it. Believe it. Build it.",
    author: "Unknown"
  },
  {
    content: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis"
  },
  {
    content: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe"
  },
  {
    content: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    content: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    content: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson"
  },
  {
    content: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson"
  }
];

export function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function getQuoteByIndex(index) {
  return quotes[index % quotes.length];
}

export function getTotalQuotes() {
  return quotes.length;
}
