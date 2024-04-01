import  mongoose from 'mongoose' 

const userSchema = new mongoose.Schema({
 firstName: { type: String, required: true },
 lastName: { type: String, required: true},
 email: { type: String, required: true, unique: true },
 password: { type: String, required: true, selected: false}
});

userSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName} `
}

export const User = mongoose.model('User', userSchema);

