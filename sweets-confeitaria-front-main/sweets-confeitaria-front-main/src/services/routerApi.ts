const API = process.env.NEXT_PUBLIC_API_URL

export async function login(data: LoginForm) {
  await fetch(`${API}/login`, { method: 'POST', body: JSON.stringify(data) })
}

export async function logout() {
  await fetch(`${API}/logout`, { method: 'POST' })
}
