interface User {
  email: string
  password?: string
}

export function signup(email: string): void {
  const user: User = { email }
  localStorage.setItem("kezo_user", JSON.stringify(user))
  localStorage.setItem("kezo_auth", "true")
}

export function logout(): void {
  localStorage.removeItem("kezo_auth")
  localStorage.removeItem("kezo_wallet_state")
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

export function storePassword(password: string): void {
  const user = getCurrentUser()
  if (user) {
    user.password = password
    localStorage.setItem("kezo_user", JSON.stringify(user))
  }
}