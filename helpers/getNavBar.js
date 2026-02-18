function getNavBar(req) {
   return `
   <div class="logo">Mi Tienda</div>
     <nav class="navbar">
         <a href="/products">Productos</a>
         ${
           req && req.session && req.session.isAdmin?
           `
           <a href="/dashboard">Dashboard</a> 
           <a href="/products/new">Crear producto</a>
           <a href="/logout">Logout</a>
           `:
           '<a href="/login">Login</a>'
          }
     </nav>
   `;
}

module.exports = getNavBar;


