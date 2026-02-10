function baseHtml(content){
    return `
    <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8" />
            <title>Tienda de Ropa</title>
            <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
            ${content}
        </body>
    </html>
`;
}

module.exports = baseHtml;