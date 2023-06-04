import { mongoIdRegex } from "../../tests/utils";
import { Profile } from "../models/Profile";
import { InputError } from "./errors";
import { ObjectId } from "mongodb";

/**
 * Checks if the given profileId exists if not it will throw an InputError
 * @param profileId profileId to check for
 */
export const checkIfProfileIdExists = async (
  profileId: string
): Promise<void> => {
  if (!profileId.match(mongoIdRegex)) throw new InputError("ProfileId");

  const foundProfile = await Profile.findOne({ _id: new ObjectId(profileId) });

  if (!foundProfile) throw new InputError("ProfileId");
};
