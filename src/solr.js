class Solr{
solr(){
    var SolrNode = require('solr-node');
    
    // Create client
    var client = new SolrNode({
        host: '127.0.0.1',
        port: '8983',
        core: 'collection1',
        protocol: 'http'
    });

    }
}
export default Solr;