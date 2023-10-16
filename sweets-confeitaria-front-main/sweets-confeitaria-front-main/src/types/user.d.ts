interface User {
  id: number
  name: string
  email: string
  role: string
}

interface UserContextValues {
  user: User | null
  isLoading: boolean
  login: (data: LoginForm) => Promise<void>
  logout: () => Promise<void>
}
