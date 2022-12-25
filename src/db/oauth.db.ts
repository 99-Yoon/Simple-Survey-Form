import { Oauth, IOauth } from "../models";

export const createSocialKey = async (socialKeys: IOauth) => {
  const newOauth = new Oauth({
    socialType: socialKeys.socialType,
    REST_API_KEY: socialKeys.REST_API_KEY,
    REDIRECT_URI: socialKeys.REDIRECT_URI,
    CLIENT_SECRET_KEY: socialKeys.CLIENT_SECRET_KEY,
  });
  const oauth = await newOauth.save();
  return oauth;
};

export const getSocialKey = async (socialType: string) => {
  const socialKeys = await Oauth.findOne({ socialType: socialType });
  return socialKeys;
};
