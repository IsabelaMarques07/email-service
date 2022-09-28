const mongoose = require('mongoose');
const Category = mongoose.model('Category');

exports.getCategory = async ()=>{
    const result = await Category.find({}, 'name description _id active');
    return result;
}

exports.create = async (data) =>{
    let category = Category(data);
    await category.save();
}

exports.put = async(id, data)=>{
    await Category.findByIdAndUpdate(id, {
        $set:{
            name: data.name,
            description: data.description,
            active: data.active
        }
    })
}

exports.getById = async (id) =>{
    const result = await Category.findOne({_id:id}, "_id name description active")
    return result
}

exports.delete = async (id) => {
    await Category.findByIdAndUpdate(id, {
        $set:{
            active: false
        }
    });
}