/** Shuffle presentation only; every choice retains its server-scored option index. */
export function shuffleQuestionOptions<T extends { options: readonly unknown[] }>(
  questions: readonly T[],
  random: () => number = Math.random,
): Array<T & { optionOrder: number[] }> {
  return questions.map((question) => {
    const optionOrder = question.options.map((_, index) => index);
    for (let index = optionOrder.length - 1; index > 0; index--) {
      const swap = Math.floor(random() * (index + 1));
      [optionOrder[index], optionOrder[swap]] = [optionOrder[swap], optionOrder[index]];
    }
    return { ...question, optionOrder };
  });
}
