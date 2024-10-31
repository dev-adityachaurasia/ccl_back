const isEmail = (input) => {
  // Regular expression to check if the input is in email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(input);
};

export default isEmail;