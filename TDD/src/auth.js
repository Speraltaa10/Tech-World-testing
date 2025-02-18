// Simulación de una base de datos de usuarios con intentos fallidos
const usersDB = [
    { email: "user@example.com", password: "Pass123!", failedAttempts: 0, isBlocked: false },
  ];
  
  function loginUser(email, password) {
    const user = usersDB.find((u) => u.email === email);
  
    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }
  
    if (user.isBlocked) {
      return { success: false, message: "Account is locked. Try again later." };
    }
  
    if (user.password === password) {
      user.failedAttempts = 0; // Reiniciar intentos fallidos
      return { success: true, message: "Login successful" };
    } else {
      user.failedAttempts += 1;
  
      if (user.failedAttempts >= 3) {
        user.isBlocked = true;
        return { success: false, message: "Account is locked due to multiple failed login attempts." };
      }
  
      return { success: false, message: "Invalid email or password" };
    }
  }
  
  module.exports = { loginUser, usersDB };
  