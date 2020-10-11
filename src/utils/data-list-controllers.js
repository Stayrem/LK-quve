export const addDataListItem = (data) => {
  const newData = data;
  const dataLength = newData.length;

  if (dataLength === 0) {
    newData.push({
      id: 0,
      name: '',
      value: '',
      status: true,
    });
  } else if (newData[dataLength - 1].name && newData[dataLength - 1].value) {
    newData.push({
      id: data[dataLength - 1].id + 1,
      name: '',
      value: '',
      status: true,
    });
  }

  return newData;
};

export const deleteDataListItem = (id, data) => {
  const newData = data;
  newData.splice(newData.findIndex((i) => i.id === id), 1);

  return newData;
}

export const editDataListItem = (editedItem, data) => {
  const newData = data;
  const foundIndex = newData.findIndex((i) => i.id === editedItem.id);
  newData[foundIndex] = editedItem;

  return newData;
};
