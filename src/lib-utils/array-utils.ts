export function removeItem<T>([...arr]: T[], item: T) {
    const index = arr.indexOf(item);
    index > -1 && arr.splice(index, 1); // remove the item if index exists
    return arr;
  }
 
// return the item in front. If the item is the last item, return the second to last item.
export function closestItem<T>(arr: T[], item: T) {
    const index = arr.indexOf(item);
    if (index === -1) {
      return arr[0];
    } else if (index === arr.length - 1) {
      return arr[arr.length - 2];
    } else {
      return arr[index + 1];
    }
  }
  