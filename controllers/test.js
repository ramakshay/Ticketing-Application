exports.testRo = function (req,res,next){
    res.json({
        test : {
            title : 'classified information',
            data : 'This is visible only to authenticated users'
        }
    });
}