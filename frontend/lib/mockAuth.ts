interface User {
  email: string
  password: string
}

export function signup(email: string, password: string): void {
  const user: User = { email, password }
  localStorage.setItem("kezo_user", JSON.stringify(user))
  localStorage.setItem("kezo_auth", "true")
}

export function login(email: string, password: string): boolean {
  const stored = localStorage.getItem("kezo_user")
  if (!stored) return false

  const user: User = JSON.parse(stored)
  if (user.email === email && user.password === password) {
    localStorage.setItem("kezo_auth", "true")
    return true
  }
  return false
}

export function logout(): void {
  localStorage.removeItem("kezo_auth")
  localStorage.removeItem("kezo_wallet_state")
}

export function checkAuth(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("kezo_auth") === "true"
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("kezo_user")
  return stored ? JSON.parse(stored) : null
}

export function getStoredPassword(): string {
  const user = getCurrentUser()
  return user?.password || ""
}
