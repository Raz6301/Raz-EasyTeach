function generateUniqueEmail() {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const domainSuffixes = ["com", "net", "org", "edu", "gov"];

  const randomString = (length) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const randomDomainSuffix = () =>
    domainSuffixes[Math.floor(Math.random() * domainSuffixes.length)];

  const uniqueEmail = `${randomString(10)}@${randomString(
    5
  )}.${randomDomainSuffix()}`;
  return uniqueEmail;
}

exports.generateUniqueEmail = generateUniqueEmail;
