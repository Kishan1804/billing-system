exports.isAdmin = async (req, res, next) => {


    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied"
        })
    }
    next()
    
}

exports.isStaff = async (req, res, next) => {


    if (req.user.role !== "admin" && req.user.role !== "staff") {
        return res.status(403).json({
            message: "Access denied"
        })
    }
    next()
    
}