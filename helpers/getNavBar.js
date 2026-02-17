function getNavBar(req) {
   return `
     <nav>
       <a href="/products">Productos</a>
       <a href="/dashboard">Dashboard</a>
       ${
        req && req.session && req.session.isAdmin?
         '<a href="/logout">Logout</a>':
         '<a href="/login">Login</a>'
       }
     </nav>
   `;
}

module.exports = getNavBar;

