function getNavBar(req) {
   return `
     <nav>
       <a href="/products">Productos</a>
       ${
        req && req.session && req.session.isAdmin?
         '<a href="/logout">Logout</a>':
         '<a href="/login">Login</a>'
       }
     </nav>
   `;
}

module.exports = getNavBar;


