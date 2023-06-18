export const getData = async () => {
  return await fetch(
    'https://shoppingsite-457c2-default-rtdb.europe-west1.firebasedatabase.app/.json'
  );
};
export const patchData = async (data, id) => {
  const index = id - 1;

  await fetch(
    `https://shoppingsite-457c2-default-rtdb.europe-west1.firebasedatabase.app/${index}.json`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  );
};

export default {
  getData,
  patchData,
};
