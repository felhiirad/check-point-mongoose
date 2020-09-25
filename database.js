//Create and Save a Record of a Model: 


require('dotenv').config();
const mongoose = require('mongoose');

const PersonModel = require('./model/person');
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true
}).then(() => {
  console.log('Connected')
}).catch(() => {
  console.error('Error!')
})

const newPerson = new PersonModel({
  name: "IRAD FELHI",
  age: 28,
  favoriteFoods: ['koskous','pizza','crepe']
});

newPerson.save()
  .then(doc => {
      console.log('Added Successfully', doc);
  })
  .catch(err => {
      console.error(err);
  });
  //Create Many Records with model.create()


  const listeOfPerson=[
    {name:'AAMARI HIND',age:26,favoriteFoods:['pizza','pizza','pizza']},
    {name:'SAIF dhahri',age:29,favoriteFoods:['a5ther wyebes','7ata la7chich']},
    {name:'WISSEM RABAOUI',age:29,favoriteFoods:['mayetcharetch','kol chy']},
    {name:'ACHREF FOURATI',age:28,favoriteFoods:['man3rech','kol chy normalment']}

  ];
  PersonModel.create(listeOfPerson)
  .then(doc => {
      console.log('Added Successfully', doc);
  })
  .catch(err => {
      console.error(err);
  });

//Use model.find() to Search Your Database

PersonModel.find({ name: 'AAMARI HIND' })
    .then(per => {
        console.log('Person found', per);
    })
    .catch(err => {
        console.error(err);
    });


  //Use model.findOne() to Return a Single Matching Document from Your Database


  PersonModel.findOne({ favoriteFoods: { $in: ['pizza'] } })
    .then(food => {
        console.log('Food Found In', food)
    })
    .catch(err => {
        console.error(err);
    });

    //Use model.findById() to Search Your Database By _id


    PersonModel.findById("5f6de64b27b20e3218d64f51")
    .then(doc => {
        console.log('ID found in', doc);
    })
    .catch(err => {
        console.error(err);
    });
    //Perform Classic Updates by Running Find, Edit, then Save
    PersonModel.findById("5f6de64b27b20e3218d64f51")
    .then(person => {
        person.favoriteFoods.push("panini");
        person.save()
            .then(doc => {
                console.log("panini added successfully", doc);
            })
            .catch(err => {
                console.error(err);
            });
    })
    .catch(err => {
        console.error(err);
    });


    //Perform New Updates on a Document Using model.findOneAndUpdate()

    PersonModel.findOneAndUpdate({ name: 'AAMARI HIND' }, { age: 20 }, { new: true })
    .then(doc => {
        console.log('Age changed succ', doc);
    })
    .catch(err => {
        console.error(err);
    });

    //Delete One Document Using model.findByIdAndRemove

    PersonModel.findByIdAndRemove("5f6de2266c31d1053cff2eb8")
    .then(doc => {
        console.log("Person found and removed", doc)
    })
    .catch(err => {
        console.error(err);
    })
    
    //MongoDB and Mongoose - Delete Many Documents with model.remove()

    PersonModel.remove({ name: "SAIF dhahri" })
    .then(docs => {
        console.log("Persons with name SAIF deleted", docs.deletedCount);
    })
    .catch(err => {
        console.error(err);
    });
    
    //Chain Search Query Helpers to Narrow Search Results

    PersonModel.find({ favoriteFoods: { $in: ['pizza'] } })
    .sort({ name: 'asc' })
    .limit(2)
    .select("-age")
    .exec()
    .then(docs => {
        console.log("People who like pizza", docs);
    })
    .catch(err => {
        console.error(err);
    })