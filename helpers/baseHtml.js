function baseHtml(content){
    return `
    <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8" />
            <title>Chuchuchuli Shop</title>
             
            <link href="https://fonts.googleapis.com/css2?family=Metal+Mania&family=Fredericka+the+Great&family=Rubik+Mono+One&display=swap" rel="stylesheet">

            <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
            ${content}
        </body>
    </html>
`;
}

module.exports = baseHtml;
