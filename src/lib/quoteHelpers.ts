
// Array of motivational fitness quotes
const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "Your body can stand almost anything. It's your mind that you have to convince.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "If it doesn't challenge you, it doesn't change you.",
  "Exercise is a celebration of what your body can do, not a punishment for what you ate.",
  "Wake up with determination. Go to bed with satisfaction.",
  "The harder you push, the more you are pulled toward your goals.",
  "Don't wish for it, work for it.",
  "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
  "Your health is an investment, not an expense.",
  "Small steps, big changes.",
  "The only way to define your limits is by going beyond them.",
  "Progress, not perfection.",
  "Sweat is just your fat crying.",
  "Push yourself because no one else is going to do it for you.",
  "The difference between try and triumph is a little umph.",
  "You're only one workout away from a good mood.",
  "No pain, no gain. Shut up and train.",
  "Strive for progress, not perfection."
];

/**
 * Returns a random motivational quote
 */
export const getRandomQuote = (): string => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
};
