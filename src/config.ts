export const mongoUri = "mongodb://localhost:27017/survey";

export const jwtCofig = {
  secret: "HelloSecretString",
  expires: "7d",
};

export const cookieConfig = {
  name: "survey",
  maxAge: 60 * 60 * 24 * 7 * 1000,
};

export const envConfig = {
  mode: "development",
};
