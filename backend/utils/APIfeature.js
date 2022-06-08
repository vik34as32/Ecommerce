class APIfeature {
    constructor(query,queryStr){
        this.query = query
        this.queryStr =queryStr
    }

    search(){
         const keyword  =this.queryStr.keyword ?    {
             name:{
                 $regex:this.queryStr.keyword,
                 $options:''
             }
         }:{

         }
         this.query =this.query.find({...keyword})
         return this 
    }
    filter(){
        const queryObj ={...this.queryStr}
        const excludedFields =['page','keyword','limit','price']
        
        excludedFields.forEach(element=>delete queryObj[element])

        this.query =this.query.find(queryObj)
        return this

    }

    Pagination(){
        const  page =this.page*1||1
        const limit = this.queryString*1||10
        const skip =(page-1)*1
        this.query =this.query.skip(skip).limit(limit)
       return this
    }
}


module.exports =APIfeature