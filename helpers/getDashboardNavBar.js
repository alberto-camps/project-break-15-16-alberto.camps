function getDashboardNavBar() {
    return `
    <nav class="dashboard-nav">
        <a href="/products">Productos</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/dashboard/new">Crear Producto</a>
    </nav>
    `;
}

module.exports = getDashboardNavBar;