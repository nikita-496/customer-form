//Phone
export const checkFirstChar = (phone) => phone[0] === "7";

export const allowSpecialChar = (phone) => {
  let regexp = /\d[()-]/g;
  let result = phone.match(regexp);
  if (phone.length === 0 || result === null) {
    result = false;
  }
  return result;
};

export const determineLeng = (phone) => phone.length === 15;

//Pesron
export const processAlpha = (personalValue) => {
  if (personalValue.length === 0) {
    return true;
  }
  const regex = /[a-zA-zZa-яА-Я]/g;
  const found = personalValue.match(regex);
  if (found === null) {
    return false;
  }
  return found.join("") === personalValue ? true : false;
};

export const processAlphaRegion = (adress) => {
  if (adress.length === 0) {
    return true;
  }
  const regex = /[a-zA-zZa-яА-Я]|\s|[.]/g;
  const found = adress.match(regex);
  if (found === null) {
    return false;
  }
  return found.join("") === adress ? true : false;
};
