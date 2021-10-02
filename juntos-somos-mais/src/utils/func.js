export const capitalize = (string) =>
  string
    .split(' ')
    .map((word) =>
      word.length > 2 ? `${word[0].toUpperCase()}${word.substring(1)}` : word,
    )
    .join(' ');
