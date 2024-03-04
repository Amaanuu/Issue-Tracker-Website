import issue from "../models/issue.model.js";
import createError from "../utils/createError.js";

//create issue
export const createIssue = async (req, res, next) => {
  const newissue = new issue({
    userId: req.userId,
    ...req.body,
  });
    
    try {
      const savedissue = await newissue.save();
      res.status(201).json(savedissue);
    } catch (err) {
      next(err);
    }
}
;
//update issue
export const updateIssue = async(req, res, next)=>{
  // const biz = await issue.findById(req.params.id);
  const issue = await issue.findById(req.params.id);
  
  if (issue.userId !== req.userId){
    return next(createError(403, "You can't update another person's issue"));
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
        const issue = await issue.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json("issue has been updated");
        } catch (err) {
        //  return res.status(500).json(err);
         return next(createError(500, "issue NOT UPDATED"));
        }
      }



//delete issue
export const deleteIssue = async (req, res, next) => {
  try {
    const issue = await issue.findById(req.params.id);
    if (issue.userId !== req.userId)
      return next(createError(403, "You can delete only your issue!"));

    await issue.findByIdAndDelete(req.params.id);
    res.status(200).send("issue has been deleted!");
  } catch (err) {
    next(err);
  }
};

//view issue
// export const getIssues = async (req, res, next) => {
//   try {
//     const issue = await issue.findById(req.params.id);
//     if (!issue) next(createError(404, "issue not found!"));
//     res.status(200).send(issue);
//   } catch (err) {
//     next(err);
//   }
// };



// router.get("/", async (req, res) => {
export const getIssues = async (req, res, next) => {
  try {
    const issue = await issue.find();
    res.status(200).json(issue);
    console.log(res)
  } catch (err) {
    res.status(500).json(err);
  }
};

