const assert = require('assert');
const sinon = require('sinon');
const { expect } = require('chai');
const breedService = require('../../src/services/breedService');
const breedDataAccess = require('../../src/models/breedDataAccess');
const { stub } = require('sinon');

describe('breedService', function () {
  describe('orderBreeds', function () {
    it('should return a list ordered by the combined total', function () {
      const unorderedBreedList = [
        {
          name: 'cat 1',
          child_friendly: 4,
          dog_friendly: 3,
          stranger_friendly: 2,
          expected_total: 9
        },
        {
          name: 'cat 2',
          child_friendly: 2,
          dog_friendly: 3,
          stranger_friendly: 2,
          expected_total: 7
        },
        {
          name: 'cat 3',
          child_friendly: 5,
          dog_friendly: 3,
          stranger_friendly: 4,
          expected_total: 12
        },
        {
          name: 'cat 4',
          child_friendly: 3,
          dog_friendly: 3,
          stranger_friendly: 2,
          expected_total: 8
        }
      ];

      breedService.orderBreeds(unorderedBreedList);

      // Let's check we've got all our kittens in a row!
      assert.equal(unorderedBreedList[0].name, 'cat 3');
      assert.equal(unorderedBreedList[1].name, 'cat 1');
      assert.equal(unorderedBreedList[2].name, 'cat 4');
      assert.equal(unorderedBreedList[3].name, 'cat 2');
    });

    it('should not change order of tied results', function () {
      const unorderedBreedList = [
        {
          name: 'cat 1',
          child_friendly: 2,
          dog_friendly: 3,
          stranger_friendly: 2,
          expected_total: 7
        },
        {
          name: 'cat 2',
          child_friendly: 2,
          dog_friendly: 3,
          stranger_friendly: 2,
          expected_total: 7
        }
      ];

      breedService.orderBreeds(unorderedBreedList);

      // Let's leave the results in the order we got them, if they are the same
      assert.equal(unorderedBreedList[0].name, 'cat 1');
      assert.equal(unorderedBreedList[1].name, 'cat 2');
    });
  });

  describe('getTopBreeds', function () {
    it('should return a truncated list of top five results', async function () {
      const unorderedBreedList = [
        {
          name: 'cat 1',
          child_friendly: 4,
          dog_friendly: 3,
          stranger_friendly: 2,
          expected_total: 9
        },
        {
          name: 'cat 2',
          child_friendly: 2,
          dog_friendly: 3,
          stranger_friendly: 2,
          expected_total: 7
        },
        {
          name: 'cat 3',
          child_friendly: 5,
          dog_friendly: 3,
          stranger_friendly: 4,
          expected_total: 12
        },
        {
          name: 'cat 4',
          child_friendly: 3,
          dog_friendly: 3,
          stranger_friendly: 2,
          expected_total: 8
        },
        {
          name: 'cat 5',
          child_friendly: 1,
          dog_friendly: 1,
          stranger_friendly: 1,
          expected_total: 3
        },
        {
          name: 'cat 6',
          child_friendly: 5,
          dog_friendly: 3,
          stranger_friendly: 2,
          expected_total: 10
        }
      ];

      const orderedBreedList = [
        {
          name: 'cat 3',
          child_friendly: 5,
          dog_friendly: 3,
          stranger_friendly: 4,
          expected_total: 12
        },
        {
          name: 'cat 6',
          child_friendly: 5,
          dog_friendly: 3,
          stranger_friendly: 2,
          expected_total: 10
        },
        {
          name: 'cat 1',
          child_friendly: 4,
          dog_friendly: 3,
          stranger_friendly: 2,
          expected_total: 9
        },
        {
          name: 'cat 4',
          child_friendly: 3,
          dog_friendly: 3,
          stranger_friendly: 2,
          expected_total: 8
        },
        {
          name: 'cat 2',
          child_friendly: 2,
          dog_friendly: 3,
          stranger_friendly: 2,
          expected_total: 7
        }
      ];

      stub(breedDataAccess, "getBreeds").returns(unorderedBreedList);
      const res = {
        send: sinon.spy(),
        status: sinon.spy(),
      };

      await breedService.getTopBreeds({}, res);
      expect(res.send.calledOnce).to.be.true;
      expect(res.send.calledWith(orderedBreedList)).to.be.true;
    });
  });
});