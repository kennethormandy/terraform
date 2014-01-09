var cson = require("cson")
var TerraformError = require("../../error").TerraformError

exports.compile = function(filePath, dirs, fileContents, callback){
  cson.parseFile(filePath, function(err, json){
    if(err) {
      // we are reverse enginerring the cson error object
      // which can probably be found...somewhere...

      err.lineno    = "?"
      err.message   = "??"
      err.source    = "CSON"
      err.dest      = "JSON"
      err.name      = "CSON Error"
      err.filename  = filePath
      err.stack     = fileContents.toString()
      var error     = new TerraformError(err)
    }

    callback(error, json)
  })
}