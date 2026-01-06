
export function authorize(...allowedRoles) {
    return (req,res,next)=>{
        if(!req.user){
            const error = new Error('Unauthorized: No user found')
            error.statusCode = 401;
            error.isOperational = true;
            throw error;
        }
        
        if (!allowedRoles.includes(req.user.role)) {
            const error =  new Error("Forbidden: You don't have permission to perform this action.")
            error.statusCode = 403;
            error.isOperational = true;
            throw error;
        }
        next();
    }
}