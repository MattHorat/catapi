const breedDataAccess = require('../models/breedDataAccess');

function getBreedWeighting(breed) {
  return breed.child_friendly + breed.stranger_friendly + breed.dog_friendly;
}

async function orderBreeds(breeds) {
  breeds.sort((firstBreed, secondBreed) => {
    const firstBreedWeigthing = getBreedWeighting(firstBreed);
    const secondBreedWeigthing = getBreedWeighting(secondBreed);
    if (firstBreedWeigthing === secondBreedWeigthing) {
      return 0;
    }
    return firstBreedWeigthing > secondBreedWeigthing ? -1 : 1;
  });
}

async function getTopBreeds(req, res) {
  const breeds = await breedDataAccess.getBreeds();
  orderBreeds(breeds);
  res.send(breeds.slice(0, 5));
}

module.exports = {
  getTopBreeds,
  orderBreeds,
};
