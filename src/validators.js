//Phone
export const checkFirstSymbol = (phone) => phone[0] === "7";
export const validLength = (phone) => phone.length === 15;

export const processAlpha = (value) => processSrting(value, /[a-zA-zZa-яА-Я]/g);
export const processAlphaRegion = (value) => processSrting(value, /[a-zA-zZa-яА-Я]|\s|[.-]/g);

const processSrting = (value, regex) => {
  if (value.length === 0) {
    return true;
  }

  const found = value.match(regex);
  if (found === null) {
    return false;
  }
  return found.join("") === value ? true : false;
};
