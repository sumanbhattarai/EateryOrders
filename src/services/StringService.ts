const makeFirstCharCapital = (c: string): string =>
  c.charAt(0).toUpperCase() + c.slice(1);

/* This func takes the string and return string that has first letter capital along with no
whitespaces at start & end as well as no extra whitespaes between the word. */
const properStringValue = (c: string): string =>
  makeFirstCharCapital(c.trim().replace(/ +/g, ' '));

export {makeFirstCharCapital, properStringValue};
