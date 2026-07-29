// Config "leve", sem acesso a banco — precisa rodar no Edge runtime do middleware.
// A config completa (com o Credentials provider e acesso ao Prisma) fica em src/auth.js.
const authConfig = {
  providers: [],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname === '/admin/login';
      const isAdminRoute = nextUrl.pathname.startsWith('/admin');

      if (isAdminRoute && !isLoginPage) return isLoggedIn;
      if (isLoggedIn && isLoginPage) {
        return Response.redirect(new URL('/admin/posts', nextUrl));
      }
      return true;
    },
  },
};

export default authConfig;
