import Counter from "../models/Counter.js";

/**
 * Atomic increment counter
 * đảm bảo không trùng kể cả nhiều request cùng lúc
 */
export const getNextSequence = async (key) => {
  const counter = await Counter.findOneAndUpdate(
    { key },
    { $inc: { value: 1 } },
    {
      new: true,
      upsert: true,
    }
  );

  return counter.value;
};