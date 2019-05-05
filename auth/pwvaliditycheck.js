module.exports = password => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;
  return regex.test(password);
};
