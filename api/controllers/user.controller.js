import User from "../models/user.model.js";
import createError from "../utils/createError.js";


//DELETE PROFILE
export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  console.log(req.userId)
  console.log(user._id.toString())
  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You are not authenticated to delete others' account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("Profile Deleted.");
};


//VIEW PROFILE
export const getUser = async (req, res, next) => {
    
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};



//UPDATE PROFILE
export const updateProfile = async(req, res, next)=>{
    const user = await User.findById(req.params.id);
    if(!user._id.toString()){
      return next(createError(403, "You are not logged in!"));

    }

    if(req.userId !== user._id.toString()){
        return next(createError(403, "You are not authenticated to edit others' account!"));
    }

    
    if(req.body.password){
        //fix the update password issue
        try{
            // const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hashSync(req.body.password, 5);
            req.body.password = hash;
            console.log(hash)
            console.log("Mango")
            console.log(req.body.password)
            console.log("Mango")

            const new_password = bcrypt.hashSync(req.body.password, 5);
            const newUser = new User({
            ...req.body,
            password: hash,
            });
            req.body.password = new_password;   
            
            
        } catch (err) {
            
            console.log(req.body.password)
            return next(createError(403, "Password error!"));
          }
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json("Account has been successfully updated");
        } catch (err) {
         return next(createError(500, "Account NOT Updated"));
        }
}

