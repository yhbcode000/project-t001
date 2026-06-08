import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'Hello Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null
        return { id: 'hello-user', email: String(credentials.email), name: 'Hello User' }
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/' }
})

export { handler as GET, handler as POST }
