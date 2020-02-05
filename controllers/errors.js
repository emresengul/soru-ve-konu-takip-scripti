exports.get404Page = (req,res)=>{
    res.status(404);
    res.render("error/404",{title: "Page Not Found"})
};
exports.get500Page = (req,res)=>{
    res.status(500);
    res.render("error/500",{title: "Server Error"})
};
    /*
    Page 404 çalışma mantığı;
    Eğer üstteki şeylerden biri çalışırsa bu çalışmaz.
    Eğer üstteki şeylerden biri çalışmazsa bu çalışır
    */