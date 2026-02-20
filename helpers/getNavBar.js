function getNavBar(req) {
   return `
   <a href="/" class="logo">Chuchuchuli Shop</a>
     <nav class="navbar">
         ${
           req && req.session && req.session.isAdmin?
           `
           ${req.path !== '/dashboard' ? '<a href="/dashboard">Dashboard</a>' : ''}
           <a href="/dashboard/new">Crear producto</a>
           <a href="/logout">Logout</a>
           `:
           '<a href="/login">Login</a>'
          }
     </nav>
   `;
}

module.exports = getNavBar;


