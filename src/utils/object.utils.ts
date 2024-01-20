type ObjectId = {
  _id: string;
};

function updateObjectById<T extends ObjectId, G>(
  array: T[],
  id: string,
  data: G
): T[] {
  let newArray = [...array];
  const index = newArray.findIndex((obj) => obj._id === id);
  if (index === -1) return newArray;
  newArray[index] = { ...newArray[index], ...data };
  return newArray;
}

export const objectUtilService = {
  updateObjectById,
};
