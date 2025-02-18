const { loginUser, usersDB } = require("../src/auth");

describe("Login Functionality", () => {
  beforeEach(() => {
    // Reiniciar el estado del usuario antes de cada prueba
    usersDB[0].failedAttempts = 0;
    usersDB[0].isBlocked = false;
  });

  test("should allow a user to log in with correct credentials", () => {
    expect(loginUser("user@example.com", "Pass123!")).toEqual({
      success: true,
      message: "Login successful",
    });
  });

  test("should not allow login with incorrect password", () => {
    expect(loginUser("user@example.com", "WrongPass!")).toEqual({
      success: false,
      message: "Invalid email or password",
    });
  });

  test("should not allow login with an unregistered email", () => {
    expect(loginUser("unknown@example.com", "Pass123!")).toEqual({
      success: false,
      message: "Invalid email or password",
    });
  });

  test("should block user after 3 failed login attempts", () => {
    loginUser("user@example.com", "WrongPass!");
    loginUser("user@example.com", "WrongPass!");
    const result = loginUser("user@example.com", "WrongPass!"); // Tercer intento fallido

    expect(result).toEqual({
      success: false,
      message: "Account is locked due to multiple failed login attempts.",
    });
  });

  test("should not allow login if the user is blocked", () => {
    loginUser("user@example.com", "WrongPass!");
    loginUser("user@example.com", "WrongPass!");
    loginUser("user@example.com", "WrongPass!"); // Bloquear usuario

    const result = loginUser("user@example.com", "Pass123!"); // Intento después de estar bloqueado

    expect(result).toEqual({
      success: false,
      message: "Account is locked. Try again later.",
    });
  });

  test("should reset failed attempts after a successful login", () => {
    loginUser("user@example.com", "WrongPass!");
    loginUser("user@example.com", "Pass123!"); // Login exitoso

    expect(usersDB[0].failedAttempts).toBe(0);
  });
});

