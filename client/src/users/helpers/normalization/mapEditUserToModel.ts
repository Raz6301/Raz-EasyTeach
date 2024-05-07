import {
  EditedUserMapToModelType,
  FullUserType,
  UserMapToModelType,
} from "../../models/types/userTypes";

const mapEditedUserToModel = (user: FullUserType): EditedUserMapToModelType => {
  return {
    _id: user._id,
    first: user.name.first,
    middle: user.name.middle!,
    last: user.name.last,
    phone: user.phone,
    email: user.email,
    url: user.image.url!,
    alt: user.image.alt!,
    state: user.address.state!,
    country: user.address.country,
    city: user.address.city,
    street: user.address.street,
    zip: String(user.address.zip),
    houseNumber: String(user.address.houseNumber),
    isAdmin: user.isAdmin,
    isBusiness: user.isBusiness,
    CreatedAt: user.CreatedAt,
  };
};

export default mapEditedUserToModel;
