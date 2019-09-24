class SolrTest {
    solr() {
        const SolrNode = require("solr-node");

        var client = new SolrNode({
            host: "127.0.0.1",
            port: "8983",
            core: "collection1",
            protocol: "http"
        });

        let consulta1 = client.query().q({ text: "test", title: "test" });
        let consulta2 = "q=*%3A*&wt=json";
        // console.log('consulta',consulta1.params);
        var result = client
            .search(consulta2)
            .then(function(result) {
                console.log("Response:", result.response);
            })
            .catch(function(err) {
                console.error(err);
            });
        console.log("oibonitono", result);
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="utf-8">
        <title></title>
        </head>
        <body>
            <span>Hello genti bonita</span>
            ${result}
        </body>
        </html>`);
    }
}

export default SolrTest;
