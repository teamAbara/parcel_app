import AsyncStorage from "@react-native-async-storage/async-storage";
// get
export const getStorage = async (key: any) => {
  const result = await AsyncStorage.getItem(key);

  return result;
};

// set
export const setStorage = async (key: any, value: any) => {
  return await AsyncStorage.setItem(key, JSON.stringify(value));
};

// remove
export const removeStorage = async (key: any) => {
  return await AsyncStorage.removeItem(key);
};
