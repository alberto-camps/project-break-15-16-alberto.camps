function getNavBar(req) {
   return `
   <a href="/" class="logo">Chuchuchuli Shop</a>
     <nav class="navbar">
         <a href="/products">Productos</a>
         ${
           req && req.session && req.session.isAdmin?
           `
           <a href="/dashboard">Dashboard</a> 
           <a href="/dashboard/new">Crear producto</a>
           <a href="/logout">Logout</a>
           `:
           '<a href="/login">Login</a>'
          }
     </nav>
   `;
}

module.exports = getNavBar;


