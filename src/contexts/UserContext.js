// // src/contexts/UserContext.js
// import React, { createContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const raw = await AsyncStorage.getItem("currentUser");
//         if (raw) setUser(JSON.parse(raw));
//       } catch (e) {
//         console.log("Erro ao carregar usuário:", e);
//       }
//     };
//     load();
//   }, []);

//   const login = async (userObj) => {
//     setUser(userObj);
//     await AsyncStorage.setItem("currentUser", JSON.stringify(userObj));
//   };

//   const logout = async () => {
//     setUser(null);
//     await AsyncStorage.removeItem("currentUser");
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// src/contexts/UserContext.js
import React, { createContext } from "react";

export const UserContext = createContext({
  user: null,
  logout: () => {},
});

export const UserProvider = ({ user, logout, children }) => {
  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};
