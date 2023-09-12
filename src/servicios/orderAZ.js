export const orderAZ = (array, getter, order = "asc") => {
  array.sort((a, b) => {
    const first = getter(a);
    const second = getter(b);

    const compare = first.localeCompare(second);
    return order === "asc" ? compare : -compare;
  });
  return array;
};
