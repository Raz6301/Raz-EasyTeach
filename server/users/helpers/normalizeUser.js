const { generatePassword } = require("./bycript");

const normalizeUser = (rawUser) => {
  const name = {
    ...rawUser.name,
    middle: rawUser.name.middle || "",
  };
  const image = {
    ...rawUser.image,
    url:
      rawUser.image.url ||
      "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
    alt: rawUser.image.alt || "user image",
  };

  const address = {
    ...rawUser.address,
    state: rawUser.address.state || "",
    zip: rawUser.address.zip || 0,
  };
  return {
    ...rawUser,
    image,
    name,
    address,
    password: generatePassword(rawUser.password),
  };
};

module.exports = normalizeUser;
